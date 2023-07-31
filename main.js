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
    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
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

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
    
        console.log("Block Mined");
        this.chain.push(block);
    
        this.pendingTransactions = [
          new Transaction(null, miningRewardAddress, this.miningReward),
        ];
      }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
    
        for (const block of this.chain) {
          for (const trans of block.transactions) {
            if (trans.fromAdress === address) { 
              balance -= trans.amount;
            }
    
            if (trans.toAdress === address) { 
              balance += trans.amount;
            }
          }
        }
    
        return balance;
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

oguzCoin.createTransaction(new Transaction("adress1", "adress2", 100));
oguzCoin.createTransaction(new Transaction("adress2", "adress1", 50));

console.log("\n Starting the miner");
oguzCoin.minePendingTransactions("oguzcan-adress");

console.log("\n Balance of oguzcan is " + oguzCoin.getBalanceOfAddress("oguzcan-adress"));

console.log("\n Starting the miner 2");
oguzCoin.minePendingTransactions("oguzcan-adress");
console.log("\n Balance of oguzcan is " + oguzCoin.getBalanceOfAddress("oguzcan-adress"));
