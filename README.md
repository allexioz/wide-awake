# Wide Awake Coffee - Shopify Theme 2025

A modern, performance-optimized Shopify theme specifically designed for Wide Awake Coffee, featuring advanced product discovery, responsive design, dynamic localization, and seamless user experience. Built with clean aesthetics, powerful functionality, and following Shopify's 2025 best practices for exceptional coffee e-commerce stores.

## ✨ Key Features

### 🎨 Design & User Experience
- **Coffee-focused design system** with Wide Awake brand identity
- **Advanced product discovery** with intelligent filtering and categorization
- **Responsive mobile-first approach** optimized for all devices
- **Modern minimalist design** with clean typography and spacious layouts
- **Smooth animations** powered by Lucide icons with CSS fallbacks
- **Intuitive navigation** with slide-out mobile menu and search modal
- **Brand-focused design system** with Wide Awake coffee theme aesthetic

### 🚀 Advanced Product Features
- **Smart Product Discovery Hero** with instant filtering and categorization
- **Product segmentation system** (Daily Driver, Premium Brews, Direct Trade, Equipment)
- **Coffee vibe filtering** (Smooth & Sweet, Light & Bright, Complex & Expressive)
- **Real-time product filtering** with category-based navigation
- **Quick view modals** for enhanced product browsing
- **Advanced add-to-cart functionality** with size/grind selection
- **Product image aspect ratio optimization** for consistent layouts

### 🌐 Shopify Integration & E-commerce
- **Dynamic localization** connected to Shopify's currency and language data
- **Real-time locale switching** with automatic cart currency updates
- **Comprehensive cart management** with cart drawer functionality
- **Studio booking system** integrated into the theme
- **Metafields support** for extended product information
- **Online Store 2.0** features fully implemented
- **Section Groups** for flexible page building
- **JSON Templates** for enhanced merchant customization

### 📱 Mobile Experience
- **Touch-optimized interfaces** with proper tap targets
- **Mobile menu slides from left** for natural user flow
- **Search modal slides from right** maintaining UX conventions
- **Responsive typography** scaling appropriately across devices
- **Sticky filters** for improved mobile product discovery

### ♿ Accessibility & Performance
- **WCAG 2.1 AA Compliance** with proper contrast ratios
- **Keyboard Navigation** for all interactive elements
- **Screen Reader Support** with semantic HTML and ARIA labels
- **Critical CSS inlining** for faster initial page loads
- **Optimized JavaScript** with error handling and graceful degradation
- **Lazy loading** implementation for images and non-critical resources

## 🏗️ Architecture & Structure

### Current Theme Structure
```
wide-awake-theme/
├── assets/                    # Static assets (CSS, JS, images, fonts)
│   ├── critical.css          # Above-the-fold critical styles
│   ├── collection-layout.css # Collection page styling
│   ├── product-discovery.js  # Advanced product filtering & discovery
│   ├── quick-view.js         # Product quick view functionality
│   ├── studio-booking.css    # Studio booking system styles
│   ├── fonts.css.liquid      # Font loading optimization
│   ├── logo.png              # Brand assets
│   ├── WideAwake_Logo_*.png  # Brand logo variations
│   └── SpecialGothicExpandedOne-Regular.ttf
├── blocks/                    # Reusable UI components
│   ├── group.liquid          # Section groups
│   └── text.liquid           # Text blocks
├── config/                    # Theme settings and configurations
│   ├── settings_data.json    # Theme configuration
│   └── settings_schema.json  # Theme settings schema
├── layout/              
│   ├── theme.liquid          # Main layout with advanced features
│   └── password.liquid       # Password page layout
├── locales/                   # Translation files
│   ├── en.default.json       # English translations
│   └── en.default.schema.json# Schema translations
├── sections/                  # Modular theme sections
│   ├── header.liquid         # Advanced header with announcement bar
│   ├── footer.liquid         # Footer with locale selector
│   ├── product-discovery-hero.liquid # Main product discovery system
│   ├── product.liquid        # Product detail pages
│   ├── collection.liquid     # Collection pages
│   ├── cart.liquid           # Shopping cart
│   ├── studio-booking.liquid # Studio booking system
│   ├── featured-products.liquid # Featured products section
│   ├── brand-story.liquid    # Brand storytelling
│   ├── youtube-media.liquid  # YouTube content integration
│   ├── instagram-feed.liquid # Instagram feed
│   ├── newsletter-signup.liquid # Email marketing
│   ├── wholesale-cta.liquid  # Wholesale call-to-action
│   └── ...                   # Additional sections
├── snippets/                  # Reusable code fragments
│   ├── product-card.liquid   # Product card component
│   ├── add-to-cart-component.liquid # Advanced cart functionality
│   ├── cart-manager.liquid   # Cart state management
│   ├── quick-view-modal.liquid # Quick view modal
│   ├── category-filters.liquid # Product filtering
│   ├── css-variables.liquid  # Dynamic CSS variables
│   ├── meta-tags.liquid      # SEO optimization
│   └── image.liquid          # Image optimization
└── templates/                 # Page templates combining sections
    ├── index.json            # Homepage template
    ├── product.json          # Product page template
    ├── collection.json       # Collection page template
    ├── cart.json             # Cart page template
    ├── page.studio-booking.liquid # Studio booking page
    └── customers/            # Customer account templates
```

