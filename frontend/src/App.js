
import './App.css';

import React,{useState} from 'react'
import Web3 from 'web3'
import {simpleStorageAbi} from './abi'

function App() {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  const contractAddress = '0xb117fEC5ab10Ca9af2b27fa4AF039420f083B43f'
  const simpleContract = new web3.eth.Contract(simpleStorageAbi,contractAddress)
  const [number,setNumber] = useState(0)
  const [getNumber,setGetNumber] = useState(0)

  const handleGet = async (e) =>{
    e.preventDefault()
    const result = await simpleContract.methods.get().call()
    setGetNumber(result)
    console.log('getResult ',result)

  }
  const handleSet = async (e) =>{
    e.preventDefault()
    const accounts = await window.ethereum.enable()
    const ownerAccount = accounts[0] 

    const gas = await simpleContract.methods.set(number).estimateGas()
  
    const result = await simpleContract.methods.set(number).send({
      from:ownerAccount,
      gas})
      console.log('setResult ',result)
  }


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type='number' name='name' value={number} onChange={e=>setNumber(e.target.value)} />
            <input type='submit' value='Set Number' />
            <br/>
            <button onClick={handleGet} type='button'>
              Get Number
              </button>
              {getNumber}
          </label>
        </form>
      </header>
    </div>
  );
}

export default App;
