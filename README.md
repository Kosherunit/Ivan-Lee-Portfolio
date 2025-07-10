# Photography & Video Portfolio Website

A responsive photography and videography portfolio website inspired by professional studio websites like ISLET STUDIO. This project demonstrates modern web development techniques for creating visually striking portfolio sites.

## Features

- Responsive design that works on all device sizes
- Dark theme with elegant typography
- Video integration with autoplay and responsive controls
- CSS Grid and Flexbox for modern layouts
- Animated transitions and hover effects
- Mobile-friendly navigation with hamburger menu
- Optimized for performance

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Intersection Observer API for scroll-based animations
- Font Awesome for icons

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. To see the video functionality, add video files to the `assets` directory

## Project Structure

```
portfolio-website/
├── index.html            # Main HTML file
├── css/
│   └── styles.css        # Main stylesheet
├── js/
│   └── script.js         # JavaScript functionality
├── assets/               # For videos and other assets
└── images/               # Project images
    ├── Beijing/
    ├── Indonesia landscapes/
    └── Tianjin China/
```

## Video Integration

For the full experience, add your own video files:

1. Add `.mp4` video files to the `assets` directory
2. Update the video source in `index.html`

```html
<video autoplay muted loop playsinline>
    <source src="assets/your-video-file.mp4" type="video/mp4">
    <!-- Fallback image -->
    <img src="images/fallback-image.jpg" alt="Video fallback">
</video>
```

## Customization

- Update images in the `images` directory
- Modify styles in `css/styles.css`
- Add your own projects to the portfolio grid in `index.html`

## License

This project is for demonstration purposes.

## Acknowledgements

- Design inspiration from ISLET STUDIO
- Font Awesome for icons
- Various photography and videography portfolios 