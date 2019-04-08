let Web3 = require("web3");
let web3 = new Web3("https://ropsten.infura.io/v3/3d2d5dd165734f54b2ac133cbd202399");

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
myContract.methods.getVlaue().call().then(val => {
    console.log(val.toString(16))
})