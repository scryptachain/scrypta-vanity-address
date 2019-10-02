var CoinKey = require('coinkey')
var argv = require('minimist')(process.argv.slice(2))
var Spinner = require('cli-spinner').Spinner;
var cluster = require('cluster')
var numCPUs = require('os').cpus().length
const coinInfo = {
    private: 0xae,
    public: 0x30,
    scripthash: 0x0d
};
var vanity = ''
if(argv.v === undefined){
    vanity = 'test'
}else{
    vanity = argv.v
}

var spinner = new Spinner('Searching for vanity address starting with "' + vanity + '" %s')
spinner.setSpinnerString('|/-\\')
spinner.start()

if (cluster.isMaster){
    for(var i = 0; i <= numCPUs; i++){
        var worker = cluster.fork()
        worker.on('message', function(msg) {
            console.log(msg);
        });
    }
}else if (cluster.isWorker) {
    var check = -1
    while(check !== 0){
        var ck = CoinKey.createRandom(coinInfo)
        var lyrapub = ck.publicAddress;
        check = lyrapub.toLowerCase().indexOf('l' + vanity.toLowerCase())
        var lyraprv = ck.privateWif;
        if(check === 0){
            process.send({address: lyrapub, privkey: lyraprv})
            check = -1
        }
    }
}