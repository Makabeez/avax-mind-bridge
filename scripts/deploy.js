const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const artifact = JSON.parse(fs.readFileSync("./out/AvanzaIntentReceiver.sol/AvanzaIntentReceiver.json", "utf8"));
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode.object, wallet);
    
    console.log("Deploying updated contract...");
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    console.log("New Contract Address:", await contract.getAddress());
}

main().catch(console.error);
