let Tx = require("ethereumjs-tx");
let Web3 = require("web3");

let web3 = new Web3("https://ropsten.infura.io/v3/3d2d5dd165734f54b2ac133cbd202399");

let acc1 = "0xea6401b6b68c6CD2248e46D31F8462e71aF86fDF";
let priv1 = Buffer.from('B142A8E039DB2D48486DA55017F84A263D4C536014A0EE8357D917B9237F7023', 'hex');

let contactByteCode = "0x608060405234801561001057600080fd5b5061011e806100206000396000f3fe608060405260043610604d576000357c0100000000000000000000000000000000000000000000000000000000900480633c89f41e1460525780634e70b1dc14607a578063552410771460a2575b600080fd5b348015605d57600080fd5b50606460d9565b6040518082815260200191505060405180910390f35b348015608557600080fd5b50608c60e2565b6040518082815260200191505060405180910390f35b34801560ad57600080fd5b5060d76004803603602081101560c257600080fd5b810190808035906020019092919050505060e8565b005b60008054905090565b60005481565b806000819055505056fea165627a7a723058208fe7d9f9e26436cd66675dd696e28d89ddba41a8fb761197609cf3875948bc470029";

web3.eth.getBalance(acc1, (er, res) => {
    console.log( web3.utils.fromWei(res, "ether") );
});

web3.eth.getTransactionCount(acc1, (err, TxCount) => {
    console.log("TxCount: ", TxCount);

    //Build the transaction
    const txObj = {
        nonce: web3.utils.toHex(TxCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
        data: contactByteCode
    };

    //sign the transaction
    let tx = new Tx(txObj);
    tx.sign(priv1);
    let raw = "0x" + tx.serialize().toString("hex");

    //broadcase the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log("err: ", err, "txHash: ", txHash);
        //txHash:   0xc1ccbbbf2b8ac0fe5c3de96a0ae0bd295da79dad27a4a43f4188be0020ca44de
        //contractAdd: 0x07Db79697AAFd3DcBbac841643730321C2c86aFA
    });
})