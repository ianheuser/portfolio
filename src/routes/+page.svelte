<!-- src/routes/+page.svelte -->
<script>
    import ImageCarousel from '../components/ImageCarousel.svelte';

    // Sample data for full-width carousel
    const fullCarouselSlides = [
        {
            src: 'https://placehold.co/1200x600/4A90E2/FFFFFF/png?text=Full+Width+Slide+1',
            alt: 'Full width portfolio image 1'
        },
        {
            src: 'https://placehold.co/1200x600/7ED321/FFFFFF/png?text=Full+Width+Slide+2',
            alt: 'Full width portfolio image 2'
        },
        {
            src: 'https://placehold.co/1200x600/F5A623/FFFFFF/png?text=Full+Width+Slide+3',
            alt: 'Full width portfolio image 3'
        }
    ];

    // Sample data for half-width carousel with content on the right
    const halfLeftCarouselSlides = [
        {
            src: 'https://placehold.co/800x600/9013FE/FFFFFF/png?text=Project+Alpha',
            alt: 'Project Alpha showcase',
            heading: 'Project Alpha',
            description: 'A revolutionary web application built with modern technologies. This project showcases advanced user interface design and seamless user experience.'
        },
        {
            src: 'https://placehold.co/800x600/D0021B/FFFFFF/png?text=Project+Beta',
            alt: 'Project Beta showcase',
            heading: 'Project Beta',
            description: 'An innovative mobile-first solution that transforms how users interact with digital content. Built with performance and accessibility in mind.'
        }
    ];

    // Sample data for half-width carousel with content on the left
    const halfRightCarouselSlides = [
        {
            src: 'https://placehold.co/800x600/50E3C2/FFFFFF/png?text=Service+One',
            alt: 'Service One illustration',
            heading: 'Premium Service',
            description: 'Our flagship service offering combines cutting-edge technology with personalized support to deliver exceptional results for our clients.'
        },
        {
            src: 'https://placehold.co/800x600/BD10E0/FFFFFF/png?text=Service+Two',
            alt: 'Service Two illustration',
            heading: 'Consulting Excellence',
            description: 'Expert consultation services that help businesses navigate complex challenges and achieve their strategic objectives through proven methodologies.'
        },
        {
            src: 'https://placehold.co/800x600/4A90E2/FFFFFF/png?text=Service+Three',
            alt: 'Service Three illustration',
            heading: 'Innovation Hub',
            description: 'A collaborative space where ideas come to life through rapid prototyping, user testing, and iterative development processes.'
        }
    ];
</script>

<svelte:head>
    <title>Portfolio - Home</title>
    <meta name="description" content="Portfolio website showcasing projects and services" />
</svelte:head>

<section class="hero-section">
    <!-- Full-width carousel -->
    <div class="carousel-wrapper">
        <h1 class="section-title">Featured Work</h1>
        <ImageCarousel 
            slides={fullCarouselSlides} 
            half={false}
            autoPlayDuration={4000}
        />
    </div>
</section>

<section class="projects-section">
    <!-- Half-width carousel with image on left, content on right -->
    <div class="carousel-wrapper">
        <h2 class="section-title">Our Projects</h2>
        <ImageCarousel 
            slides={halfLeftCarouselSlides} 
            half={true}
            autoPlayDuration={6000}
        />
    </div>
</section>

<section class="services-section">
    <!-- Half-width carousel with content on left, image on right -->
    <div class="carousel-wrapper">
        <h2 class="section-title">Our Services</h2>
        <ImageCarousel 
            slides={halfRightCarouselSlides} 
            half={true}
            autoPlayDuration={5000}
            reverse={true}
        />
    </div>
</section>

<style>
    /* Main section styling */
    section {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    /* Hero section with full-width carousel */
    .hero-section {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 2rem 0;
    }

    /* Projects and services sections */
    .projects-section,
    .services-section {
        padding: 3rem 0;
    }

    /* Alternate background colors for visual separation */
    .projects-section {
        background: #f8f9fa;
    }

    .services-section {
        background: white;
    }

    /* Carousel wrapper for consistent spacing */
    .carousel-wrapper {
        width: 100%;
        margin: 0 auto;
    }

    /* Section titles */
    .section-title {
        text-align: center;
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0 0 2rem 0;
        color: #333;
    }

    /* Responsive typography */
    @media (max-width: 768px) {
        .hero-section,
        .projects-section,
        .services-section {
            padding: 2rem 0;
        }

        .section-title {
            font-size: 2rem;
            margin: 0 0 1.5rem 0;
        }

        .carousel-wrapper {
            padding: 0 0.5rem;
        }
    }

    @media (max-width: 480px) {
        .hero-section,
        .projects-section,
        .services-section {
            padding: 1.5rem 0;
        }

        .section-title {
            font-size: 1.75rem;
            margin: 0 0 1rem 0;
        }
    }
</style>