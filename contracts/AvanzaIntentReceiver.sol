// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface ITeleporterMessenger {
    function sendCrossChainMessage(TeleporterMessageInput calldata input) external returns (bytes32);
}

struct TeleporterFeeInfo {
    address feeTokenAddress;
    uint256 amount;
}

struct TeleporterMessageInput {
    bytes32 destinationChainID;
    address destinationAddress;
    TeleporterFeeInfo feeInfo;
    uint256 requiredGasLimit;
    address[] allowedRelayerAddresses;
    bytes message;
}

contract AvanzaIntentReceiver {
    // UPDATED CANONICAL FUJI ADDRESS FOR 2026
    address public constant TELEPORTER_ADDR = 0x253b2784c75e510dD0fF1da844684a1aC0aa5fcf;
    ITeleporterMessenger public immutable messenger;

    event IntentDispatched(bytes32 indexed destinationChainID, address indexed target, string intent);

    constructor() {
        messenger = ITeleporterMessenger(TELEPORTER_ADDR);
    }

    function dispatchIntent(
        bytes32 destinationChainID,
        address targetRecipient,
        bytes calldata messageContents
    ) external {
        messenger.sendCrossChainMessage(
            TeleporterMessageInput({
                destinationChainID: destinationChainID,
                destinationAddress: targetRecipient,
                feeInfo: TeleporterFeeInfo({feeTokenAddress: address(0), amount: 0}),
                requiredGasLimit: 250000, // Slightly increased for safety
                allowedRelayerAddresses: new address[](0),
                message: messageContents
            })
        );
        
        emit IntentDispatched(destinationChainID, targetRecipient, "AI_INTENT_SENT");
    }
}
