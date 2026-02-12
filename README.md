# 👔 Martinez Styles

> **Define tu estilo. Crea tu combinación.**

A modern, interactive outfit builder application combining the creative canvas of Canva, the visual appeal of Pinterest, and the e-commerce functionality of Zara.

![Martinez Styles](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-cyan)

## ✨ Features

- 🎨 **Drag & Drop Outfit Builder** - Create custom outfit combinations with intuitive drag-and-drop
- 🛍️ **Product Catalog** - Browse products with advanced filtering (category, color, price)
- 💾 **Save Outfits** - Store your favorite combinations with LocalStorage persistence
- 🛒 **Shopping Cart** - Add individual products or complete outfits to cart
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Premium Animations** - Smooth Framer Motion transitions and micro-interactions
- 🎯 **Modern Design** - Glassmorphism, custom shadows, and premium typography

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd martinez-styles

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Core
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Custom Design System** - Premium colors, typography, and shadows

### State & Data
- **Zustand** - Lightweight state management
- **LocalStorage** - Persistent data storage
- **Axios** - HTTP client for API calls
- **FakeStore API** - Product data source

### Drag & Drop
- **@dnd-kit** - Modern, accessible drag-and-drop library
- Touch and mouse support
- Free positioning on canvas

### Routing
- **React Router DOM** - Client-side routing

## 📁 Project Structure

```
martinez-styles/
├── src/
│   ├── features/              # Feature modules
│   │   ├── catalog/           # Product catalog
│   │   ├── outfit-builder/    # Drag & drop builder
│   │   ├── saved-outfits/     # Saved outfits gallery
│   │   ├── cart/              # Shopping cart
│   │   └── home/              # Landing page
│   ├── shared/
│   │   ├── components/        # Reusable components
│   │   ├── types/             # TypeScript types
│   │   └── hooks/             # Custom hooks
│   ├── store/                 # Zustand state management
│   ├── services/              # API integration
│   └── styles/                # Global CSS
├── public/                    # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Neutral tones (beige to black)
- **Accent**: Warm yellows/golds for CTAs

### Typography
- **Display**: Poppins (headings, brand)
- **Body**: Inter (text, UI)

### Effects
- Glassmorphism
- Soft shadows
- Smooth animations
- Custom scrollbar

## 🌟 Key Features Explained

### 1. Hero Section
- Animated gradient background
- Brand messaging with CTAs
- Feature showcase cards

### 2. Product Catalog
- Grid layout with responsive columns
- Advanced filtering (category, color, price, search)
- Lazy-loaded product images
- Skeleton loading states

### 3. Outfit Builder
- **Left Panel**: Draggable product palette
- **Center**: Canvas with free positioning
- **Right Panel**: Outfit summary with total price
- Save outfits with custom names
- Add complete outfits to cart

### 4. Saved Outfits
- Gallery view of saved combinations
- Load outfits back into builder
- Add to cart or delete

### 5. Shopping Cart
- Slide-in drawer from navigation
- Support for products and outfits
- Quantity controls
- Dynamic total calculation

## 🔧 Configuration

### Environment Variables
No environment variables required for basic setup. FakeStore API is public.

### Customization
- **Colors**: Edit `tailwind.config.js`
- **API**: Replace FakeStore API in `src/services/api.service.ts`
- **Fonts**: Update Google Fonts import in `src/index.css`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run preview
```

### Hosting

Deploy the `dist/` folder to any static hosting provider.

### GitHub Pages

```bash
# Update vite.config.ts with base: '/repo-name/'
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🎯 Future Enhancements

- [ ] Dark mode toggle
- [ ] User authentication
- [ ] Backend integration
- [ ] Export outfit as image
- [ ] Social sharing
- [ ] Product recommendations
- [ ] Size selection
- [ ] Wishlist feature
- [ ] Advanced search with autocomplete
- [ ] Outfit templates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Martinez Styles Team**

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
