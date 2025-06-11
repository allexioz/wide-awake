/**
 * Wide Awake Product Discovery System
 * Modern ecommerce filtering with analytics tracking
 * Now integrated with real Shopify products
 */

class ProductDiscovery {
  constructor() {
    this.currentFilter = 'all';
    this.currentVibe = null;
    this.currentPage = 1;
    this.productsPerPage = 8;
    this.totalProducts = 0;
    this.totalPages = 0;
    this.hoverTimeouts = new Map();
    this.intersectionObserver = null;
    this.analytics = this.initAnalytics();
    this.stickyObserver = null;
    this.mobileFiltersOpen = false;
    
    console.log('🚀 ProductDiscovery initialized');
    this.init();
  }

  init() {
    this.bindFilterEvents();
    this.bindVibeEvents();
    this.bindProductEvents();
    this.bindPaginationEvents();
    this.bindEnhancedFilterEvents();
    this.setupIntersectionObserver();
    this.setupStickyBehavior();
    this.optimizeForTouch();
    this.initializePagination();
    this.trackPageView();
    this.initializeKeyboardNavigation();
  }

  bindFilterEvents() {
    const filterTabs = document.querySelectorAll('.filter-tab[data-filter]');
    
    filterTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const filter = e.currentTarget.dataset.filter;
        const analytics = e.currentTarget.dataset.analytics;
        
        this.setActiveFilter(e.currentTarget);
        this.filterProducts(filter);
        this.trackFilterClick(analytics, filter);
      });
    });
  }

  bindVibeEvents() {
    const vibeButtons = document.querySelectorAll('.filter-tab[data-vibe]');
    console.log('🔍 Found vibe buttons:', vibeButtons.length);
    
    vibeButtons.forEach((btn, index) => {
      console.log(`🎯 Binding event to vibe button ${index}:`, btn.dataset.vibe);
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎭 Vibe button clicked:', e.currentTarget.dataset.vibe);
        
        const vibe = e.currentTarget.dataset.vibe;
        const analytics = e.currentTarget.dataset.analytics;
        
        // Handle toggle logic first
        this.setActiveVibe(e.currentTarget);
        // Then filter with the updated vibe selection
        this.filterProducts(this.currentFilter);
        this.trackVibeClick(analytics, this.currentVibe || vibe);
      });
    });
  }

  bindProductEvents() {
    // Quick Add buttons with debouncing
    const quickAddBtns = document.querySelectorAll('.quick-add-btn:not(.sold-out)');
    quickAddBtns.forEach(btn => {
      let clickTimeout = null;
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Debounce rapid clicks
        if (clickTimeout) {
          clearTimeout(clickTimeout);
        }
        
        clickTimeout = setTimeout(() => {
          const variantId = e.currentTarget.dataset.addToCart;
          const productHandle = e.currentTarget.dataset.productHandle;
          
          if (variantId && productHandle && !btn.disabled) {
            this.quickAddToCart(variantId, productHandle);
            this.trackQuickAdd(productHandle);
          }
        }, 100);
      });
      
      // Keyboard accessibility
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Add to Cart buttons
    const addToCartBtns = document.querySelectorAll('[data-add-to-cart]:not(:disabled)');
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const variantId = e.currentTarget.dataset.addToCart;
        const productHandle = e.currentTarget.dataset.productHandle;
        this.addToCart(variantId, productHandle);
        this.trackAddToCart(productHandle);
      });
    });

    // No load more buttons needed - replaced with pagination

    // Product card hover analytics
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      let hoverTimeout;
      
      card.addEventListener('mouseenter', (e) => {
        const productId = e.currentTarget.dataset.productId;
        const productSegment = e.currentTarget.dataset.segment;
        const productVibe = e.currentTarget.dataset.vibe;
        
        // Track hover after 1 second to avoid spam
        hoverTimeout = setTimeout(() => {
          this.trackProductHover(productId, productSegment, productVibe);
        }, 1000);
      });
      
      card.addEventListener('mouseleave', () => {
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      });
    });
  }

  bindEnhancedFilterEvents() {
    // Mobile filter toggle
    const filterToggle = document.getElementById('filterToggle');
    const filterContent = document.getElementById('filterContent');
    
    if (filterToggle && filterContent) {
      filterToggle.addEventListener('click', () => {
        this.toggleMobileFilters();
      });
    }

    // Handle clicks outside mobile filters to close them
    document.addEventListener('click', (e) => {
      if (this.mobileFiltersOpen && 
          !e.target.closest('.smart-filters') && 
          !e.target.closest('.filter-toggle-mobile')) {
        this.closeMobileFilters();
      }
    });

    // Escape key to close mobile filters
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileFiltersOpen) {
        this.closeMobileFilters();
        document.getElementById('filterToggle')?.focus();
      }
    });
  }

  toggleMobileFilters() {
    const filterToggle = document.getElementById('filterToggle');
    const filterContent = document.getElementById('filterContent');
    
    if (!filterToggle || !filterContent) return;

    this.mobileFiltersOpen = !this.mobileFiltersOpen;
    
    filterToggle.setAttribute('aria-expanded', this.mobileFiltersOpen.toString());
    
    if (this.mobileFiltersOpen) {
      filterContent.classList.add('expanded');
      // Focus first filter element for accessibility
      setTimeout(() => {
        const firstFilter = filterContent.querySelector('.filter-tab, .vibe-btn-compact');
        firstFilter?.focus();
      }, 300);
    } else {
      filterContent.classList.remove('expanded');
    }

    this.trackFilterInteraction('mobile_toggle', this.mobileFiltersOpen ? 'open' : 'close');
  }

  closeMobileFilters() {
    if (!this.mobileFiltersOpen) return;
    
    this.mobileFiltersOpen = false;
    const filterToggle = document.getElementById('filterToggle');
    const filterContent = document.getElementById('filterContent');
    
    if (filterToggle) filterToggle.setAttribute('aria-expanded', 'false');
    if (filterContent) filterContent.classList.remove('expanded');
  }

  setupStickyBehavior() {
    const stickyElement = document.querySelector('.smart-filters-sticky');
    if (!stickyElement) return;

    this.stickyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stickyElement.classList.remove('is-stuck');
          } else {
            stickyElement.classList.add('is-stuck');
          }
        });
      },
      {
        rootMargin: '-1px 0px 0px 0px',
        threshold: 0
      }
    );

    // Create a sentinel element to track when filters become sticky
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.width = '100%';
    
    const filtersWrapper = document.getElementById('smartFilters');
    if (filtersWrapper) {
      filtersWrapper.appendChild(sentinel);
      this.stickyObserver.observe(sentinel);
    }
  }

  initializeKeyboardNavigation() {
    // Add keyboard navigation for filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    this.addTabListKeyboard(filterTabs);

    // Add keyboard navigation for vibe buttons
    const vibeButtons = document.querySelectorAll('.vibe-btn-compact');
    this.addTabListKeyboard(vibeButtons);
  }

  addTabListKeyboard(elements) {
    elements.forEach((element, index) => {
      element.addEventListener('keydown', (e) => {
        let targetIndex = index;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            targetIndex = (index + 1) % elements.length;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            targetIndex = (index - 1 + elements.length) % elements.length;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = elements.length - 1;
            break;
          default:
            return;
        }

        elements[targetIndex].focus();
      });
    });
  }

  setActiveFilter(activeTab) {
    const filterTabs = document.querySelectorAll('.filter-tab[data-filter]');
    filterTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    activeTab.setAttribute('tabindex', '0');
    
    this.updateActiveFilters();
    this.updateClearButton();
  }

  setActiveVibe(activeBtn) {
    const vibe = activeBtn.dataset.vibe;
    console.log('🎭 setActiveVibe called with:', vibe, 'current:', this.currentVibe);
    
    // Remove active class and inline styles from all vibe buttons
    document.querySelectorAll('.filter-tab[data-vibe]').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
      console.log('🧹 Cleaned up:', btn.dataset.vibe);
    });
    
    if (this.currentVibe === vibe) {
      // Deactivate if clicking the same vibe
      console.log('🔄 Toggling off vibe:', vibe);
      this.currentVibe = null;
    } else {
      console.log('✅ Setting active vibe:', vibe);
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-pressed', 'true');
      this.currentVibe = vibe;
      console.log('🎨 Applied active class to button');
    }
    
    this.updateActiveFilters();
    this.updateClearButton();
  }

  updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    if (!activeFiltersContainer) return;

    const activeFilters = [];
    
    // Add category filter if not "all"
    if (this.currentFilter !== 'all') {
      const filterName = this.getFilterDisplayName(this.currentFilter);
      activeFilters.push({
        type: 'category',
        value: this.currentFilter,
        label: filterName,
        removeAction: () => this.removeFilter('category')
      });
    }

    // Add vibe filter if selected
    if (this.currentVibe) {
      const vibeName = this.getVibeDisplayName(this.currentVibe);
      activeFilters.push({
        type: 'vibe',
        value: this.currentVibe,
        label: vibeName,
        removeAction: () => this.removeFilter('vibe')
      });
    }

    if (activeFilters.length > 0) {
      activeFiltersContainer.classList.add('show');
      activeFiltersContainer.innerHTML = activeFilters.map(filter => `
        <button class="active-filter-chip" 
                onclick="window.productDiscovery.removeFilter('${filter.type}')"
                aria-label="Remove ${filter.label} filter">
          ${filter.label}
          <i data-lucide="x" class="remove-filter" aria-hidden="true"></i>
        </button>
      `).join('');
      
      // Re-initialize Lucide icons for the new elements
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({
          attrs: {
            class: ['lucide-icon']
          }
        });
      }
    } else {
      activeFiltersContainer.classList.remove('show');
      activeFiltersContainer.innerHTML = '';
    }
  }

  updateClearButton() {
    const clearButton = document.querySelector('.clear-all-filters');
    if (!clearButton) return;

    const hasActiveFilters = this.currentFilter !== 'all' || this.currentVibe !== null;
    
    if (hasActiveFilters) {
      clearButton.classList.add('show');
    } else {
      clearButton.classList.remove('show');
    }
  }

  removeFilter(filterType) {
    if (filterType === 'category') {
      // Reset to "all" filter
      const allTab = document.querySelector('[data-filter="all"]');
      if (allTab) {
        this.setActiveFilter(allTab);
        this.currentFilter = 'all';
      }
    } else if (filterType === 'vibe') {
      // Clear vibe selection
      this.currentVibe = null;
      document.querySelectorAll('.filter-tab[data-vibe]').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
    }

    this.filterProducts(this.currentFilter);
    this.trackFilterInteraction('remove_filter', filterType);
  }

  getFilterDisplayName(filter) {
    const filterMap = {
      'all': 'All Coffee',
      'daily-driver': 'Daily Driver',
      'premium-brews': 'Premium Brews',
      'direct-trade': 'Direct Trade',
      'equipment': 'Equipment'
    };
    return filterMap[filter] || filter;
  }

  updateFilterResults() {
    const resultsCountElement = document.querySelector('.results-count');
    if (resultsCountElement) {
      resultsCountElement.textContent = this.totalProducts;
    }

    const filterSummary = document.getElementById('filterSummary');
    if (filterSummary) {
      const productText = this.totalProducts === 1 ? 'product' : 'products';
      filterSummary.innerHTML = `<span class="results-count">${this.totalProducts}</span> ${productText}`;
    }
  }

  trackFilterInteraction(action, value) {
    if (this.analytics && typeof gtag !== 'undefined') {
      gtag('event', 'filter_interaction', {
        event_category: 'Product Discovery',
        event_label: action,
        value: value,
        custom_map: {
          dimension1: this.currentFilter,
          dimension2: this.currentVibe
        }
      });
    }
  }

  filterProducts(filter) {
    this.currentFilter = filter;
    this.currentPage = 1; // Reset to first page when filtering
    
    const productCards = document.querySelectorAll('.product-card');
    const filteredProducts = [];
    
    productCards.forEach(card => {
      const productSegment = card.dataset.segment;
      const productVibe = card.dataset.vibe;
      
      let shouldShow = false;
      
      // Filter by segment
      if (filter === 'all') {
        shouldShow = true;
      } else {
        shouldShow = productSegment === filter;
      }
      
      // Further filter by vibe if selected
      if (shouldShow && this.currentVibe) {
        shouldShow = productVibe === this.currentVibe;
      }
      
      if (shouldShow) {
        filteredProducts.push(card);
      }
    });
    
    this.totalProducts = filteredProducts.length;
    this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
    
    this.showPageProducts(filteredProducts);
    this.updatePaginationControls();
    this.updateFilterResults();
    this.updateActiveFilters();
    this.updateClearButton();
    
    // Close mobile filters after applying filter
    if (window.innerWidth <= 768) {
      this.closeMobileFilters();
    }
  }

  bindPaginationEvents() {
    // Pagination buttons
    const paginationBtns = document.querySelectorAll('.pagination-btn, .pagination-number');
    
    paginationBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.disabled) return;
        
        const page = e.currentTarget.dataset.page;
        
        if (page === 'prev') {
          this.goToPage(this.currentPage - 1);
        } else if (page === 'next') {
          this.goToPage(this.currentPage + 1);
        } else {
          this.goToPage(parseInt(page));
        }
      });
    });
  }

  initializePagination() {
    // Get total products from data attribute (includes all products)
    const productGrid = document.getElementById('productGrid');
    this.totalProducts = parseInt(productGrid?.dataset.totalProducts) || 0;
    this.productsPerPage = parseInt(productGrid?.dataset.productsPerPage) || 8;
    this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
    
    // Get all product cards and show first page
    const allProducts = document.querySelectorAll('.product-card');
    this.showPageProducts(Array.from(allProducts));
    this.updatePaginationControls();
  }

  showPageProducts(filteredProducts) {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    
    // Hide all products first
    const allProducts = document.querySelectorAll('.product-card');
    allProducts.forEach(card => {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });
    
    // Show products for current page
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productsToShow.forEach((card, index) => {
      card.style.display = 'block';
      
      // Stagger the animation
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
    
    // Scroll to top of product grid
    const productGrid = document.querySelector('.product-grid');
    if (productGrid && this.currentPage > 1) {
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updatePaginationControls() {
    // Update pagination info
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const productsCount = document.querySelector('.products-count');
    
    if (currentPageSpan) currentPageSpan.textContent = this.currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = this.totalPages;
    if (productsCount) {
      const startProduct = (this.currentPage - 1) * this.productsPerPage + 1;
      const endProduct = Math.min(this.currentPage * this.productsPerPage, this.totalProducts);
      productsCount.textContent = `${startProduct}-${endProduct} of ${this.totalProducts} products`;
    }
    
    // Update button states
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
      prevBtn.disabled = this.currentPage === 1;
    }
    
    if (nextBtn) {
      nextBtn.disabled = this.currentPage === this.totalPages;
    }
    
    // Update pagination numbers
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    paginationNumbers.forEach(btn => {
      const page = parseInt(btn.dataset.page);
      btn.classList.toggle('active', page === this.currentPage);
    });
  }

  goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    
    this.currentPage = page;
    
    // Get currently filtered products without re-filtering
    const productCards = document.querySelectorAll('.product-card');
    const filteredProducts = [];
    
    productCards.forEach(card => {
      const productSegment = card.dataset.segment;
      const productVibe = card.dataset.vibe;
      
      let shouldShow = false;
      
      // Filter by segment
      if (this.currentFilter === 'all') {
        shouldShow = true;
      } else {
        shouldShow = productSegment === this.currentFilter;
      }
      
      // Further filter by vibe if selected
      if (shouldShow && this.currentVibe) {
        shouldShow = productVibe === this.currentVibe;
      }
      
      if (shouldShow) {
        filteredProducts.push(card);
      }
    });
    
    // Show products for the new page
    this.showPageProducts(filteredProducts);
    this.updatePaginationControls();
    
    // Track pagination analytics
    this.trackPageChange(page);
  }

  trackPageChange(page) {
    if (this.analytics && this.analytics.gtag) {
      this.analytics.gtag('event', 'pagination_change', {
        event_category: 'Product Discovery',
        event_label: `Page ${page}`,
        value: page
      });
    }
    console.log('📊 Page change tracked:', page);
  }

  showFilterResults(count) {
    // Create/update results indicator
    let indicator = document.querySelector('.filter-results');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'filter-results';
      const instantProducts = document.querySelector('.instant-products');
      if (instantProducts) {
        instantProducts.prepend(indicator);
      }
    }
    
    const filterName = this.currentFilter === 'all' ? 'All Coffee' : 
                      this.currentFilter.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ');
    
    const vibeText = this.currentVibe ? ` - ${this.getVibeDisplayName(this.currentVibe)}` : '';
    
    indicator.innerHTML = `
      <div class="results-text">
        <strong>${count} products</strong> in ${filterName}${vibeText}
      </div>
    `;
  }

  getVibeDisplayName(vibe) {
    switch(vibe) {
      case 'smooth-sweet': return 'Smooth & Sweet';
      case 'light-bright': return 'Light & Bright';
      case 'complex-expressive': return 'Complex & Expressive';
      default: return vibe;
    }
  }

  quickAddToCart(variantId, productHandle) {
    // Find the button
    const btn = document.querySelector(`[data-product-handle="${productHandle}"].quick-add-btn`);
    if (!btn || btn.disabled) return;
    
    const productTitle = btn.dataset.productTitle || 'Product';
    
    // Set loading state
    btn.classList.add('loading');
    btn.disabled = true;
    btn.setAttribute('aria-label', `Adding ${productTitle} to cart...`);
    
    // Add to Shopify cart
    this.addToShopifyCart(variantId, 1)
      .then(data => {
        // Success state
        btn.classList.remove('loading');
        btn.classList.add('success');
        btn.setAttribute('aria-label', `${productTitle} added to cart successfully`);
        
        // Show toast notification
        this.showToast(`${productTitle} added to cart!`, 'success');
        
        // Update cart UI
        this.updateCartUI();
        
        // Reset button after 2 seconds
        setTimeout(() => {
          btn.classList.remove('success');
          btn.disabled = false;
          btn.setAttribute('aria-label', `Add ${productTitle} to cart`);
        }, 2000);
      })
      .catch(error => {
        // Error state
        btn.classList.remove('loading');
        btn.classList.add('error');
        btn.setAttribute('aria-label', `Failed to add ${productTitle} to cart`);
        
        // Show specific error message
        const errorMessage = error.message.includes('Failed to add to cart') 
          ? `Failed to add ${productTitle} to cart. Please try again.`
          : error.message;
        this.showToast(errorMessage, 'error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
          btn.classList.remove('error');
          btn.disabled = false;
          btn.setAttribute('aria-label', `Add ${productTitle} to cart`);
        }, 3000);
      });
  }

  addToCart(variantId, productHandle) {
    // Quick add to cart with better UX
    const btn = document.querySelector(`[data-product-handle="${productHandle}"][data-add-to-cart]`);
    if (!btn) return;
    
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="btn-icon animate-spin"></i>';
    btn.disabled = true;
    
    this.addToShopifyCart(variantId, 1)
      .then(data => {
        btn.innerHTML = '<i data-lucide="check" class="btn-icon"></i>';
        btn.style.background = 'linear-gradient(-45deg, #FF6B6B, #FF8E53, #FF6B35, #F7DC6F, #82E0AA, #85C1E9, #BB8FCE, #FF6B6B)';
        btn.style.backgroundSize = '400% 400%';
        btn.style.animation = 'gradientFlow 3s ease infinite';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
        
        // Show toast notification
        this.showToast('Added to cart!', 'success');
        
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.animation = '';
          btn.style.color = '';
          btn.style.border = '';
          btn.style.textShadow = '';
          // Re-init lucide icons
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }, 2000);
      })
      .catch(error => {
        btn.innerHTML = '<i data-lucide="x" class="btn-icon"></i>';
        btn.style.background = '#dc3545';
        btn.style.color = 'white';
        btn.style.border = 'none';
        
        this.showToast('Failed to add to cart', 'error');
        
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.animation = '';
          btn.style.color = '';
          btn.style.border = '';
          btn.style.textShadow = '';
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }, 2000);
      });
  }

  showToast(message, type = 'info') {
    // Remove existing toasts
    document.querySelectorAll('.cart-toast').forEach(toast => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    });
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `cart-toast ${type === 'error' ? 'error' : ''}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-text">${message}</span>
        <button class="toast-close" aria-label="Close notification">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast with a slight delay for smooth animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
    });
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 4000);
    
    // Close button functionality
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    });

    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  addToShopifyCart(variantId, quantity) {
    return fetch(window.routes?.cart_add_url || '/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          // Handle specific Shopify errors
          let errorMessage = 'Failed to add to cart';
          
          if (response.status === 422) {
            errorMessage = errorData.description || 'Product is unavailable';
          } else if (response.status === 404) {
            errorMessage = 'Product not found';
          } else if (response.status >= 500) {
            errorMessage = 'Server error. Please try again.';
          }
          
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(data => {
      this.updateCartUI();
      return data;
    })
    .catch(error => {
      console.error('Error adding to cart:', error);
      throw error;
    });
  }

  updateCartUI() {
    // Update cart count in header
    fetch(window.routes?.cart_url || '/cart.js')
      .then(response => response.json())
      .then(cart => {
        // Update cart count in header
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
          cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
          
          // Add animation to draw attention
          cartCount.style.transform = 'scale(1.2)';
          setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
          }, 200);
        }
        
        // Update cart total if exists
        const cartTotal = document.querySelector('[data-cart-total]');
        if (cartTotal) {
          cartTotal.textContent = this.formatMoney(cart.total_price);
        }
        
        // Update floating cart summary if on mobile
        const floatingSummary = document.querySelector('#floating-summary');
        if (floatingSummary) {
          const floatingTotal = floatingSummary.querySelector('.floating-total');
          const floatingCount = floatingSummary.querySelector('.floating-count');
          
          if (floatingTotal) floatingTotal.textContent = this.formatMoney(cart.total_price);
          if (floatingCount) floatingCount.textContent = `${cart.item_count} items`;
        }
        
        // Dispatch custom event for other components
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: { cart: cart }
        }));
      })
      .catch(error => {
        console.error('Error updating cart UI:', error);
      });
  }

  formatMoney(cents) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(cents / 100);
  }



  showCartNotification(product) {
    // Remove existing toasts
    document.querySelectorAll('.cart-toast').forEach(toast => toast.remove());
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">✅</span>
        <span class="toast-text">Added to cart!</span>
        <button class="toast-close" aria-label="Close notification">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 3000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });
  }

  showErrorNotification() {
    // Remove existing toasts
    document.querySelectorAll('.cart-toast').forEach(toast => toast.remove());
    
    // Error toast
    const toast = document.createElement('div');
    toast.className = 'cart-toast error';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">❌</span>
        <span class="toast-text">Error adding to cart</span>
        <button class="toast-close" aria-label="Close notification">×</button>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 4000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });
  }

  // Analytics tracking
  initAnalytics() {
    return {
      track: (event, properties = {}) => {
        // Add timestamp to all events
        properties.timestamp = new Date().toISOString();
        properties.url = window.location.href;
        properties.user_agent = navigator.userAgent;
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
          gtag('event', event, properties);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
          fbq('track', event, properties);
        }
        
        // Custom analytics (Segment, Mixpanel, etc.)
        if (typeof analytics !== 'undefined') {
          analytics.track(event, properties);
        }
        
        // Console log for development
        console.log('🔍 Analytics:', event, properties);
      }
    };
  }

  trackPageView() {
    this.analytics.track('Product Discovery Viewed', {
      page: 'homepage',
      current_filter: this.currentFilter,
      current_vibe: this.currentVibe
    });
  }

  trackFilterClick(analyticsId, filter) {
    this.analytics.track('Filter Applied', {
      filter_type: 'segment',
      filter_value: filter,
      analytics_id: analyticsId,
      previous_filter: this.currentFilter
    });
  }

  trackVibeClick(analyticsId, vibe) {
    this.analytics.track('Vibe Filter Applied', {
      filter_type: 'vibe',
      filter_value: vibe,
      analytics_id: analyticsId,
      current_filter: this.currentFilter,
      previous_vibe: this.currentVibe
    });
  }

  trackProductHover(productId, segment, vibe) {
    this.analytics.track('Product Hovered', {
      product_id: productId,
      product_segment: segment,
      product_vibe: vibe,
      current_filter: this.currentFilter,
      current_vibe: this.currentVibe
    });
  }

  trackQuickAdd(productHandle) {
    this.analytics.track('Quick Add Clicked', {
      product_handle: productHandle,
      method: 'quick_add',
      current_filter: this.currentFilter,
      current_vibe: this.currentVibe
    });
  }

  trackAddToCart(productHandle) {
    this.analytics.track('Add to Cart', {
      product_handle: productHandle,
      method: 'standard',
      current_filter: this.currentFilter,
      current_vibe: this.currentVibe
    });
  }

  setupIntersectionObserver() {
    // Lazy load animations when products come into view
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Preload hover states for better performance
            this.preloadHoverEffects(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });

      // Observe all product cards
      document.querySelectorAll('.product-card').forEach(card => {
        this.intersectionObserver.observe(card);
      });
    }
  }

  preloadHoverEffects(productCard) {
    // Trigger hardware acceleration by applying transform early
    const img = productCard.querySelector('.product-image img');
    if (img) {
      img.style.transform = 'translate3d(0, 0, 0)';
    }
  }

  optimizeForTouch() {
    // Add touch-friendly interactions for mobile devices
    if ('ontouchstart' in window) {
      document.querySelectorAll('.product-card').forEach(card => {
        let touchStartTime = 0;
        
        card.addEventListener('touchstart', (e) => {
          touchStartTime = Date.now();
          card.classList.add('touch-active');
        }, { passive: true });
        
        card.addEventListener('touchend', (e) => {
          const touchDuration = Date.now() - touchStartTime;
          
          // If it's a quick tap (less than 200ms), treat as hover
          if (touchDuration < 200) {
            card.classList.add('hover-effect');
            setTimeout(() => {
              card.classList.remove('hover-effect');
            }, 300);
          }
          
          card.classList.remove('touch-active');
        }, { passive: true });
      });
    }
  }

  resetAllFilters() {
    console.log('🔄 Resetting all filters');
    
    // Reset filter states
    this.currentFilter = 'all';
    this.currentVibe = null;
    this.currentPage = 1;
    
    // Reset category filter UI
    document.querySelectorAll('.filter-tab[data-filter]').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    });
    const allTab = document.querySelector('[data-filter="all"]');
    if (allTab) {
      allTab.classList.add('active');
      allTab.setAttribute('aria-selected', 'true');
      allTab.setAttribute('tabindex', '0');
    }
    
    // Reset vibe filter UI
    document.querySelectorAll('.filter-tab[data-vibe]').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    
    // Show all products
    this.filterProducts('all');
    
    // Track analytics
    this.trackFilterInteraction('reset_filters', 'all');
    
    console.log('✅ All filters reset');
  }
}

// Global function for empty state reset button
function resetAllFilters() {
  if (window.productDiscovery) {
    window.productDiscovery.resetAllFilters();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.productDiscovery = new ProductDiscovery();
  
  // Also expose for inline onclick handlers
  window.resetAllFilters = resetAllFilters;
});

// CSS for toast notifications and enhancements
const toastStyles = `
  .cart-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    min-width: 250px;
  }

  .cart-toast.error {
    border-left: 4px solid #dc3545;
  }

  .cart-toast:not(.error) {
    border-left: 4px solid transparent;
    border-image: linear-gradient(-45deg, #FF6B6B, #FF8E53, #FF6B35, #F7DC6F, #82E0AA, #85C1E9, #BB8FCE, #FF6B6B) 1;
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    font-family: 'Poppins', sans-serif;
  }

  .toast-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .toast-text {
    font-weight: 500;
    color: #2c1810;
    flex: 1;
  }

  .toast-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .toast-close:hover {
    background-color: #f0f0f0;
  }

  .filter-results {
    text-align: center;
    margin-bottom: 20px;
    padding: 12px 20px;
    background: rgba(92, 191, 238, 0.05);
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    animation: fadeIn 0.3s ease;
  }

  .results-text {
    color: #2c1810;
  }

  .results-text strong {
    color: #5CBFEE;
    font-weight: 600;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Loading states */
  .btn-primary:disabled,
  .quick-add-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Mobile toast positioning */
  @media screen and (max-width: 480px) {
    .cart-toast {
      right: 10px;
      left: 10px;
      min-width: auto;
    }
  }
`;

// Inject styles
const style = document.createElement('style');
style.textContent = toastStyles;
document.head.appendChild(style); 