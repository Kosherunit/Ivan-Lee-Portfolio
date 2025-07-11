document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Enable scroll after loading
            document.body.style.overflow = 'auto';
            
            // Trigger animations after loading
            animateElements();
            
            // Initialize T-REX game
            initTRexGame();
            
            // Initialize floating animations
            initFloatingAnimations();
            
            // Initialize creator image
            initCreatorCarousel();
            
            // Initialize about page animations
            initAboutPageAnimations();
            
            // Initialize photography masonry grid
            initPhotographyMasonry();
            
            // Initialize header scroll effect
            initializeHeaderScroll();
            
            // Initialize store features
            initStoreFeatures();
            
            // Initialize premium video features
            initPremiumVideoFeatures();
            initPremiumButtonEffects();
            initVideoProgressAnimation();
            
            // Initialize social media grid with bottomless scrolling
            initSocialMediaGrid();
            
            // Initialize collaborations grid with bottomless scrolling
            initCollaborationsGrid();
        }, 1500);
    });
    
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';
    
    // Fullscreen Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const closeBtn = document.querySelector('.close-btn');
    const menuLinks = document.querySelectorAll('.menu-items a');
    
    // Toggle menu on hamburger click
    hamburgerMenu.addEventListener('click', () => {
        fullscreenMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        
        // Toggle body scroll
        if (fullscreenMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling when menu is closed
        }
    });
    
    // Close menu on close button click
    closeBtn.addEventListener('click', () => {
        fullscreenMenu.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    });
    
    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            fullscreenMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    });
    
    // Mobile Navigation Toggle
    const navLinks = document.querySelector('.nav-links');
    
    // Navigation Links and Section Indicator
    const navItems = document.querySelectorAll('.nav-item');
    const currentSection = document.querySelector('.current-section');
    
    // Set initial section text based on active nav item
    const activeNavItem = document.querySelector('.nav-item.active');
    if (activeNavItem && currentSection) {
        currentSection.textContent = activeNavItem.textContent;
    }
    
    // Make portfolio items clickable and redirect to appropriate detail pages
    const portfolioItems = document.querySelectorAll('.portfolio-item, .hero-project, .left-featured-content');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the project title/info
            const itemInfo = this.querySelector('.item-info h3');
            let category = '';
            
            if (itemInfo) {
                const title = itemInfo.textContent.toLowerCase();
                
                // Determine which category this project belongs to
                if (title.includes('tourism') || title.includes('air asia') || title.includes('gucci')) {
                    category = 'commercial.html';
                } else if (title.includes('dji') || title.includes('mavic')) {
                    category = 'product.html';
                } else if (title.includes('yayasan') || title.includes('tunku')) {
                    category = 'corporate.html';
                } else if (title.includes('reels') || title.includes('social')) {
                    category = 'social-media.html';
                } else {
                    // Default to photography for anything else
                    category = 'photography.html';
                }
                
                // Navigate to the corresponding detail page
                window.location.href = category;
            }
        });
        
        // Add hover effect to indicate clickability
        item.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.classList.add('hover-effect');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });
    
    // Add hover effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-item.hover-effect, .hero-project.hover-effect, .left-featured-content.hover-effect {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Do not prevent default since we've updated the links to actual pages
            
            // Update current section indicator
            if (currentSection) {
                currentSection.textContent = this.textContent;
                
                // Add animation
                currentSection.style.opacity = 0;
                setTimeout(() => {
                    currentSection.style.opacity = 0.7;
                }, 300);
            }
            
            // Remove active class from all nav items
            navItems.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form field validation
        const validateField = (field) => {
            const value = field.value.trim();
            const fieldName = field.id;
            
            // Check if field is required and empty
            if (field.hasAttribute('required') && value === '') {
                showError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
                return false;
            }
            
            // Email validation
            if (fieldName === 'email' && value !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
            }
            
            // Clear error state
            clearError(field);
            return true;
        };
        
        // Show error message
        const showError = (field, message) => {
            clearError(field); // Clear any existing errors
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            const parent = field.parentElement;
            parent.appendChild(errorDiv);
            
            field.classList.add('error-input');
        };
        
        // Clear error message
        const clearError = (field) => {
            const parent = field.parentElement;
            const errorDiv = parent.querySelector('.error-message');
            
            if (errorDiv) {
                parent.removeChild(errorDiv);
            }
            
            field.classList.remove('error-input');
        };
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error-input')) {
                    validateField(input);
                }
            });
        });
        
        // Form submission handler
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all form fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state on button
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission with a timeout (in a real app, this would be an AJAX request)
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    // Insert before the form
                    contactForm.parentElement.insertBefore(successMessage, contactForm);
                    
                    // Hide the form temporarily
                    contactForm.style.display = 'none';
                    
                    // Reset button state (though form is hidden)
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // After a delay, hide success message and show form again
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            contactForm.parentElement.removeChild(successMessage);
                            contactForm.style.display = 'block';
                        }, 500);
                    }, 3000);
                    
                }, 1500);
            }
        });
    }
    
    // CTA Button Animation
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        button.addEventListener('click', function(e) {
            if ((this.tagName === 'BUTTON' && this.type !== 'submit')) {
                e.preventDefault();
            }
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Animate CTA section when it becomes visible
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-cta');
                }
            });
        }, { threshold: 0.2 });
        
        ctaObserver.observe(ctaSection);
    }
    
    // Check if video files exist, if not, use the fallback images
    const videoElements = document.querySelectorAll('video');
    
    // Implement lazy loading for videos
    const lazyLoadVideos = () => {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source');
                    
                    // Start loading the video when it comes into view
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        video.load();
                        video.play().catch(e => {/* console.log('Autoplay prevented:', e); */});
                        observer.unobserve(video);
                    } else if (video.paused) {
                        // If the video is already loaded but paused, play it
                        video.play().catch(e => {/* console.log('Autoplay prevented:', e); */});
                    }
                } else if (!entry.isIntersecting && !entry.target.paused) {
                    // Pause the video when it's out of view to save resources
                    entry.target.pause();
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px 200px 0px' });
        
        // Observe all videos
        videoElements.forEach(video => {
            // For videos below the fold, set up lazy loading
            if (!isInViewport(video)) {
                const source = video.querySelector('source');
                if (source) {
                    source.dataset.src = source.src;
                    source.removeAttribute('src');
                }
            }
            videoObserver.observe(video);
        });
    };
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initialize lazy loading after page is fully loaded
    window.addEventListener('load', () => {
        lazyLoadVideos();
    });
    
    videoElements.forEach(video => {
        // Add error event listener to detect when video can't be loaded
        video.addEventListener('error', function(e) {
            // Check if the error is from the video element itself or from the source
            const videoError = e.target.nodeName === 'VIDEO' || 
                              (e.target.nodeName === 'SOURCE' && e.target.parentNode.nodeName === 'VIDEO');
            
            if (videoError) {
                // Get the fallback image from within the video element
                const fallbackImg = this.querySelector('img');
                if (fallbackImg) {
                    // Get parent container
                    const mediaContainer = this.parentNode;
                    
                    // Create new image element
                    const newImg = document.createElement('img');
                    newImg.src = fallbackImg.src;
                    newImg.alt = fallbackImg.alt;
                    newImg.classList.add('fallback-image');
                    
                    // Replace video with image
                    mediaContainer.replaceChild(newImg, this);
                    
                    // console.log('Video replaced with fallback image');
                }
            }
        }, true); // Use capture to catch the event in the capture phase
    });
    
    // Reveal animations on scroll for all items
    const revealOnScroll = () => {
        const revealElements = document.querySelectorAll('.project-info, .item-info, .portfolio-item, .left-featured-content');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    };
    
    // Initialize reveal animations
    revealOnScroll();
    
    // Set reveal class style
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Reveal animations for elements as they come into view
    function animateElements() {
        // Reveal project info
        document.querySelectorAll('.project-info').forEach(info => {
            info.classList.add('reveal');
        });
        
        // Reveal portfolio items with delay
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('reveal');
                // Reveal item info after item is revealed
                const itemInfo = item.querySelector('.item-info');
                if (itemInfo) {
                    setTimeout(() => {
                        itemInfo.classList.add('reveal');
                    }, 300);
                }
            }, 100 * index);
        });
        
        // Animate CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            // Check if element is in viewport
            const rect = ctaSection.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isInViewport) {
                ctaSection.classList.add('animate-cta');
            } else {
                // If not in viewport, add event listener to check on scroll
                window.addEventListener('scroll', function ctaCheck() {
                    const rect = ctaSection.getBoundingClientRect();
                    const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
                    
                    if (isInViewport) {
                        ctaSection.classList.add('animate-cta');
                        window.removeEventListener('scroll', ctaCheck);
                    }
                });
            }
        }
    }
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Download button functionality
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.dataset.type;
            
            // Create mock download links
            const mockFiles = {
                'cv': 'assets/Ivan_Lee_CV_2025.pdf',
                'media-kit': 'assets/Ivan_Lee_Media_Kit_2025.pdf'
            };
            
            const filename = mockFiles[type];
            if (filename) {
                // Create temporary download link
                const link = document.createElement('a');
                link.href = '#'; // In a real implementation, this would be the actual file URL
                link.download = filename;
                link.click();
                
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'download-notification';
                notification.textContent = `${type === 'cv' ? 'CV' : 'Media Kit'} download started!`;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--accent-color);
                    color: var(--bg-primary);
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        });
    });
});

