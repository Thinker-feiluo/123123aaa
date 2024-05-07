export default defineNuxtConfig({
  // 开关调试工具
  devtools: { enabled: false },
  //开关ssr模板
  ssr: true,
  modules: ['@element-plus/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/@xterm/addon-unicode11@0.8.0/lib/addon-unicode11.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/lib/xterm.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/@xterm/addon-fit@0.10.0/lib/addon-fit.min.js' },
        { type: "module", src: 'https://cdn.jsdelivr.net/npm/@xterm/addon-attach@0.11.0/+esm' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@xterm/xterm@5.5.0/css/xterm.min.css' },
      ]
    }
  },
  nitro: {
    devProxy: {
      "/api": {
        target: 'http://localhost:3001/',
        prependPath: true,
        changeOrigin: true,
      }
    }
  },
})
