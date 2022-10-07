require("dotenv").config()
// console.log(process.env)
const api_key = process.env.INFURA_API_KEY;
const ipfs_subdomain = process.env.IPFS_SUBDOMAIN;

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${api_key}`));

const tokenURIABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const tokenContract = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC contract address
const tokenId = 101 // A token we'd like to retrieve its metadata of

const contract = new web3.eth.Contract(tokenURIABI, tokenContract)

async function getNFTMetadata() {
    const result = await contract.methods.tokenURI(tokenId).call()

    console.log(result); // ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/101

    const ipfsURL = addIPFSProxy(result);

    const request = new Request(ipfsURL);
    const response = await fetch(request);
    const metadata = await response.json();
    console.log(metadata); // Metadata in JSON

    const image = addIPFSProxy(metadata.image);
}

getNFTMetadata()

function addIPFSProxy(ipfsHash) {
    const URL = `https://${ipfs_subdomain}.infura-ipfs.io/ipfs/`
    const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
    const ipfsURL = URL + hash

    console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
    return ipfsURL
}

