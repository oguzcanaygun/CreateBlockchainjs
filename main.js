// npm install --save crypto-js

const SHA256 = require('crypto-js/sha256')

class Transaction{
    constructor(fromAdress, toAdress, amount){
        this.fromAdress = fromAdress;
        this.toAdress = toAdress;
        this.amount = amount;
    }
}

class Block {
    // index : where is block on chain
    // timestamp : when block is created
    // data : any data you want to assign to block how much money transfered who was sender and receiver etc
    // string that contains hash of block before current one 
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock(){
        return new Block("26/07/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAdress){
        let block = new Block(Data.now(), this.pendingTransactions());
        block.mineBlock(this.difficulty);

        console.log("Block Mined");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, this.miningReward, 100)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash)
            {
                return false;
            }
        }
        
        return true;

    }
}

let oguzCoin = new Blockchain();


