export default {
	server: {
		port: process.env.PORT || 3000,
		host: process.env.HOST || '0.0.0.0',
	},

  head: {
    title: 'idaproject-test',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  css: [
    'normalize.css/normalize.css',
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
		'@nuxtjs/proxy',
  ],

	axios: {
		proxy: true,
	},

	proxy: {
		'/api': {
			target: 'https://frontend-test.idaproject.com/api',
			pathRewrite: {
				'^/api' : '/',
			},
		},
    '/upload': {
			target: 'https://frontend-test.idaproject.com/upload',
			pathRewrite: {
				'^/upload' : '/',
			},
    },
	},
}
