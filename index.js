var CoinKey = require('coinkey')
var argv = require('minimist')(process.argv.slice(2))

if(argv.v !== undefined){
    const coinInfo = {
        private: 0xae,
        public: 0x30,
        scripthash: 0x0d
    };
    var check = -1
    while(check !== 0){
        var ck = CoinKey.createRandom(coinInfo)
        var lyrapub = ck.publicAddress;
        check = lyrapub.toLowerCase().indexOf('l' + argv.v.toLowerCase())
        var lyraprv = ck.privateWif;
        if(check === 0){
            console.log('\x1b[32m%s\x1b[0m', lyrapub + ' VALID!!!');
            console.log('PRIVATE KEY IS: ' + lyraprv)
        }else{
            console.log('\x1b[31m%s\x1b[0m', lyrapub + ' NOT VALID :-(');
        }
    }
}else{
    console.log('PLEASE DEFINE -v ARGUMENT, EX. node index.js -v scrypta')
}