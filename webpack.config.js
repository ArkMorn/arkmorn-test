const path =require('path')

module.exports={
    entry:"./bin/core",
    output:{
        path:path.join(__dirname,'/dist'),
        filename:"core.js"
    },
    mode:"development"
}