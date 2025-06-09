// Quick View Modal Functionality
console.log('QuickView JavaScript file loaded successfully');

class QuickView {
  constructor() {
    this.modal = document.getElementById('quickViewModal');
    this.currentProduct = null;
    this.currentVariant = null;
    
    // Debug logging
    console.log('QuickView initialized');
    console.log('Modal element found:', this.modal);
    
    this.init();
  }

  init() {
    // Add event listeners
    document.addEventListener('click', (e) => {
      console.log('Click detected on:', e.target);
      
      if (e.target.closest('.quick-view-btn')) {
        e.preventDefault();
        console.log('Quick view button clicked');
        const button = e.target.closest('.quick-view-btn');
        console.log('Button element:', button);
        console.log('Button data attributes:', button.dataset);
        const productData = this.extractProductData(button);
        console.log('Product data:', productData);
        this.openQuickView(productData);
      }
    });

    // Close modal on overlay click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeQuickView();
        }
      });
    }

    // Quantity controls
    document.addEventListener('click', (e) => {
      if (e.target.closest('.quantity-decrease')) {
        this.updateQuantity(-1);
      } else if (e.target.closest('.quantity-increase')) {
        this.updateQuantity(1);
      }
    });

    // Form submission
    const form = document.getElementById('quickViewForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addToCart();
      });
    }

    // Buy now button
    const buyNowBtn = document.getElementById('quickViewBuyNow');
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        this.buyNow();
      });
    }
  }

  extractProductData(button) {
    // Extract product data from data attributes or closest product card
    const productCard = button.closest('.product-card');
    if (!productCard) return null;

    return {
      id: button.dataset.productId || productCard.dataset.productId,
      handle: button.dataset.productHandle || productCard.dataset.productHandle,
      title: button.dataset.productTitle || productCard.querySelector('.product-name')?.textContent?.trim(),
      vendor: button.dataset.productVendor || 'Wide Awake Coffee',
      image: button.dataset.productImage || productCard.querySelector('.product-image img')?.src,
      price: button.dataset.productPrice || productCard.querySelector('.price-regular')?.textContent,
      comparePrice: button.dataset.productComparePrice || productCard.querySelector('.price-compare')?.textContent,
      url: button.dataset.productUrl || productCard.querySelector('.product-name a')?.href
    };
  }

  async openQuickView(productData) {
    console.log('openQuickView called with:', productData);
    if (!productData || !productData.id) {
      console.log('Missing product data or ID');
      return;
    }

    if (!this.modal) {
      console.error('Modal element not found');
      return;
    }

    // Show loading state
    this.showLoading();
    
    try {
      // Fetch full product data
      const response = await fetch(`/products/${productData.handle}.js`);
      const product = await response.json();
      
      this.currentProduct = product;
      this.currentVariant = product.variants[0];
      
      // Populate modal with product data
      this.populateModal(product, productData);
      
      // Show modal with animation
      this.modal.style.display = 'flex';
      requestAnimationFrame(() => {
        this.modal.classList.add('active');
      });
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
    } catch (error) {
      console.error('Error loading product data:', error);
      this.showError('Failed to load product details');
    }
  }

  populateModal(product, productData) {
    // Update image
    const image = document.getElementById('quickViewImage');
    const imageSrc = productData.image || (product.images[0] ? `https:${product.images[0]}` : '');
    image.src = imageSrc;
    image.alt = product.title;

    // Update product info
    document.getElementById('quickViewVendor').textContent = product.vendor || 'QUICK VIEW';
    document.getElementById('quickViewTitle').textContent = product.title;
    
    // Update price
    this.updatePrice(this.currentVariant);
    
    // Update variant options
    this.populateVariantOptions(product);
    
    // Update product URL
    const detailsLink = document.getElementById('quickViewDetailsLink');
    detailsLink.href = `/products/${product.handle}`;
    
    // Show subscription info if applicable
    this.updateSubscriptionInfo(product);
    
    // Update features
    this.updateProductFeatures(product);
    
    // Show sale badge if applicable
    this.updateSaleBadge(this.currentVariant);
  }

  populateVariantOptions(product) {
    const optionsContainer = document.getElementById('quickViewOptions');
    optionsContainer.innerHTML = '';

    if (product.options && product.options.length > 0) {
      product.options.forEach((option, index) => {
        if (option.values && option.values.length > 1) {
          const optionGroup = document.createElement('div');
          optionGroup.className = 'option-group';
          
          const label = document.createElement('label');
          label.className = 'option-label';
          label.textContent = option.name;
          
          const select = document.createElement('select');
          select.className = 'option-select';
          select.dataset.optionIndex = index;
          
          option.values.forEach(value => {
            const optionElement = document.createElement('option');
            optionElement.value = value;
            optionElement.textContent = value;
            select.appendChild(optionElement);
          });
          
          select.addEventListener('change', () => {
            this.updateVariantFromOptions();
          });
          
          optionGroup.appendChild(label);
          optionGroup.appendChild(select);
          optionsContainer.appendChild(optionGroup);
        }
      });
    }
  }

  updateVariantFromOptions() {
    const optionSelects = document.querySelectorAll('.option-select');
    const selectedOptions = Array.from(optionSelects).map(select => select.value);
    
    // Find matching variant
    const variant = this.currentProduct.variants.find(v => {
      return selectedOptions.every((option, index) => v.options[index] === option);
    });
    
    if (variant) {
      this.currentVariant = variant;
      this.updatePrice(variant);
      this.updateSaleBadge(variant);
      this.updateAvailability(variant);
    }
  }

  updatePrice(variant) {
    const priceContainer = document.getElementById('quickViewPrice');
    const currentPrice = priceContainer.querySelector('.price-current');
    const comparePrice = priceContainer.querySelector('.price-compare');
    
    if (variant) {
      currentPrice.textContent = this.formatPrice(variant.price);
      
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        comparePrice.textContent = this.formatPrice(variant.compare_at_price);
        comparePrice.style.display = 'block';
      } else {
        comparePrice.style.display = 'none';
      }
    }
  }

  updateSaleBadge(variant) {
    const badge = document.getElementById('quickViewBadge');
    const badgeText = badge.querySelector('.badge-text');
    
    if (variant && variant.compare_at_price && variant.compare_at_price > variant.price) {
      const savings = Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100);
      badgeText.textContent = `${savings}% OFF`;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  }

  updateAvailability(variant) {
    const addToCartBtn = document.getElementById('quickViewAddToCart');
    const buyNowBtn = document.getElementById('quickViewBuyNow');
    
    if (variant && variant.available) {
      addToCartBtn.disabled = false;
      addToCartBtn.innerHTML = '<i data-lucide="shopping-cart" class="btn-icon"></i>ADD TO CART';
      buyNowBtn.disabled = false;
    } else {
      addToCartBtn.disabled = true;
      addToCartBtn.innerHTML = 'SOLD OUT';
      buyNowBtn.disabled = true;
    }
  }

  updateSubscriptionInfo(product) {
    const subscriptionSection = document.getElementById('quickViewSubscription');
    const subscriptionDescription = document.getElementById('subscriptionDescription');
    
    // Check if product has subscription options (you can customize this logic)
    if (product.tags && product.tags.includes('subscription')) {
      subscriptionDescription.textContent = 'This will autocharge your account every month after your initial order. For new subscribers, please expect your first bag of coffee to arrive 1-3 days from purchase date.';
      subscriptionSection.style.display = 'block';
    } else {
      subscriptionSection.style.display = 'none';
    }
  }

  updateProductFeatures(product) {
    const featuresContainer = document.getElementById('quickViewFeatures');
    featuresContainer.innerHTML = '';
    
    // Add common features (customize based on your product data)
    const features = [
      { icon: 'truck', text: 'Free shipping on orders over ₱1,500' },
      { icon: 'shield-check', text: 'Premium quality guarantee' },
      { icon: 'clock', text: 'Roasted to order' }
    ];
    
    features.forEach(feature => {
      const featureItem = document.createElement('div');
      featureItem.className = 'feature-item';
      featureItem.innerHTML = `
        <i data-lucide="${feature.icon}" class="feature-icon"></i>
        <span>${feature.text}</span>
      `;
      featuresContainer.appendChild(featureItem);
    });
  }

  updateQuantity(change) {
    const quantityInput = document.getElementById('quickViewQuantity');
    const currentValue = parseInt(quantityInput.value) || 1;
    const newValue = Math.max(1, Math.min(99, currentValue + change));
    quantityInput.value = newValue;
  }

  async addToCart() {
    if (!this.currentVariant || !this.currentVariant.available) return;
    
    const quantity = parseInt(document.getElementById('quickViewQuantity').value) || 1;
    const addToCartBtn = document.getElementById('quickViewAddToCart');
    
    // Show loading state
    addToCartBtn.disabled = true;
    addToCartBtn.innerHTML = '<i data-lucide="loader-2" class="btn-icon animate-spin"></i>ADDING...';
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.currentVariant.id,
          quantity: quantity
        })
      });
      
      if (response.ok) {
        // Success feedback
        addToCartBtn.innerHTML = '<i data-lucide="check" class="btn-icon"></i>ADDED!';
        addToCartBtn.style.background = 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)';
        
        // Update cart count if you have a cart counter
        this.updateCartCount();
        
        // Close modal after delay
        setTimeout(() => {
          this.closeQuickView();
        }, 1500);
        
      } else {
        throw new Error('Failed to add to cart');
      }
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      addToCartBtn.innerHTML = '<i data-lucide="x" class="btn-icon"></i>ERROR';
      addToCartBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #e74c3c)';
      
      setTimeout(() => {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i data-lucide="shopping-cart" class="btn-icon"></i>ADD TO CART';
        addToCartBtn.style.background = '';
      }, 2000);
    }
  }

  async buyNow() {
    await this.addToCart();
    // Redirect to cart after successful add
    setTimeout(() => {
      window.location.href = '/cart';
    }, 1000);
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      const cartCounter = document.querySelector('.cart-count');
      if (cartCounter) {
        cartCounter.textContent = cart.item_count;
      }
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  closeQuickView() {
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  showLoading() {
    document.getElementById('quickViewTitle').textContent = 'Loading...';
    document.getElementById('quickViewImage').src = '';
  }

  showError(message) {
    document.getElementById('quickViewTitle').textContent = message;
    setTimeout(() => {
      this.closeQuickView();
    }, 2000);
  }

  formatPrice(cents) {
    return `₱${(cents / 100).toFixed(2)}`;
  }
}

// Global functions for onclick handlers
function closeQuickView() {
  if (window.quickViewInstance) {
    window.quickViewInstance.closeQuickView();
  }
}

function updateQuantity(change) {
  if (window.quickViewInstance) {
    window.quickViewInstance.updateQuantity(change);
  }
}

function resetAllFilters() {
  // Add your filter reset logic here
  console.log('Reset all filters');
}

// Initialize immediately if DOM is already loaded, otherwise wait
function initializeQuickView() {
  console.log('Attempting to initialize QuickView');
  
  // Check if modal exists
  const modal = document.getElementById('quickViewModal');
  console.log('Modal found:', !!modal);
  
  // Check for quick view buttons
  const quickViewButtons = document.querySelectorAll('.quick-view-btn');
  console.log('Found quick view buttons:', quickViewButtons.length);
  
  if (!window.quickViewInstance) {
    window.quickViewInstance = new QuickView();
    
    // Initialize Lucide icons for the modal
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// Try multiple initialization methods
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeQuickView);
} else {
  initializeQuickView();
}

// Also try after window load as backup
window.addEventListener('load', () => {
  console.log('Window loaded, checking QuickView');
  if (!window.quickViewInstance) {
    setTimeout(initializeQuickView, 100);
  }
}); 