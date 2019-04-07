let Tx = require("ethereumjs-tx");
let Web3 = require("web3");

const web3 = new Web3("https://ropsten.infura.io/v3/3d2d5dd165734f54b2ac133cbd202399");

let acc1 = "0xea6401b6b68c6CD2248e46D31F8462e71aF86fDF";
let priv1 = Buffer.from('B142A8E039DB2D48486DA55017F84A263D4C536014A0EE8357D917B9237F7023', 'hex');

let acc2 = "0x5F64C74069e3f9081Df1dA3996eCE1cbA569D909";

web3.eth.getTransactionCount(acc1, (er, txCount) => {
    console.log("err: ", er)
    console.log("txCount: ", txCount)
    //Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        to: acc2,
        value: web3.utils.toHex(web3.utils.toWei("0.02", "ether")),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
    }

    //sign the transaction
    const tx = new Tx(txObject);
    tx.sign(priv1);
    const serializedTransaction = tx.serialize();
    const raw = "0x" + serializedTransaction.toString('hex');

    //broadcase the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log("txErr: ", err);
        console.log("txHash: ", txHash);
    })
});