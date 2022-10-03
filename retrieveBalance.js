require("dotenv").config()
console.log(process.env)

const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/e54c04e84419466ebfba83bfe03cf6db'));

const balanceOfABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];

const tokenContract = "0x35A9b440Da4410dD63dF8c54672b728970560328"
const tokenHolder = "0x77bef0231300F8FbC69c41E63E705eCba66C367b"

const contract = new web3.eth.Contract(balanceOfABI, tokenContract);

async function getTokenBalance() {
    const result = await contract.methods.balanceOf(tokenHolder).call();
    console.log(result);
    const formattedResult = web3.utils.fromWei(result, "ether");
    console.log(formattedResult);
}

getTokenBalance(); 