// Dark/Light Mode Toggle
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add smooth transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// Google T-REX Game Implementation
function initTRexGame() {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.warn('T-REX Game: Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const gameStatusElement = document.getElementById('gameStatus');
    const restartButton = document.getElementById('restartGame');
    
    if (!ctx || !scoreElement || !gameStatusElement || !restartButton) {
        console.warn('T-REX Game: Required elements not found');
        return;
    }
    
    let gameRunning = false;
    let gameOver = false;
    let score = 0;
    let gameSpeed = 3;
    let winningScore = 3;
    
    // Game objects
    const dino = {
        x: 50,
        y: canvas.height - 80,
        width: 50,
        height: 60,
        dy: 0,
        jumpPower: 15,
        grounded: true,
        color: '#00ff88'
    };
    
    const obstacles = [];
    const maxObstacles = 3;
    let frameCount = 0;
    
    // Game controls
    function jump() {
        if (dino.grounded && gameRunning) {
            dino.dy = -dino.jumpPower;
            dino.grounded = false;
        }
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (!gameRunning && !gameOver) {
                startGame();
            } else {
                jump();
            }
        }
    });
    
    // Touch controls for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!gameRunning && !gameOver) {
            startGame();
        } else {
            jump();
        }
    });
    
    // Mouse controls
    canvas.addEventListener('click', (e) => {
        if (!gameRunning && !gameOver) {
            startGame();
        } else {
            jump();
        }
    });
    
    // Restart button
    restartButton.addEventListener('click', () => {
        resetGame();
        gameStatusElement.textContent = 'Press SPACE to start';
        restartButton.style.display = 'none';
    });
    
    function startGame() {
        gameRunning = true;
        gameOver = false;
        gameStatusElement.textContent = `Get ${winningScore} points to win!`;
        restartButton.style.display = 'none';
        gameLoop();
    }
    
    function resetGame() {
        gameRunning = false;
        gameOver = false;
        score = 0;
        gameSpeed = 3;
        dino.y = canvas.height - 80;
        dino.dy = 0;
        dino.grounded = true;
        obstacles.length = 0;
        frameCount = 0;
        updateScore();
    }
    
    function updateScore() {
        scoreElement.textContent = score;
    }
    
    function createObstacle() {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 40,
            width: 20,
            height: 40,
            color: '#ff6b6b'
        });
    }
    
    function updateDino() {
        // Apply gravity
        dino.dy += 0.8;
        dino.y += dino.dy;
        
        // Ground collision
        if (dino.y >= canvas.height - 80) {
            dino.y = canvas.height - 80;
            dino.dy = 0;
            dino.grounded = true;
        }
    }
    
    function updateObstacles() {
        // Create new obstacles
        if (frameCount % 120 === 0 && obstacles.length < maxObstacles) {
            createObstacle();
        }
        
        // Update obstacle positions
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const obstacle = obstacles[i];
            obstacle.x -= gameSpeed;
            
            // Remove off-screen obstacles and increase score
            if (obstacle.x + obstacle.width < 0) {
                obstacles.splice(i, 1);
                score++;
                updateScore();
                
                // Check win condition
                if (score >= winningScore) {
                    winGame();
                    return;
                }
                
                // Increase game speed gradually
                gameSpeed += 0.1;
            }
        }
    }
    
    function checkCollisions() {
        for (const obstacle of obstacles) {
            if (dino.x < obstacle.x + obstacle.width &&
                dino.x + dino.width > obstacle.x &&
                dino.y < obstacle.y + obstacle.height &&
                dino.y + dino.height > obstacle.y) {
                endGame();
                return;
            }
        }
    }
    
    function winGame() {
        gameRunning = false;
        gameOver = false;
        gameStatusElement.textContent = 'You Win! 🎉 Starting new round...';
        
        setTimeout(() => {
            resetGame();
            // Auto-restart after winning
            setTimeout(() => {
                startGame();
            }, 1000);
        }, 2000);
    }
    
    function endGame() {
        gameRunning = false;
        gameOver = true;
        gameStatusElement.textContent = 'Game Over! Click restart to play again.';
        restartButton.style.display = 'inline-block';
    }
    
    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#333';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        
        // Draw dino (T-REX shape)
        ctx.fillStyle = dino.color;
        
        // Draw T-REX body
        ctx.fillRect(dino.x + 10, dino.y + 20, dino.width - 20, dino.height - 30);
        
        // Draw T-REX head
        ctx.fillRect(dino.x + 15, dino.y, 20, 25);
        
        // Draw T-REX legs
        ctx.fillRect(dino.x + 5, dino.y + dino.height - 15, 8, 15);
        ctx.fillRect(dino.x + 25, dino.y + dino.height - 15, 8, 15);
        
        // Draw T-REX arms (small)
        ctx.fillRect(dino.x + 5, dino.y + 25, 6, 10);
        
        // Draw T-REX tail
        ctx.fillRect(dino.x + dino.width - 15, dino.y + 25, 15, 8);
        
        // Draw eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(dino.x + 18, dino.y + 5, 2, 2);
        ctx.fillRect(dino.x + 22, dino.y + 5, 2, 2);
        
        // Draw obstacles
        obstacles.forEach(obstacle => {
            ctx.fillStyle = obstacle.color;
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
        
        // Draw instructions if not running
        if (!gameRunning && !gameOver) {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted') || '#666';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Click or press SPACE to jump!', canvas.width / 2, 50);
        }
    }
    
    function gameLoop() {
        if (!gameRunning) return;
        
        frameCount++;
        updateDino();
        updateObstacles();
        checkCollisions();
        draw();
        
        if (gameRunning) {
            requestAnimationFrame(gameLoop);
        }
    }
    
    // Initial draw
    draw();
}

