module.exports = {
    presets: [
        [   
            '@babel/preset-env', 
            {
                targets: {
                    ie: '11'
                }
            }
        ], 
        '@babel/preset-react'
    ],
    plugins: [
        'dynamic-import-webpack',
        '@babel/plugin-proposal-class-properties'
    ]
};