const Blockchain = require('../src/blockchain')
const assert = require('assert')

const blockchain = new Blockchain()
async function testCreateBlock (){

    
    const prevBlock = blockchain.getPreviousBlock()
    assert.equal(prevBlock.index, 1, 'first block index is expected to be 1')
    let proof = await blockchain.proofOfWork(prevBlock.proof)
    assert.ok(proof, 'proof always should be a valid value')
    let previousBlockHash = blockchain.hash(prevBlock)
    assert.ok(previousBlockHash, 'previous block hash should be a string value.')
    assert.equal(previousBlockHash.length, 64, 'block hash length should be 64 character')
    let newBlock = blockchain.createBlock(proof, previousBlockHash)
    assert.equal(newBlock.index, 2, 'new block index should be 2')
    assert.equal(blockchain.chain.length, 2, 'now blockchain length should be 2')

    console.log('blockchain: ', blockchain.chain)
}


testCreateBlock()
async function testIsChainValid(){
    let isValid = await blockchain.isChainValid(blockchain.chain)
    assert.ok(isValid, 'chain is not valid!')
} 

testIsChainValid()