/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'sans':'Montserrat, Arial, Helvetica, sans-serif'
    },
    container:{
      padding:'8rem',
    },
    extend: {
      colors:{
        'accent-blue':'#366EFF',
      },
      boxShadow:{
        'btn-shadow':'0px 1px 0px 0px rgba(255, 255, 255, 0.30) inset, 0px 4px 18px 0px rgba(54, 110, 255, 0.35)',
        'header-shadow':'0px 2px 10px 0px rgba(109.44, 109.44, 109.44, 0.3)',
      },
      dropShadow:{
        'form-shadow':[
          '-1px -1px 2px rgba(0, 0, 0, 0.10)',
          '1px 1px 2px rgba(0, 0, 0, 0.10)'
        ],
      }
    },
  },
  plugins: [],
}