### Section-Based Architecture
- **Modular Design**: All content areas built as flexible sections
- **Block Support**: Sections support blocks for granular customization
- **JSON Templates**: Enhanced merchant customization capabilities
- **Section Groups**: Header and footer groups for consistent layouts

## 🛠️ Technical Highlights

### Product Discovery System
- **Advanced filtering** by coffee type, origin, and flavor profile
- **Real-time search** with instant results
- **Category-based navigation** (Daily Driver, Premium Brews, Direct Trade)
- **Smart product segmentation** based on CSV data mapping
- **Pagination system** for large product catalogs
- **Sticky filters** for improved mobile experience

### Animation & Interaction System
- **Lucide Icons integration** with robust fallback handling
- **Fast animations** for snappy interactions
- **CSS transitions as backup** when JavaScript is unavailable
- **Error handling** prevents broken functionality
- **Progressive enhancement** approach

### Coffee-Specific Features
- **Studio booking system** for coffee experiences
- **Wholesale integration** for B2B customers
- **YouTube content integration** for coffee education
- **Instagram feed** for social proof
- **Newsletter signup** with coffee-focused messaging
- **Brand storytelling** sections

## 🎨 Design System

### Wide Awake Brand Colors
```css
:root {
  /* Wide Awake Brand Colors */
  --color-primary: #5CBFEE;     /* Brand Blue */
  --color-secondary: #2c1810;   /* Dark coffee brown */
  --color-accent: #d4574c;      /* Accent red for promotions */
  --color-text: #2c1810;        /* Main text color */
  --color-background: #ffffff;  /* Main background */
  --color-muted: #f8f5f1;       /* Light background for sections */
}
```

### Typography
- **Primary Font**: Poppins (body text, loaded via Google Fonts)
- **Brand Font**: Special Gothic Expanded One (headings, self-hosted)
- **Fluid Typography**: Using responsive font sizing
- **Performance optimized**: Font loading with preconnect and display:swap

### Coffee Product Categorization
- **Daily Driver**: Everyday coffee for regular consumption
- **Premium Brews**: High-quality single origins and special processes
- **Direct Trade**: Ethically sourced, farmer-direct coffees
- **Equipment**: Coffee brewing equipment and accessories

### Flavor Profile System
- **🍯 Smooth and Sweet**: Accessible, balanced coffees
- **🍋 Light and Bright**: Acidic, fruity, complex coffees
- **🎭 Complex and Expressive**: Unique processing, experimental coffees

## 📱 Responsive Design & Performance

### Mobile-First Approach
- **Advanced mobile navigation** with slide-out menu
- **Touch-optimized product discovery** with sticky filters
- **Responsive product grids** adapting to screen size
- **Mobile-optimized animations** and interactions

