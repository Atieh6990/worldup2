module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    productionSourceMap: false,
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
