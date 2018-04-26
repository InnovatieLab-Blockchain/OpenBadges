import React from "react";
import {Button, Form, Label, Input, FormText, Table, container} from 'reactstrap';


export class UploadBadge extends React.Component {

  // constructor(props) {
  //
  //   super(props)
  //
  //   this.state = {
  //   file: '',
  //
  //   }
  //   var contract = undefined;
  //   var customProvider = undefined;
  //   var address = "0x3d4D00cc34Fb4EF84089e0dB78593d3A1dD90E1d";
  //   var abi = undefined;
  //
  //   function notary_init () {
  //     // Check if Web3 has been injected by the browser (Mist/MetaMask)
  //     if (typeof web3 !== 'undefined') {
  //       // Use existing gateway
  //       window.web3 = new Web3(web3.currentProvider);
  //     } else {
  //       alert("No Ethereum interface injected into browser. Read-only access");
  //     }
  //
  //     abi = [
  //       {
  //         "inputs": [],
  //         "payable": false,
  //         "stateMutability": "nonpayable",
  //         "type": "constructor"
  //       },
  //       {
  //         "constant": false,
  //         "inputs": [
  //           {
  //             "name": "hash",
  //             "type": "bytes32"
  //           }
  //         ],
  //         "name": "addDocHash",
  //         "outputs": [],
  //         "payable": false,
  //         "stateMutability": "nonpayable",
  //         "type": "function"
  //       },
  //       {
  //         "constant": true,
  //         "inputs": [
  //           {
  //             "name": "hash",
  //             "type": "bytes32"
  //           }
  //         ],
  //         "name": "findDocHash",
  //         "outputs": [
  //           {
  //             "name": "",
  //             "type": "uint256"
  //           },
  //           {
  //             "name": "",
  //             "type": "uint256"
  //           }
  //         ],
  //         "payable": false,
  //         "stateMutability": "view",
  //         "type": "function"
  //       }
  //     ],
  //
  //     contract = new web3.eth.Contract(abi, address);
  //
  //   };
  //
  //   //sends a hash to the blockchain
  //   function notary_send(hash, callback) {
  //       web3.eth.getAccounts(function (error, accounts) {
  //         contract.methods.addDocHash(hash).send({
  //           from: accounts[0]
  //         },function(error, tx) {
  //           if (error) callback(error, null);
  //           else callback(null, tx);
  //         });
  //       });
  //   };
  //
  //   //looks up a hash on the blockchain
  //   function notary_find (hash, callback) {
  //     contract.methods.findDocHash(hash).call( function (error, result) {
  //       if (error) callback(error, null);
  //       else {
  //         let resultObj = {
  //           mineTime:  new Date(result[0] * 1000),
  //           blockNumber: result[1]
  //         }
  //         callback(null, resultObj);
  //       }
  //     });
  //   };
  //
  //   $(document).ready(function() {
  //     notary_init();
  //   });
  //
  //
  //   hashForFile(callback) {
  //   input = this.state.file;
  //   if (!input.files[0]) {
  //     alert("Please select a file first");
  //   }
  //   else {
  //     file = input.files[0];
  //     fr = new FileReader();
  //     fr.onload = function (e) {
  //       content = e.target.result;
  //       var shaObj = new jsSHA("SHA-256", "ARRAYBUFFER");
  //       shaObj.update(content);
  //       var hash = "0x" + shaObj.getHash("HEX");
  //       callback(null, hash);
  //     };
  //     fr.readAsArrayBuffer(file);
  //   }
  // }
  //
  // send() {
  //   hashForFile(function (err, hash) {
  //     notary_send(hash, function(err, tx) {
  //       $("#responseText").html("<p>File successfully fingreprinted onto Ethereum blockchain.</p>"
  //         + "<p>File Hash Value: " + hash +"</p>"
  //         + "<p>Transaction ID: " + tx +"</p>"
  //         + "<p>Available at contract address: " + address +"</p>"
  //         + "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
  //       );
  //     });
  //   });
  // };
  //
  // find() {
  //   hashForFile(function (err, hash) {
  //     notary_find(hash, function(err, resultObj) {
  //       if (resultObj.blockNumber != 0) {
  //         $("#responseText").html("<p>File fingerprint found on Ethereum blockchain.</p>"
  //           + "<p>File Hash Value: " + hash + "</p>"
  //           + "<p>Block No.: " + resultObj.blockNumber + "</p>"
  //           + "<p>Timestamp: " + resultObj.mineTime + "</p>"
  //         );
  //       } else {
  //         $("#responseText").html("<p>File fingerprint not found on Ethereum blockchain.</p>"
  //           + "<p>File Hash Value: " + hash + "</p>"
  //         );
  //       }
  //     });
  //   });
  // };


  render(props) {

    return (       <div>
          <Form onSubmit={this.onSubmit}>
            <input type="file" id="hashFile" onChange={this.captureFile}/>
          <Label for="badgeDescription"></Label>
            <Button color="primary" type="submit" onClick="send()" >
              Upload
            </Button>
            <br/>
          </Form>
        </div>
      );
      }
     }
