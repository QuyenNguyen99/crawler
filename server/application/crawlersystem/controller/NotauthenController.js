var GlobalController = require('../../../core/global_controller');
const GlobalFunction = require('../../../core/global_function');
var Promise = require('promise');
NotauthenController = GlobalFunction.cloneFunc(GlobalController);

NotauthenController.prototype.init = async function () {
    GlobalController.prototype.init.apply(this, arguments);
}

NotauthenController.prototype.get_actionRestartschedulejob = async function() {
    GlobalFunction.exec('pm2 restart crawlerschedule');
    return Promise.resolve({
        code: 200,
    });
}

exports = module.exports = NotauthenController;