// Floating Animations for Brand Clients
function initFloatingAnimations() {
    // Existing floating animations for brand clients
    const clientBoxes = document.querySelectorAll('.client-logo-box');
    
    clientBoxes.forEach((box, index) => {
        // Create staggered floating animation
        box.style.animationDelay = `${index * 0.2}s`;
        box.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite alternate`;
    });
    
    // Define float animation if not already defined
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);

    // Add hover effect for client logos
    clientBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px var(--shadow-color)';
            this.style.borderColor = 'var(--accent-color)';
            
            // Pause the floating animation on hover
            this.style.animationPlayState = 'paused';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.borderColor = '';
            
            // Resume the floating animation
            this.style.animationPlayState = 'running';
        });
    });
}

// Enhanced animations for hero videos
function initHeroAnimations() {
    const heroItems = document.querySelectorAll('.hero-video-item');
    
    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.2 });
    
    heroItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
});

// Add floating animation CSS
const floatingCSS = `
.floating {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = floatingCSS;
document.head.appendChild(style);

// Initialize Creator Image
function initCreatorCarousel() {
    const creatorImage = document.querySelector('.creator-image');
    if (!creatorImage) {
        return;
    }
    
    const img = creatorImage.querySelector('img');
    if (img) {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            const placeholder = creatorImage.querySelector('.placeholder-image');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    }
}

// Enhanced Background Animations for About Page
function initAboutPageAnimations() {
    if (!document.querySelector('.about-page')) return;
    
    // Create floating particles
    createFloatingParticles();
    
    // Add scroll-triggered color changes
    initScrollColorChanges();
    
    // Add mouse trail effect
    initMouseTrailEffect();
}

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 15}s infinite linear;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

function initScrollColorChanges() {
    const aboutPage = document.querySelector('.about-page');
    if (!aboutPage) return;
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = Math.floor(scrollPercentage * 360);
        
        aboutPage.style.setProperty('--dynamic-color', `hsl(${hue}, 70%, 50%)`);
    });
}

function initMouseTrailEffect() {
    if (!document.querySelector('.about-page')) return;
    
    const trail = [];
    const trailLength = 8;
    let animationFrame;
    
    // Throttle mouse events for better performance
    let isThrottled = false;
    
    document.addEventListener('mousemove', (e) => {
        if (isThrottled) return;
        
        isThrottled = true;
        setTimeout(() => { isThrottled = false; }, 16); // ~60fps
        
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Cancel previous animation frame
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        // Schedule particle update
        animationFrame = requestAnimationFrame(() => {
            // Clean up old particles
            document.querySelectorAll('[id^="trail-"]').forEach(p => p.remove());
            
            // Create new trail particles
            trail.forEach((point, index) => {
                const particle = document.createElement('div');
                particle.id = `trail-${index}`;
                particle.style.cssText = `
                    position: fixed;
                    left: ${point.x - (index + 1)}px;
                    top: ${point.y - (index + 1)}px;
                    width: ${(index + 1) * 2}px;
                    height: ${(index + 1) * 2}px;
                    background: rgba(0, 255, 136, ${0.6 - index * 0.07});
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: opacity 0.2s ease;
                `;
                
                document.body.appendChild(particle);
                
                // Remove after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.style.opacity = '0';
                        setTimeout(() => particle.remove(), 200);
                    }
                }, 100 + index * 20);
            });
        });
    });
}

