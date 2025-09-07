<!-- /src/components/ImageCarousel.svelte -->
<script>
    import { onMount } from 'svelte';

    // Props for carousel configuration
    export let slides = []; // Array of slide objects with src, alt, heading, description
    export let half = false; // Whether the layout is half-width
    export let reverse = false; // Whether to reverse the half layout
    export let autoPlayDuration = 5000; // Auto-play duration in milliseconds
    export let enableAutoPlay = false; // Whether to enable auto-play

    // Current active slide index
    let currentSlide = 0;
    
    // Auto-play interval reference
    let autoPlayInterval;

    /**
     * Navigate to the next slide
     * Wraps around to first slide when reaching the end
     */
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
    }

    /**
     * Navigate to the previous slide
     * Wraps around to last slide when at the beginning
     */
    function prevSlide() {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    }

    /**
     * Navigate directly to a specific slide
     * @param {number} index - The slide index to navigate to
     */
    function goToSlide(index) {
        currentSlide = index;
    }

    /**
     * Start the automatic slideshow
     */
    function startAutoPlay() {
        if (enableAutoPlay && slides.length > 1) {
            autoPlayInterval = setInterval(nextSlide, autoPlayDuration);
        }
    }

    /**
     * Stop the automatic slideshow
     */
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - The keyboard event
     */
    function handleKeydown(event) {
        if (slides.length <= 1) return;
        
        switch (event.key) {
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case ' ': // Spacebar
                event.preventDefault();
                nextSlide();
                break;
        }
    }

    // Reactive statement to determine if layout is half-width
    $: isHalfLayout = half === true;
    // Reactive statement to determine if content is on the left side
    $: isContentLeft = reverse === true;

    // Start auto-play when component mounts
    onMount(() => {
        startAutoPlay();
        
        // Cleanup interval when component is destroyed
        return () => {
            stopAutoPlay();
        };
    });

    // Restart auto-play when slides change
    $: if (slides.length > 0) {
        stopAutoPlay();
        startAutoPlay();
    }
</script>

<!-- Keyboard event listener for navigation -->
<svelte:window on:keydown={handleKeydown} />

<!-- Main carousel container -->
<div 
    class="carousel-container"
    class:half-layout={isHalfLayout}
    class:content-left={isContentLeft}
    on:mouseenter={stopAutoPlay}
    on:mouseleave={startAutoPlay}
    role="region"
    aria-label="Image carousel"
