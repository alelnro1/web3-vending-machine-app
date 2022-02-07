/*import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/3ef06acd132b4e07ab9935cb755e1b3d"
)

const web3 = new Web3(provider)*/

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donutBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVendingMachineBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchase","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"restock","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const vendingMachineContract = web3 => {
    return new web3.eth.Contract(
        abi, 
        "0x18420e5cF8c0eb833612C4f2eAdF11b3E8129431"
    )
}

export default vendingMachineContract;

//const vmContract = new web3.eth.Contract(abi, "0xF935a500A06bBe4fd3C9b1A5c08add9a1fe80340")

//export default vmContract