// Photography Page Masonry Grid with Bottomless Scrolling
function initPhotographyMasonry() {
    const container = document.querySelector('.project-grid');
    if (!container) return;

    // Reveal animation for existing items only
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px'
    };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const existingItems = container.querySelectorAll('.masonry-item');
    existingItems.forEach(item => {
        revealObserver.observe(item);
    });
}

// Make header compact on scroll
function initializeHeaderScroll() {
    const header = document.querySelector('.detail-header');
    if (!header) return;
    
    const scrollThreshold = 100;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('compact');
        } else {
            header.classList.remove('compact');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check in case page is loaded scrolled down
    handleScroll();
}

// Store functionality
function initStoreFeatures() {
    if (!document.querySelector('.store-page')) return;
    
    initProductFilters();
    initCartFunctionality();
    initProductInteractions();
}

function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            productCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCartFunctionality() {
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    updateCartUI();
    
    cartToggle?.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart?.addEventListener('click', closeCartSidebar);
    cartOverlay?.addEventListener('click', closeCartSidebar);
    
    checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        showNotification('Redirecting to checkout...', 'success');
        
        setTimeout(() => {
            window.open('https://buy.stripe.com/test_28o5lq5IN0dO2Sk3cc', '_blank');
        }, 1000);
    });
    
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initProductInteractions() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.product;
            addToCart(productId);
        });
    });
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.product;
            showQuickView(productId);
        });
    });
    
    document.querySelectorAll('.size-selector, .material-selector').forEach(select => {
        select.addEventListener('change', updateProductPrice);
    });
}

