# Wide Awake Theme

A modern, performance-optimized Shopify theme featuring responsive design, dynamic localization, and seamless user experience. Built with clean aesthetics and powerful functionality for exceptional e-commerce stores.

## ✨ Features

### 🎨 Design & User Experience
- **Modern minimalist design** with clean typography and spacious layouts
- **Responsive mobile-first approach** optimized for all devices
- **Smooth animations** powered by anime.js with CSS fallbacks
- **Intuitive navigation** with slide-out mobile menu and search modal
- **Consistent UI elements** with standardized styling throughout

### 🚀 Performance Optimized
- **Critical CSS inlining** for faster initial page loads
- **Optimized JavaScript** with error handling and graceful degradation
- **Lazy loading** implementation for images and non-critical resources
- **Minimal dependencies** for faster load times

### 🌐 Shopify Integration
- **Dynamic localization** connected to Shopify's currency and language data
- **Real-time locale switching** with automatic cart currency updates
- **Metafields support** for extended product information
- **Online Store 2.0** features fully implemented
- **Section Groups** for flexible page building

### 📱 Mobile Experience
- **Touch-optimized interfaces** with proper tap targets
- **Mobile menu slides from left** for natural user flow
- **Search modal slides from right** maintaining UX conventions
- **Responsive typography** scaling appropriately across devices

## 🛠️ Technical Highlights

### Animation System
- **Anime.js integration** with smart fallback handling
- **Fast 200-250ms animations** for snappy interactions
- **CSS transitions as backup** when JavaScript is unavailable
- **Error handling** prevents broken functionality

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

## 🏗️ Project Structure

```
wide-awake-theme/
├── assets/              # Compiled CSS, JS, and media files
│   ├── theme.css       # Main stylesheet with responsive design
│   ├── theme.js        # Core JavaScript functionality
│   └── anime.min.js    # Animation library
├── layout/              
│   └── theme.liquid    # Main layout with localization
├── sections/            # Theme sections
│   ├── header.liquid   # Navigation with mobile menu & search
│   ├── footer.liquid   # Footer with locale selector
│   └── ...             # Other sections
├── snippets/            # Reusable components
├── templates/           # Page templates
├── config/              # Theme settings
└── locales/            # Translation files
```

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

### Localization Setup
1. Enable multiple currencies in Shopify admin
2. Add language translations in `locales/` folder
3. Configure market settings for region-specific content

### Animation Settings
Animations can be customized in `assets/theme.js`:
```javascript
// Animation timings (in milliseconds)
const ANIMATION_DURATION = 250; // Fast and snappy
const STAGGER_DELAY = 50;       // Smooth sequential animations
```

## 📱 Browser Support

- **Modern browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
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

## 🚀 Deployment

### Development Store
```bash
shopify theme push --unpublished --theme-id=123456789
```

### Live Store
```bash
shopify theme push --live
```

## 📊 Performance

- **Lighthouse Score**: 90+ on mobile and desktop
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/allexioz/wide-awake/issues)
- **Documentation**: [Shopify Theme Development](https://shopify.dev/docs/themes)
- **Community**: [Shopify Partners Slack](https://partners.shopify.com/)

---

Built with ❤️ for the Shopify ecosystem
