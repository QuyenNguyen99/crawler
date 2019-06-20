var Job = require('./application/crawlersystem/models/Job');
var ApiServer = require('./application/crawlersystem/models/ApiServer');
var GlobalFunction = require('./core/global_function');
async function run() {
    var list_run_job = await Job.get_list_multi_job();
    for(var i = 1; i <= list_run_job;i++) {
        run_detail(i);
    }
}

async function run_detail(offset) {
    return Job.run_crawler_job(offset).then(r => {
        setTimeout(function(){
            run_detail(offset);
        },r);
    })
}

ApiServer.init_server();
run();