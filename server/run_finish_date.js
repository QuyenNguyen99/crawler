var Job = require('./application/crawlersystem/models/Job');

async function run() {
    return Job.run_finish_date().then(r => {
    })
}

run();