var contract = undefined;
var customProvider = undefined;
                                                                                                                              var address = "0x3d4D00cc34Fb4EF84089e0dB78593d3A1dD90E1d";
var abi = undefined;

function notary_init () {
  // Check if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use existing gateway
    window.web3 = new Web3(web3.currentProvider);
  } else {
    alert("No Ethereum interface injected into browser. Read-only access");
  }

  abi = [ { "constant": false, "inputs": [ { "name": "hash", "type": "bytes32" } ], "name": "addDocHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "hash", "type": "bytes32" } ], "name": "findDocHash", "outputs": [ { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "", "type": "bytes32" }, { "indexed": false, "name": "", "type": "uint256" }, { "indexed": false, "name": "", "type": "uint256" } ], "name": "Log", "type": "event" } ],
  
  contract = new web3.eth.Contract(abi, address);

//sends a hash to the blockchain
function notary_send(hash, callback) {
    web3.eth.getAccounts(function (error, accounts) {
      contract.methods.addDocHash(hash).send({
        from: accounts[0]
      },function(error, tx) {
        if (error) callback(error, null);
        else callback(null, tx);
      });
    });
};

//looks up a hash on the blockchain
function notary_find (hash, callback) {
  contract.methods.findDocHash(hash).call( function (error, result) {
    if (error) callback(error, null);
    else {
      let resultObj = {
        mineTime:  new Date(result[0] * 1000),
        blockNumber: result[1]
      }
      callback(null, resultObj);
    }
  });
};
