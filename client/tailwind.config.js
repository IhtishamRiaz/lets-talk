/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import tailwindForms from "@tailwindcss/forms";

export default {
   mode: "jit",
   darkMode: "class",
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: colors.indigo,
         },
      },
      keyframes: {
         shimmer: {
            "100%": {
               transform: "translateX(100%)",
            },
         },
      },
   },
   plugins: [
      tailwindForms({
         strategy: "class",
      }),
   ],
};
