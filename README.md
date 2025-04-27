# Embeddable Chat Widget

A modern, customizable chat widget that can be easily embedded into any website. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Theme customization through CSS variables
- 🌓 Dark theme support
- 💬 Real-time chat functionality
- 🔄 Automatic reconnection handling
- 📱 Responsive design
- 💾 Session storage for message persistence
- ⚡ Lightweight and performant

## Quick Start

Add the following script tag to your website:

```html
<script 
    src="https://chatwidget1.netlify.app/widget.js"
    data-widget-url="https://chatwidget1.netlify.app/"
></script>
```

## Theme Customization

The chat widget automatically adapts to your website's theme using CSS variables. Add these variables to your website's CSS:

```css
:root {
    --primary-color: #6366f1;  /* Main color for the widget */
    --text-color: #ffffff;     /* Text color */
    --accent-color: #f43f5e;   /* Accent color for notifications */
}
```

If no variables are defined, the widget will use its default dark theme.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build the widget:
```bash
npm run build:widget
```

## Technical Details

- Built with React 18 and TypeScript
- Uses Tailwind CSS for styling
- Socket.IO for real-time communication
- Vite for bundling and development
- Lucide React for icons

## Features

### Real-time Communication
- WebSocket connection using Socket.IO
- Automatic reconnection handling
- Network status detection

### UI Components
- Expandable chat bubble
- Full chat window interface
- Message history view
- Typing interface
- Loading states
- Error handling

### Storage
- Session storage for message persistence
- Maintains chat history during page refresh

### Customization
- Theme customization through CSS variables
- Responsive design that works on all devices
- Smooth animations and transitions
