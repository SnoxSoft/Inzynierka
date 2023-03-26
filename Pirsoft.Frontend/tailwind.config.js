/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'brown-menu': '#625050',
                'green-menu': '#606250',
                'blue-menu' : '#445165',

                'absent' : '#951b1b',
                'weekend' : '#9b9b9b',
                'sick' : '#41abd9',
                'dayoff' : '#4c8e41',
                'workday' : '#ffffff',
                'dayoffmonth' : '#5f5f5f',

                'rating' : '#F9F01E',

                },
            },
    },
    plugins: [],
}