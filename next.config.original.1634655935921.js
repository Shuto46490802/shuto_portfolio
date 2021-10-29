const withTM = require('next-transpile-modules')([
  'three',
  'gsap'
])

const withImages = require('next-images')

module.exports = withTM(withImages({
  images: {
    domains: ['images.ctfassets.net'],
  },
  reactStrictMode: true,
  webpack(config, options) {
    return config
  }
}))