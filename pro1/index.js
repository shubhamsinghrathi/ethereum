(async () => {
    if(typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider)
    } else {
        web3 = new Web3("https://mainnet.infura.io/v3/c75aeb844e37465090ed17e1d65cecb7");
    }
    
    let bln1 = await web3.eth.getBalance("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
    bln1 = web3.utils.fromWei(bln1, "ether");
    console.log("bln1 (in ether): ", bln1);

    console.log("tokens: ", OMGToken.address);

    let cnt1 = new web3.eth.Contract(OMGToken.abi, OMGToken.address);
    // console.log("methods: ", cnt1.methods);
    let name1 = await cnt1.methods.name().call();
    console.log("name1: ", name1);

    let mintingFinished1 = await cnt1.methods.mintingFinished().call();
    console.log("mintingFinished1: ", mintingFinished1);

    let totalSupply1 = await cnt1.methods.totalSupply().call();
    console.log("totalSupply1: ", totalSupply1);

    let balanceOf1 = await cnt1.methods.balanceOf("0x3Caec6F54993526C9e2744A4Fa54A19B90A3BD87").call();
    console.log("balanceOf1: ", balanceOf1);
})()