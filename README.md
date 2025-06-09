# Wide Awake Theme - Shopify 2024 Best Practices Implementation

A modern, performance-optimized Shopify theme featuring responsive design, dynamic localization, and seamless user experience. Built with clean aesthetics, powerful functionality, and following Shopify's 2024 best practices for exceptional e-commerce stores.

## ✨ Features

### 🎨 Design & User Experience
- **Modern minimalist design** with clean typography and spacious layouts
- **Responsive mobile-first approach** optimized for all devices
- **Smooth animations** powered by anime.js with CSS fallbacks
- **Intuitive navigation** with slide-out mobile menu and search modal
- **Consistent UI elements** with standardized styling throughout
- **Brand-focused design system** with Wide Awake coffee theme aesthetic

### 🚀 Performance Optimized
- **Critical CSS inlining** for faster initial page loads
- **Optimized JavaScript** with error handling and graceful degradation
- **Lazy loading** implementation for images and non-critical resources
- **Minimal dependencies** for faster load times
- **Core Web Vitals optimized** targeting LCP < 2.5s, FID < 100ms, CLS < 0.1

### 🌐 Shopify Integration
- **Dynamic localization** connected to Shopify's currency and language data
- **Real-time locale switching** with automatic cart currency updates
- **Metafields support** for extended product information
- **Online Store 2.0** features fully implemented
- **Section Groups** for flexible page building
- **JSON Templates** for enhanced merchant customization

### 📱 Mobile Experience
- **Touch-optimized interfaces** with proper tap targets
- **Mobile menu slides from left** for natural user flow
- **Search modal slides from right** maintaining UX conventions
- **Responsive typography** scaling appropriately across devices

### ♿ Accessibility
- **WCAG 2.1 AA Compliance** with proper contrast ratios
- **Keyboard Navigation** for all interactive elements
- **Screen Reader Support** with semantic HTML and ARIA labels
- **Skip Links** for improved navigation
- **Focus Management** with clear visual indicators

## 🏗️ Architecture & Structure

### Theme Structure
Following Shopify's recommended theme architecture:
```
wide-awake-theme/
├── assets/              # Static assets (CSS, JS, images, fonts)
│   ├── theme.css       # Main stylesheet with responsive design
│   ├── theme.js        # Core JavaScript functionality
│   ├── anime.min.js    # Animation library
│   └── critical.css    # Above-the-fold critical styles
├── blocks/              # Reusable UI components
├── config/              # Theme settings and configurations
│   ├── settings_data.json
│   └── settings_schema.json
├── layout/              
│   └── theme.liquid    # Main layout with localization
├── locales/            # Translation files
├── sections/            # Theme sections
│   ├── header.liquid   # Navigation with mobile menu & search
│   ├── footer.liquid   # Footer with locale selector
│   └── ...             # Other modular sections
├── snippets/            # Reusable code fragments
└── templates/           # Page templates combining sections
```

### Section-Based Architecture
- **Modular Design**: All content areas are built as sections for maximum flexibility
- **Block Support**: Sections support blocks for granular customization
- **JSON Templates**: Using JSON templates for enhanced merchant customization

## 🛠️ Technical Highlights

### Animation System
- **Anime.js integration** with smart fallback handling
- **Fast 200ms animations** for snappy interactions
- **CSS transitions as backup** when JavaScript is unavailable
- **Error handling** prevents broken functionality
- **Stagger delays of 30ms** for smooth sequential animations

### Localization Features
- **Dynamic currency display** using `cart.currency.iso_code`
- **Language switching** connected to `request.locale.name`
- **Automatic dropdown visibility** only when multiple options available
- **Fallback to theme settings** for maximum compatibility

### Code Quality
- **Modular JavaScript** with proper error handling
- **Clean CSS architecture** using custom properties
- **Semantic HTML** for accessibility and SEO
- **Performance monitoring** with debugging capabilities
- **BEM Methodology** for CSS organization
- **Modern ES6+** JavaScript without jQuery dependency

