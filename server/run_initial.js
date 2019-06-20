var GlobalFunction = require('./core/global_function');
var Job = require('./application/crawlersystem/models/Job');
async function run() {
    return Job.run_initial().then(r => {
        // console.log('vao day',r);
        setTimeout(function(){
            run();
        },10000);
    })
}

run();