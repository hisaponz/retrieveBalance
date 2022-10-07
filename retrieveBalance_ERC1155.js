require("dotenv").config()
// console.log(process.env)
const api_key = process.env.INFURA_API_KEY;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${api_key}`));

const uriABI = [
    {
        "constant":true,
        "inputs":[
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs":[
            {
                "internalType":"string",
                "name":"",
                "type":"string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const tokenContract = "0x76be3b62873462d2142405439777e971754e8e77" // Parallel contract address
const tokenId = 10570 // A token we'd like to retrieve its metadata of

const contract = new web3.eth.Contract(uriABI, tokenContract)

async function getNFTMetadata() {
    const result = await contract.methods.uri(tokenId).call()

    console.log(result); // https://nftdata.parallelnft.com/api/parallel-alpha/ipfs/QmSwnqTmpwvZH51Uv47opPUxGYx2nknYmGoKoRJQRMDcLL
}

getNFTMetadata()
