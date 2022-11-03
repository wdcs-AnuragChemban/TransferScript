const { ethers, BigNumber } = require("ethers");

let rpcURLs = [
  "https://yolo-powerful-seed.bsc-testnet.discover.quiknode.pro/e67417cdf286a0a5426f6c99ec31f33eec4ae99d/",
  "https://alfajores-forno.celo-testnet.org",
  "https://api.avax-test.network/ext/bc/C/rpc",
  "https://rpc.testnet.moonbeam.network",
  "https://rpc.testnet.fantom.network/",
  "https://rpc-testnet.dogechain.dog/",
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://eth-goerli.g.alchemy.com/v2/barNHxwKcvdxJuDoKlbor5qx6mhT2C_O",
];


let walletPrivateKeys = [

]

let receiverAddress = "0x9920408D5Ae06362288F83E7D48201776b896624";
// let receiverAddress = "0x85Cb63e3D8cEf31a421e59b6678bF0444Fa5d8BE"
const temp = async () => {
  for (let i = 0; i < rpcURLs.length; i++) {
    const provider = new ethers.providers.JsonRpcBatchProvider(
      rpcURLs[i]
    );
    for (let j = 0; j < walletPrivateKeys.length; j++) {
      let wallet = new ethers.Wallet(walletPrivateKeys[j], provider);
      let userBalance = await provider.getBalance(wallet.address);
  
        const gasPrice = await provider.getGasPrice();
        let amountToSend = (userBalance - gasPrice * 210000).toString();
        console.log(amountToSend, userBalance);
        let tx = {
          to: receiverAddress,
          value: BigNumber.from(amountToSend),
          gasLimit: 21000,
        };
        let res = await wallet.sendTransaction(tx);
        console.log(res.hash);
      
    }
  }
};
temp();