## 🎨 Design System

### Brand Colors
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
- **Primary Font**: Poppins (body text)
- **Heading Font**: Special Gothic Expanded One (brand headings)
- **Fluid Typography**: Using `clamp()` for responsive font sizing
- **Line Height**: Optimized for readability (1.6 for body, 1.2 for headings)

### Spacing System
```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
--spacing-2xl: 4rem;
```

## 📱 Responsive Design

### Mobile-First Approach
- All CSS written mobile-first with progressive enhancement
- Breakpoints follow Shopify's recommended approach:
  - Mobile: `max-width: 749px`
  - Tablet: `750px - 989px`
  - Desktop: `min-width: 990px`

### Flexible Grid System
```css
.shopify-section {
  display: grid;
  grid-template-columns: 
    minmax(var(--page-margin, 2rem), 1fr) 
    min(var(--page-width, 120rem), 100% - var(--page-margin, 2rem) * 2) 
    minmax(var(--page-margin, 2rem), 1fr);
}
```

### Responsive Images
- Using Shopify's responsive image system
- Multiple image sizes: `375, 550, 750, 1100, 1500, 1780, 2000, 3000, 3840`
- Lazy loading implemented
- Proper `alt` attributes for accessibility

## 🚀 Quick Start

### Prerequisites
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)
- [Node.js](https://nodejs.org/) (v16+)
- Shopify development store

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/allexioz/wide-awake.git
   cd wide-awake
   ```

2. **Connect to your store**
   ```bash
   shopify theme dev --store your-store.myshopify.com
   ```

3. **Start development**
   ```bash
   shopify theme dev
   ```

## 🎛️ Customization

### Header Configuration
The header supports multiple customization options:
- Logo upload and sizing
- Navigation menu configuration
- Search functionality toggle
- Mobile menu behavior

### Section Settings
Each section includes comprehensive customization options:
- Content positioning (9 desktop positions)
- Mobile alignment options
- Color scheme selections
- Typography controls
- Spacing adjustments

### Localization Setup
1. Enable multiple currencies in Shopify admin
2. Add language translations in `locales/` folder
3. Configure market settings for region-specific content

### Animation Settings
Animations can be customized in `assets/theme.js`:
```javascript
// Animation timings (in milliseconds)
const ANIMATION_DURATION = 200; // Fast and snappy
const STAGGER_DELAY = 30;       // Smooth sequential animations
```

### Theme Settings
Global theme customization through `config/settings_schema.json`:
- Brand colors
- Typography choices
- Layout options
- Feature toggles

## 📱 Browser Support

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Progressive enhancement**: Graceful degradation for older browsers
- **Mobile optimized**: iOS Safari 12+, Chrome Mobile 60+

## 🔧 Development

### Key Components

**Mobile Menu** (`layout/theme.liquid`)
- Slides from left with smooth animations
- Touch-friendly navigation
- Automatic close on outside click

**Search Modal** (`layout/theme.liquid`)
- Slides from right with backdrop
- Real-time search functionality
- Keyboard navigation support

**Locale Selector** (`sections/footer.liquid`)
- Dynamic currency/language switching
- Connected to Shopify localization API
- Conditional visibility based on available options

### Performance Features
- Critical CSS inlined for above-fold content
- Non-blocking JavaScript loading
- Optimized asset delivery
- Minimal third-party dependencies

### Development Workflow
```bash
# Start development server
shopify theme dev

# Pull theme updates
shopify theme pull

# Push changes
shopify theme push
```

## ⚡ Performance Optimization

### Critical CSS
- Inlined critical CSS for above-the-fold content
- Separated critical styles from non-critical assets
- Modern CSS reset based on best practices

### Image Optimization
- WebP format support with fallbacks
- Responsive images with appropriate sizing
- Lazy loading for non-critical images
- Optimized loading with `loading="lazy"`

### Font Loading
- Preloading critical fonts
- Font display: swap for better perceived performance
- Local font fallbacks

### Code Splitting
```html
<!-- Critical CSS inlined -->
<style>{{ 'critical.css' | asset_content }}</style>

<!-- Non-critical CSS loaded asynchronously -->
{{ 'theme.css' | asset_url | stylesheet_tag }}
```

## 🚀 Deployment

### Development Store
```bash
shopify theme push --unpublished --theme-id=123456789
```

### Live Store
```bash
shopify theme push --live
```

### Production Checklist
- [ ] Performance audit with Lighthouse
- [ ] Accessibility audit with axe
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] SEO optimization check

## 📊 Performance Metrics

### Core Web Vitals Targets
- **Lighthouse Score**: 90+ on mobile and desktop
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques
- Critical resource prioritization
- Efficient CSS delivery
- Optimized font loading
- Image optimization
- Minimal JavaScript

## 🧹 Clean Code Practices

### CSS Organization
- **BEM Methodology**: Block Element Modifier naming convention
- **CSS Custom Properties**: Consistent design tokens
- **Logical Grouping**: Related styles grouped together
- **Mobile-First**: Progressive enhancement approach

### Liquid Best Practices
- **Semantic HTML**: Proper HTML5 semantic elements
- **Conditional Rendering**: Efficient use of Liquid conditionals
- **Performance**: Optimized Liquid loops and filters
- **Security**: Proper escaping of user inputs

### JavaScript Standards
- **Modern ES6+**: Using modern JavaScript features
- **Progressive Enhancement**: JS enhances, doesn't break functionality
- **Event Delegation**: Efficient event handling
- **No jQuery**: Vanilla JavaScript for better performance

## 🧪 Testing

### Testing Strategy
- Cross-browser testing
- Mobile device testing
- Accessibility testing with screen readers
- Performance testing with Lighthouse

### Accessibility Testing
```html
<!-- Skip to content link -->
<a class="skip-to-content-link" href="#MainContent">Skip to content</a>

<!-- Proper heading hierarchy -->
<h1 id="Banner-heading-{{ section.id }}">...</h1>

<!-- ARIA labels for interactive elements -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Best Practices Summary

### Code Quality
1. **Semantic HTML**: Use proper HTML5 semantic elements
2. **CSS Organization**: Follow BEM methodology and logical grouping
3. **Performance**: Optimize critical rendering path
4. **Accessibility**: Ensure WCAG 2.1 AA compliance
5. **Responsive**: Mobile-first, fluid design approach

### Shopify Specific
1. **Section Architecture**: Modular, reusable sections
2. **JSON Templates**: Flexible page building
3. **Theme Settings**: Comprehensive customization options
4. **Performance**: Leverage Shopify's CDN and image optimization
5. **SEO**: Proper meta tags and structured data

### Future-Proofing
1. **Modern CSS**: Use modern CSS features with fallbacks
2. **Progressive Enhancement**: Build for resilience
3. **Performance Budget**: Monitor and maintain performance
4. **Accessibility First**: Design inclusively from the start
5. **Sustainable Code**: Write maintainable, scalable code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/allexioz/wide-awake/issues)
- **Documentation**: [Shopify Theme Development](https://shopify.dev/docs/themes)
- **Community**: [Shopify Partners Slack](https://partners.shopify.com/)

## 🔗 Resources

- [Shopify Theme Development Best Practices](https://shopify.dev/docs/themes/best-practices)
- [Shopify Performance Best Practices](https://shopify.dev/docs/themes/best-practices/performance)
- [Shopify Accessibility Guidelines](https://shopify.dev/docs/themes/best-practices/accessibility)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Wide Awake Theme** - Built with ☕ and ❤️ following Shopify 2024 best practices for performance, accessibility, and user experience.
