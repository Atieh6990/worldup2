module.exports = {
    // options...
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://samyar.rasgames.ir/worldcup/'
        : '/',
    pwa: {
        name: 'Geary Factory Lofts', // <---- this is PWA name
    },  productionSourceMap: false,


}
