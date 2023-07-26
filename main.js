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
        this.chain = this.createGenesisBlock();
    }
    createGenesisBlock(){
        return new Block(0, 26/07/2023, "Genesis Block", "0");
    }
}