### Performance Optimization
- **Critical CSS inlined** for above-fold content
- **Lazy loading** for images and non-critical resources
- **Optimized font loading** with preconnect and font-display
- **JavaScript error handling** with graceful degradation
- **Asset optimization** for faster load times

## 🚀 Quick Start

### Prerequisites
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- Shopify development store
- Wide Awake Coffee product catalog

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/alexis/wide-awake-theme.git
   cd wide-awake-theme
   ```

2. **Connect to your store**
   ```bash
   shopify theme dev --store your-store.myshopify.com
   ```

3. **Start development**
   ```bash
   shopify theme dev
   ```

## 🎛️ Wide Awake Specific Configuration

### Product Setup
1. **Create collections**: `daily-driver`, `premium-brews`, `direct-trade`, `equipment`
2. **Set up product metafields** for coffee origin, processing, tasting notes
3. **Configure product segmentation** based on the CSV mapping system
4. **Upload coffee product images** with consistent aspect ratios

### Studio Booking Configuration
1. **Enable studio booking section** in theme settings
2. **Configure booking prices** and session details
3. **Set up contact forms** for booking inquiries

### Brand Assets
- **Upload Wide Awake logos** (horizontal black/white versions included)
- **Configure announcement bar** with shipping information
- **Set up social media links** (Facebook, Instagram, YouTube)

### Content Sections Setup
1. **Brand Story**: Configure storytelling content
2. **YouTube Integration**: Add channel content
3. **Instagram Feed**: Connect social media
4. **Newsletter Signup**: Configure email marketing
5. **Wholesale CTA**: Set up B2B messaging

## 🧹 Code Quality & Best Practices

### Liquid Best Practices
- **Semantic HTML5** structure throughout
- **Performance-optimized** Liquid loops and filters
- **Security-focused** with proper input escaping
- **Accessibility-first** development approach

### CSS Architecture
- **Component-based** styling with logical organization
- **CSS Custom Properties** for consistent design tokens
- **Mobile-first** responsive design approach
- **Performance-optimized** critical CSS delivery

### JavaScript Standards
- **Modern ES6+** without jQuery dependency
- **Progressive enhancement** philosophy
- **Error handling** and graceful degradation
- **Performance-focused** event handling

## 📊 Performance Targets

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **Lighthouse Score**: 90+ on mobile and desktop

### Optimization Features
- Critical CSS inlining
- Lazy loading for images
- Optimized font loading
- Minimal JavaScript footprint
- CDN-optimized asset delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/coffee-enhancement`
3. Commit your changes: `git commit -m 'Add coffee feature'`
4. Push to the branch: `git push origin feature/coffee-enhancement`
5. Open a Pull Request

## 📚 Wide Awake Theme Features Summary

### E-commerce Functionality
- ✅ Advanced product discovery with smart filtering
- ✅ Product segmentation (Daily Driver, Premium, Direct Trade)
- ✅ Quick view modals with size/grind selection
- ✅ Advanced cart management with drawer functionality
- ✅ Studio booking system integration
- ✅ Wholesale customer support

### Content & Marketing
- ✅ Brand storytelling sections
- ✅ YouTube content integration
- ✅ Instagram feed display
- ✅ Newsletter signup with coffee focus
- ✅ SEO-optimized structure
- ✅ Social media integration

### Technical Excellence
- ✅ Shopify 2.0 Online Store features
- ✅ Section Groups architecture
- ✅ JSON template system
- ✅ Performance optimization
- ✅ Accessibility compliance
- ✅ Mobile-first responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/alexis/wide-awake-theme/issues)
- **Documentation**: [Shopify Theme Development](https://shopify.dev/docs/themes)
- **Wide Awake Coffee**: [Official Website](https://wideawakecoffee.ph)

---

**Wide Awake Coffee Theme** - Built with ☕ and ❤️ following Shopify 2025 best practices for coffee e-commerce excellence.
