const truffleContract = require('truffle-contract')
const storageContract = require('../build/contracts/SimpleStorage.json')

const web3Provider = 'http://127.0.0.1:7545'

const storage = truffleContract(storageContract)
storage.setProvider(web3Provider)

contract('SimpleStorage',(accounts)=>{
    let storageInstance
    const owner = accounts[0]
    const user = accounts[1]

    before(async()=>{
        storageInstance = await storage.deployed()
    })

    it('should set&get a value',async()=>{
        const testValue = 7
        await storageInstance.set(testValue,{from:owner})

        const storedValue = await storageInstance.get()
        assert.equal(testValue,storedValue,'set&get values are not equal')
        
    })

})