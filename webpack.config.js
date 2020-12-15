const { VueLoaderPlugin } = require('vue-loader');
module.exports= {
   
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [    
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: 'babel-loader'
                
                             
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};


/*
 test: /\.js$/,
        include: [/node_modules\/MY_MODULE/]

include you src directory and the other directory. Don't use exclude.

  include: [
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "node_modules/ui")
  ]


 {
  test: /\.js$/,
  exclude: /node_modules\/(?!(MY-MODULE|ANOTHER-ONE)\/).*/
// }

//*/