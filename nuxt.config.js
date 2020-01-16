require('dotenv').config();

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'keywords', content: 'science, tsl, tracking, box' },
      { hid: 'description', name: 'description', content: 'Box tracking system for 2Blades.' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'theme-color', content: '#ffffff' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
      lang: 'en'
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /**
    * Manifest Configuration
    */
  manifest: {
    name: 'Pandora',
    lang: 'en'
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [{ src: '~/plugins/buefy', ssr: false }],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
  ],
  /**
     * Nuxt router link
     */
  router: {
    routeNameSplitter: '-',
    linkExactActiveClass: '-active nuxt-link-exact-active'
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: false,
          // logout: {url: '/logout', method: 'post'},
          user: { url: '/me', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    },
    redirect: {
      login: '/signin',
    }
  },
  /*
  ** Build configuration
  */
  build: {
    // transpile: [
    //   '@inkline/inkline',
    // ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
