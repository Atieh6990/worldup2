module.exports = {
    // 'https://tvapps.ir/worldcup/test_1/'
    //'https://samyar.rasgames.ir/worldcup/android/'
    publicPath: process.env.NODE_ENV === 'production'

        ? 'https://tvapps.ir/worldcup/mahsa/js/'

        : './',
    pwa: {
        name: 'Geary Factory Lofts', // <---- this is PWA name
    },  productionSourceMap: false,
    css: {
        extract: false,
    },
    configureWebpack: {
        output:{
          filename:'js/build.js'
        },
        optimization: {
            splitChunks: false
        }
    }

}
