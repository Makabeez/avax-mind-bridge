const { ethers } = require("ethers");
const OpenAI = require("openai");
require("dotenv").config();

// YOUR CONTRACT ADDRESS
const RAW_ADDRESS = "0xEe72c751ae40f59B35A92A4561A954161D34e35B"; 
const CONTRACT_ADDRESS = ethers.getAddress(RAW_ADDRESS.toLowerCase());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const abi = ["function dispatchIntent(bytes32 destinationChainID, address targetRecipient, bytes calldata messageContents) external"];
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function runAIAgent(userPrompt) {
    console.log(`\n🤖 User Input: "${userPrompt}"`);
    console.log("🧠 Analyzing intent with AI...");

    try {
        // 1. AI Logic - Fixed Prompt for JSON Mode
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 
                    role: "system", 
                    content: "You are an Avalanche assistant. You MUST return a JSON object. \
                              The JSON must contain an 'action' key with a single action word. \
                              Example: { 'action': 'initialize_character' }" 
                },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        });

        const DEST_CHAIN_ID = "0x3243a1648c92f9339796053337a67f08e01362e67a732152a42c5545f4989670";
        const aiData = JSON.parse(completion.choices[0].message.content);
        const action = aiData.action || "default_action";
        
        console.log(`✅ AI Parsed Action: ${action}`);
        console.log("⛓️ Dispatching to Avalanche Teleporter...");

        // 2. Execution
        const tx = await contract.dispatchIntent(
            ethers.zeroPadValue(DEST_CHAIN_ID, 32),
            wallet.address, 
            ethers.hexlify(ethers.toUtf8Bytes(action)),
            { gasLimit: 500000 }
        );

        console.log(`🚀 Sent! Hash: ${tx.hash}`);
        console.log("Waiting for confirmation on Fuji...");
        await tx.wait();
        console.log("🏁 SUCCESS: Intent bridged through Teleporter.");
        
    } catch (e) {
        console.error("❌ Error:");
        console.error(e.message);
    }
}

const userPrompt = process.argv[2] || "Ping the gaming subnet";
runAIAgent(userPrompt);
