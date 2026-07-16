# OverlayStudio - Video Editor

A modern, mobile-friendly video editor focused on **overlay/picture-in-picture (PiP)** features. Perfect for creating content where you need your talking video with an article, website, or secondary video in the background.

## Features

✅ **Easy Overlay Positioning** - Drag-and-drop positioning with visual preview
✅ **Rich Overlay Controls** - Opacity, rotation, scale, border radius, and more
✅ **Mobile-Responsive** - Works seamlessly on phone and desktop
✅ **High-Quality Export** - Multiple quality presets (480p, 720p, 1080p)
✅ **Clean, Intuitive UI** - No confusing menus, just what you need
✅ **Real-time Preview** - See changes instantly on canvas

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## How to Use

1. **Upload Main Video** - Your talking head or main content
2. **Upload Overlay** - Article, website screenshot, or secondary video
3. **Position & Style** - Use the intuitive controls to:
   - Drag to position the overlay
   - Adjust opacity, rotation, scale
   - Set border radius for rounded corners
   - Use quick position presets (top-left, center, etc.)
4. **Preview** - Play/pause to see your result
5. **Export** - Download with your preferred quality

## Key Improvements Over CapCut

- **Simpler Positioning** - Visual drag-based system instead of confusing menus
- **More Overlay Controls** - Rotation, scale, border radius all in one place
- **Cleaner Interface** - Mobile-first design, no overwhelming options
- **Faster Workflow** - Quick presets and real-time preview

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **FFmpeg.wasm** - Video processing
- **Lucide React** - Icons

## Mobile Notes

The app is fully responsive and works great on mobile devices. Tap to upload videos, use sliders for fine-tuning controls, and tap to export.