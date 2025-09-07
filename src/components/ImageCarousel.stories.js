import ImageCarousel from './ImageCarousel.svelte';

// Default export with component metadata
export default {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  argTypes: {
    half: {
      control: 'boolean',
      defaultValue: false,
      description: 'Should the carousel be half-width? '
    },
    reverse: {
      control: 'boolean',
      defaultValue: false,
      description: 'Assuming half layout, should the content and image sections swap sides?'
    },
    slides: {
      control: 'array',
      defaultValue: [],
      description: 'Array of slide objects for the carousel. Contains src, alt, heading, and description for each slide.'
    },
    autoPlayDuration: {
      control: 'number',
      defaultValue: 5000,
      description: 'If autoplay is enabled, what duration should each slide be displayed in milliseconds.'
    },
    enableAutoPlay: {
      control: 'boolean',
      defaultValue: false,
      description: 'Enable automatic slide transitions.'
    }
  }
};

// Template for creating stories
const Template = (args) => ({
  Component: ImageCarousel,
  props: args
});


// Sample slide data for stories
const sampleSlides = [
  {
    src: 'https://placehold.co/1200x600/4A90E2/FFFFFF/png?text=Portfolio+Image+1',
    alt: 'Portfolio Image 1',
    heading: 'Project One',
    description: 'An innovative solution that revolutionized the way businesses handle data processing and analytics.'
  },
  {
    src: 'https://placehold.co/1200x600/7ED321/FFFFFF/png?text=Portfolio+Image+2',
    alt: 'Portfolio Image 2',
    heading: 'Creative Design',
    description: 'A visually stunning website redesign that increased user engagement by 150%.'
  },
  {
    src: 'https://placehold.co/1200x600/F5A623/FFFFFF/png?text=Portfolio+Image+3',
    alt: 'Portfolio Image 3',
    heading: 'Mobile Application',
    description: 'A cross-platform mobile app that simplifies daily tasks for thousands of users.'
  }
];

// Default story showing full layout
export const FullLayout = Template.bind({});
FullLayout.args = {
  slides: sampleSlides,
  half: false,
  reverse: false
};

// Story showing half layout with content on right
export const HalfLayout = Template.bind({});
HalfLayout.args = {
  slides: sampleSlides,
  half: true,
  reverse: false
};

// Story showing half layout with content on left
export const HalfLayoutReversed = Template.bind({});
HalfLayoutReversed.args = {
  slides: sampleSlides,
  half: true,
  reverse: true
};