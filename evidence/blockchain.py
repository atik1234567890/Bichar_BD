import hashlib
import time
import json
import os

class BlockchainTimestamp:
    def __init__(self):
        # Always use mock mode for reliability
        self.mock_mode = True

    def generate_proof(self, data_hash):
        """
        Simulates submitting a hash to Ethereum and getting a transaction hash.
        """
        timestamp = int(time.time())
        proof_payload = {
            "hash": data_hash,
            "timestamp": timestamp,
            "network": "Ethereum Mainnet (Simulated)",
            "contract": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        }
        
        # Simulate a transaction hash
        tx_hash = "0x" + hashlib.sha256(f"{data_hash}{timestamp}".encode()).hexdigest()
        
        return {
            "tx_hash": tx_hash,
            "proof": proof_payload,
            "verified": True
        }

    def verify_proof(self, data_hash, tx_hash):
        # In a real app, this would check the blockchain for the tx_hash
        # and verify the data_hash is in the transaction data.
        return True