>
    <!-- Content section for half layouts -->
    {#if isHalfLayout && slides[currentSlide]}
        <div class="content-section">
            <div class="content-wrapper">
                {#if slides[currentSlide].heading}
                    <h2 class="content-heading">{slides[currentSlide].heading}</h2>
                {/if}
                {#if slides[currentSlide].description}
                    <p class="content-description">{slides[currentSlide].description}</p>
                {/if}
            </div>
        </div>
    {/if}

    <!-- Image section -->
    <div class="image-section">
        <!-- Image slides container -->
        <div class="carousel-slides">
            {#each slides as slide, index}
                <div 
                    class="slide"
                    class:active={index === currentSlide}
                    aria-hidden={index !== currentSlide}
                >
                    <img 
                        src={slide.src} 
                        alt={slide.alt}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                </div>
            {/each}
        </div>

        <!-- Navigation controls (only show if more than one slide) -->
        {#if slides.length > 1}
            <!-- Navigation arrows -->
            <button 
                class="nav-button prev"
                on:click={prevSlide}
                aria-label="Previous image"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <button 
                class="nav-button next"
                on:click={nextSlide}
                aria-label="Next image"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>

            <!-- Dot indicators -->
            <div class="indicators">
                {#each slides as _, index}
                    <button
                        class="indicator"
                        class:active={index === currentSlide}
                        on:click={() => goToSlide(index)}
                        aria-label="Go to slide {index + 1}"
                        type="button"
                    ></button>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    /* Main carousel container - full width and responsive */
    .carousel-container {
        position: relative;
        width: 100%;
        max-width: 100vw;
        height: 60vh;
        min-height: 400px;
        overflow: hidden;
        border-radius: 0px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
    }

    /* Half layout styling */
    .carousel-container.half-layout {
        flex-direction: row;
    }

    /* Content left layout */
    .carousel-container.half-layout.content-left {
        flex-direction: row;
    }

    /* Content right layout (default for half-right) */
    .carousel-container.half-layout:not(.content-left) {
        flex-direction: row-reverse;
    }

    /* Content section for half layouts */
    .content-section {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    /* Content wrapper for centering */
    .content-wrapper {
        text-align: center;
        max-width: 500px;
    }

    /* Content heading styling */
    .content-heading {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0 0 1rem 0;
        line-height: 1.2;
    }

    /* Content description styling */
    .content-description {
        font-size: 1.2rem;
        line-height: 1.6;
        margin: 0;
        opacity: 0.9;
    }

    /* Image section */
    .image-section {
        position: relative;
        flex: 1;
        width: 100%;
        height: 100%;
    }

    /* Full layout image section takes full width */
    .carousel-container:not(.half-layout) .image-section {
        flex: none;
        width: 100%;
    }

    /* Container for all slides */
    .carousel-slides {
        position: relative;
        width: 100%;
        height: 100%;
    }

    /* Individual slide styling */
    .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    /* Active slide is visible */
    .slide.active {
        opacity: 1;
    }

    /* Image styling - responsive and covers container */
    .slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    /* Navigation button base styles */
    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
    }

    /* Navigation button hover effects */
    .nav-button:hover {
        background: rgba(0, 0, 0, 0.7);
        transform: translateY(-50%) scale(1.1);
    }

    /* Previous button positioning */
    .nav-button.prev {
        left: 20px;
    }

    /* Next button positioning */
    .nav-button.next {
        right: 20px;
    }

    /* Dot indicators container */
    .indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 10;
    }

    /* Individual dot indicator */
    .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    /* Active dot indicator */
    .indicator.active {
        background: white;
        transform: scale(1.2);
    }

    /* Hover effect for dot indicators */
    .indicator:hover {
        background: rgba(255, 255, 255, 0.7);
    }

    /* Responsive design for tablets */
    @media (max-width: 1024px) {
        .content-heading {
            font-size: 2rem;
        }

        .content-description {
            font-size: 1.1rem;
        }

        .content-section {
            padding: 1.5rem;
        }
    }

    /* Responsive design for smaller screens */
    @media (max-width: 768px) {
        .carousel-container {
            height: 50vh;
            min-height: 300px;
            border-radius: 4px;
        }

        /* Stack content vertically on mobile for half layouts */
        .carousel-container.half-layout {
            flex-direction: column;
            height: 80vh;
            min-height: 500px;
        }

        .carousel-container.half-layout.content-left {
            flex-direction: column;
        }

        .carousel-container.half-layout:not(.content-left) {
            flex-direction: column-reverse;
        }

        .content-section {
            padding: 1rem;
        }

        .content-heading {
            font-size: 1.8rem;
        }

        .content-description {
            font-size: 1rem;
        }

        .nav-button {
            width: 40px;
            height: 40px;
        }

        .nav-button.prev {
            left: 10px;
        }

        .nav-button.next {
            right: 10px;
        }

        .indicators {
            bottom: 15px;
        }

        .indicator {
            width: 10px;
            height: 10px;
        }
    }

    /* Extra small screens */
    @media (max-width: 480px) {
        .carousel-container {
            height: 40vh;
            min-height: 250px;
        }

        .carousel-container.half-layout {
            height: 70vh;
            min-height: 400px;
        }

        .content-section {
            padding: 0.75rem;
        }

        .content-heading {
            font-size: 1.5rem;
        }

        .content-description {
            font-size: 0.9rem;
        }

        .nav-button {
            width: 35px;
            height: 35px;
        }

        .indicators {
            gap: 8px;
        }

        .indicator {
            width: 8px;
            height: 8px;
        }
    }

    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        .slide {
            transition: none;
        }
        
        .nav-button,
        .indicator {
            transition: none;
        }
    }
</style>