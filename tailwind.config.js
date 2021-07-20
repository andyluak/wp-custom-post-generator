module.exports = {
  mode: 'jit',
	purge: {
    enabled: true,
		content: [
      "./assets/js/src/wp-cpg/components/*.js",
      "./assets/js/src/wp-cpg/*.js"
  ]
	},
	darkMode: false, //you can set it to media(uses prefers-color-scheme) or class(better for toggling modes via a button)
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}