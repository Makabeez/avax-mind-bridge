# Avax-Mind-Bridge 🏔️🤖

An AI-Agentic Intent Layer that allows users to interact with the Avalanche Interchain ecosystem using natural language. This project leverages **Avalanche Teleporter** and **GPT-4o** to translate human intent into cross-chain execution.

## 🚀 Overview
Avax-Mind-Bridge removes the complexity of interacting with multiple Avalanche L1s (Subnets). Instead of manually crafting hex data and tracking Chain IDs, users simply state their goal. 

**Example:** *"Initialize my character data on the tournament L1"* -> The AI parses the action and dispatches a secure cross-chain message via Teleporter.

## 🛠️ Architecture


1. **User Interface:** Terminal-based Natural Language input.
2. **Intelligence:** OpenAI GPT-4o parses intent into standardized blockchain actions.
3. **Execution:** `AvanzaIntentReceiver` (Solidity) contract deployed on Fuji.
4. **Transport:** **Avalanche Teleporter** handles the cross-chain delivery of the instruction to the destination L1.

## 📦 Tech Stack
- **Foundry:** Smart contract development and deployment.
- **Ethers.js (v6):** Blockchain interaction.
- **OpenAI API:** Intent parsing and JSON structuring.
- **Avalanche Teleporter:** Native cross-chain messaging protocol.

## 📜 Deployed Contract (Fuji Testnet)
- **Address:** `0xEe72c751ae40f59B35A92A4561A954161D34e35B`
- **Network:** Avalanche Fuji (C-Chain)

## 🚦 Getting Started
1. Clone the repo.
2. Setup `.env` with `PRIVATE_KEY`, `OPENAI_API_KEY`, and `FUJI_RPC_URL`.
3. Run the agent:
   ```bash
   node scripts/agent.js "Your intent here"
