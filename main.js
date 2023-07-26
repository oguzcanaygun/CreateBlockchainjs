// npm install --save crypto-js

const SHA256 = require('crypto-js/sha256')

class Block {
    // index : where is block on chain
    // timestamp : when block is created
    // data : any data you want to assign to block how much money transfered who was sender and receiver etc
    // string that contains hash of block before current one 
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "26/07/2023", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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
oguzCoin.addBlock(new Block(1, "27/07/2023", { info: "test1"}));
oguzCoin.addBlock(new Block(2, "30/07/2023", { info: "test2"}));

// oguzCoin : object to be transformed into JSONstring
// null : optional
// 4 : number of spaces between console.log
console.log("Is Blockchain Valid ? : " + oguzCoin.isChainValid());
console.log(JSON.stringify(oguzCoin, null, 4));