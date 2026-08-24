import { addIconSelectors } from '@iconify/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
   
    
    extend: {
      colors:{
        'primary' : '#006769',
        'second' : '#40A578',
        'third' : '#9DDE8B',
        'fourth': '#E6FF94',
        'fifth' : '#C9E9D2',

  },
  
  fontFamily:{
    'page' : 'Fredoka',
    'btn' : 'Readex Pro',
    'heading' : 'Bangers',
    'extra' : 'Concert One'
    
},
screens: {
  'mob': '414px',
  // => @media (min-width: 414px) { ... }

  'tab': '768px',
  // => @media (min-width: 768px) { ... }

  'lap': '1024px',
  // => @media (min-width: 1024px) { ... }

  'des': '1280px',
  // => @media (min-width: 1280px) { ... }

  'desxl': '1536px',
  // => @media (min-width: 1536px) { ... }
},


    },
  },


  plugins: [
    require('daisyui'),
  
  ],
  daisyui: {
    themes: ["light", "dark", "synthwave","night"],
  },
}