function addToCart(productId) {
    const productCard = document.querySelector(`[data-product="${productId}"]`).closest('.product-card');
    const sizeSelector = productCard.querySelector('.size-selector');
    const materialSelector = productCard.querySelector('.material-selector');
    const productImage = productCard.querySelector('.product-image img');
    const productTitle = productCard.querySelector('.product-info h3');
    
    const selectedSize = sizeSelector.value;
    const selectedMaterial = materialSelector.value;
    const sizeOption = sizeSelector.options[sizeSelector.selectedIndex];
    const materialOption = materialSelector.options[materialSelector.selectedIndex];
    
    const basePrice = parseFloat(sizeOption.text.match(/\$(\d+)/)[1]);
    const materialPrice = materialOption.text.includes('+$') ? parseFloat(materialOption.text.match(/\+\$(\d+)/)[1]) : 0;
    const totalPrice = basePrice + materialPrice;
    
    const cartItem = {
        id: `${productId}-${selectedSize}-${selectedMaterial}`,
        productId: productId,
        title: productTitle.textContent,
        size: selectedSize,
        material: selectedMaterial,
        price: totalPrice,
        image: productImage.src,
        quantity: 1
    };
    
    const existingItem = cart.find(item => item.id === cartItem.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Added to cart!', 'success');
    
    animateAddToCart(productCard, cartItem);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Removed from cart', 'info');
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = totalPrice.toFixed(2);
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <div class="cart-item-details">${item.size} - ${item.material}</div>
                        <div class="cart-item-details">Qty: ${item.quantity}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

function updateProductPrice(e) {
    const productCard = e.target.closest('.product-card');
    const sizeSelector = productCard.querySelector('.size-selector');
    const materialSelector = productCard.querySelector('.material-selector');
    const priceDisplay = productCard.querySelector('.price-from');
    
    const sizeOption = sizeSelector.options[sizeSelector.selectedIndex];
    const materialOption = materialSelector.options[materialSelector.selectedIndex];
    
    const basePrice = parseFloat(sizeOption.text.match(/\$(\d+)/)[1]);
    const materialPrice = materialOption.text.includes('+$') ? parseFloat(materialOption.text.match(/\+\$(\d+)/)[1]) : 0;
    const totalPrice = basePrice + materialPrice;
    
    priceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

function showQuickView(productId) {
    const productCard = document.querySelector(`[data-product="${productId}"]`).closest('.product-card');
    const productImage = productCard.querySelector('.product-image img');
    const productTitle = productCard.querySelector('.product-info h3');
    const productCategory = productCard.querySelector('.product-category');
    
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-image">
                <img src="${productImage.src}" alt="${productTitle.textContent}">
            </div>
            <div class="modal-info">
                <h2>${productTitle.textContent}</h2>
                <p class="modal-category">${productCategory.textContent}</p>
                <div class="modal-description">
                    <p>High-quality print available in multiple sizes and materials. Each print is carefully produced using premium materials and archival inks for lasting beauty.</p>
                </div>
                <div class="modal-features">
                    <h4>Print Features:</h4>
                    <ul>
                        <li>Museum-quality archival inks</li>
                        <li>Premium paper and canvas options</li>
                        <li>Ready to hang (larger sizes)</li>
                        <li>Worldwide shipping available</li>
                    </ul>
                </div>
                <button class="modal-add-cart" onclick="addToCart('${productId}'); closeQuickView();">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
    
    modal.querySelector('.modal-close').addEventListener('click', closeQuickView);
    modal.querySelector('.modal-overlay').addEventListener('click', closeQuickView);
}

function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function animateAddToCart(productCard, item) {
    const productImage = productCard.querySelector('.product-image img');
    const cartToggle = document.getElementById('cartToggle');
    
    const flyingImg = productImage.cloneNode();
    flyingImg.className = 'flying-product';
    
    const startRect = productImage.getBoundingClientRect();
    const endRect = cartToggle.getBoundingClientRect();
    
    flyingImg.style.cssText = `
        position: fixed;
        top: ${startRect.top}px;
        left: ${startRect.left}px;
        width: ${startRect.width}px;
        height: ${startRect.height}px;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        border-radius: 8px;
    `;
    
    document.body.appendChild(flyingImg);
    
    setTimeout(() => {
        flyingImg.style.top = `${endRect.top + endRect.height/2}px`;
        flyingImg.style.left = `${endRect.left + endRect.width/2}px`;
        flyingImg.style.width = '20px';
        flyingImg.style.height = '20px';
        flyingImg.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        document.body.removeChild(flyingImg);
        cartToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartToggle.style.transform = 'scale(1)';
        }, 200);
    }, 850);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `success-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initPremiumVideoFeatures() {
    if (!document.querySelector('.premium-video-section')) return;
    
    initPremiumVideoAnimations();
    initFloatingParticles();
    initPremiumVideoControls();
    initVideoLazyLoading();
}

function initPremiumVideoAnimations() {
    const videoItems = document.querySelectorAll('.video-showcase-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px 0px'
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 200);
                videoObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    videoItems.forEach(item => {
        videoObserver.observe(item);
    });
}

function initFloatingParticles() {
    const premiumSections = document.querySelectorAll('.premium-video-section');
    
    premiumSections.forEach(section => {
        if (section.querySelector('.floating-particles')) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'floating-particles';
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            particleContainer.appendChild(particle);
        }
        
        section.appendChild(particleContainer);
    });
}

function initPremiumVideoControls() {
    const videoPlayers = document.querySelectorAll('.premium-video-player');
    
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        
        if (!video) return;
        
        video.addEventListener('loadedmetadata', () => {
            video.currentTime = 0;
        });
        
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play().catch(() => {
                // console.log('Auto-replay prevented');
            });
        });
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // console.log('Auto-play prevented');
                    });
                } else {
                    video.pause();
                }
            });
        }, observerOptions);
        
        videoObserver.observe(video);
    });
}

function initVideoLazyLoading() {
    const videos = document.querySelectorAll('.premium-video-player video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                
                if (video.dataset.src) {
                    if (source) {
                        source.src = video.dataset.src;
                    } else {
                        video.src = video.dataset.src;
                    }
                    video.load();
                    video.removeAttribute('data-src');
                }
                
                videoObserver.unobserve(video);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px 0px'
    });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

function createPremiumRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: premiumRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initPremiumButtonEffects() {
    return;
}

function initVideoProgressAnimation() {
    const videos = document.querySelectorAll('.premium-video-player video');
    
    videos.forEach(video => {
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            const wrapper = video.closest('.premium-video-wrapper');
            
            if (wrapper) {
                wrapper.style.setProperty('--progress', `${progress}%`);
            }
        });
    });
}

// Initialize Social Media Masonry Grid with Bottomless Scrolling
function initSocialMediaGrid() {
    const container = document.querySelector('.social-media-masonry');
    if (!container) return;
    // Reveal animation for existing items only
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, Math.random() * 300);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    const existingItems = container.querySelectorAll('.social-media-item');
    existingItems.forEach(item => {
        revealObserver.observe(item);
    });
}

// Initialize Collaborations Masonry Grid with Bottomless Scrolling
function initCollaborationsGrid() {
    const container = document.querySelector('.collaborations-masonry');
    if (!container) return;
    // Reveal animation for existing items only
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, Math.random() * 300);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    const existingItems = container.querySelectorAll('.collab-item');
    existingItems.forEach(item => {
        revealObserver.observe(item);
    });
} 