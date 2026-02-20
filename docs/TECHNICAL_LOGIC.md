# Avax-Mind-Bridge: Technical Architecture 🏗️

## 1. Intent Parsing Layer
Avax-Mind-Bridge uses a Large Language Model (LLM) to bridge the gap between human natural language and strict EVM bytecodes. 
- **Input:** "Initialize my character data on the tournament L1"
- **Process:** The AI analyzes the intent against the target L1's API capabilities.
- **Output:** A standardized JSON object containing the action `initialize_character` and the target `destinationChainID`.

## 2. Avalanche Teleporter Integration
The project utilizes **Avalanche Teleporter**, a production-ready implementation of the native **Interchain Messaging (ICM)** protocol.
- **Mechanism:** Our `AvanzaIntentReceiver` contract interfaces with the `TeleporterMessenger` contract located at `0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf` on Fuji.
- **Protocol:** Teleporter abstracts away the complexity of **BLS signature aggregation** and **Warp Messaging**. It ensures that messages are delivered asynchronously between Avalanche L1s without relying on third-party trust assumptions.

## 3. Transaction Flow
1. **Agent Execution:** The Node.js agent signs a transaction on the Fuji C-Chain calling `dispatchIntent`.
2. **Teleporter Send:** The contract invokes `sendCrossChainMessage` on the TeleporterMessenger.
3. **Relay:** Interchain relayers pick up the message and deliver it to the destination L1.
4. **Execution:** The message payload is executed on the destination chain with the user's specified gas limit.
