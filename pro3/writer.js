let Tx = require("ethereumjs-tx");
let Web3 = require("web3");

let web3 = new Web3("https://ropsten.infura.io/v3/3d2d5dd165734f54b2ac133cbd202399");

let acc1 = "0xea6401b6b68c6CD2248e46D31F8462e71aF86fDF";
let priv1 = Buffer.from('B142A8E039DB2D48486DA55017F84A263D4C536014A0EE8357D917B9237F7023', 'hex');

let contractAddress = "0x07Db79697AAFd3DcBbac841643730321C2c86aFA";
let contractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getVlaue",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "num",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "n",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let myContract = new web3.eth.Contract(contractABI, contractAddress);
// console.log(myContract.methods.setValue(20).encodeABI())

web3.eth.getTransactionCount(acc1, (err, TxCount) => {
    console.log("TxCount: ", TxCount);

    //Build the transaction
    const txObj = {
        nonce: web3.utils.toHex(TxCount),
        gasLimit: web3.utils.toHex(100000),
		gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
		to: contractAddress,
        data: myContract.methods.setValue(25).encodeABI()
    };

    //sign the transaction
    let tx = new Tx(txObj);
    tx.sign(priv1);
    let raw = "0x" + tx.serialize().toString("hex");

    //broadcase the transaction
    web3.eth.sendSignedTransaction(raw, (err, res) => {
        console.log("err: ", err, "res: ", res);
    });
})