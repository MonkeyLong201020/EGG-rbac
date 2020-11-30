const Application = app=>{
    app.once('server',server =>{
        console.log('server is running');
    })
    app.on('error',(err,ctx)=>{
        console.log(err);
    })

    app.on('request',ctx=>{
        // console.log('request---------');
    })
    app.on('response',ctx=>{
        // console.log('response---------');
        // const used = Date.now() - ctx.starttime;
        // console.log(`used time is ${used}`);
    })

}
module.exports = Application;