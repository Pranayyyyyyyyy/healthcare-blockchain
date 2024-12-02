// Utility function to hash data using Web Crypto API
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
        this.nonce = 0;
        this.initializeHash();
    }

    async initializeHash() {
        this.hash = await this.calculateHash();
    }

    async calculateHash() {
        const data = this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
        return await sha256(data);
    }

    async mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = await this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.records = new Map(); // Map to store records by Aadhar number
    }

    createGenesisBlock() {
        return new Block(Date.now(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    async addBlock(data) {
        const { aadharNumber } = data;
        if (!this.records.has(aadharNumber)) {
            this.records.set(aadharNumber, []);
        }
        
        const block = new Block(Date.now(), data, this.getLatestBlock().hash);
        await block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.records.get(aadharNumber).push(block);
        return block;
    }

    getRecordsByAadhar(aadharNumber) {
        return this.records.get(aadharNumber) || [];
    }

    async isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            if (currentBlock.hash !== await currentBlock.calculateHash()) {
                return false;
            }
        }
        return true;
    }
}

// Create a singleton instance
const healthchainInstance = new Blockchain();
export default healthchainInstance;
