import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import 'bulma/css/bulma.css'
import styles from '../styles/VendingMachine.module.css'
import vendingMachineContract from '../blockchain/vending'

const VendingMachine = () => {
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [inventory, setInventory] = useState('')
    const [myDonutCount, setMyDonatCount] = useState('')
    const [buyCount, setBuyCount] = useState('')
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)
    const [purchases, setPurchases] = useState(0)

    useEffect(() => { // load this as soon as the page loads
        if (vmContract) getInventoryHandler()
        if (vmContract && address) getMyDonutCountHandler()
    }, [vmContract, address])

    const getInventoryHandler = async () => {
        const inventory = await vmContract.methods.getVendingMachineBalance().call()
        setInventory(inventory)
    }

    const getMyDonutCountHandler = async () => {
        const count = await vmContract.methods.donutBalances(address).call()
        setMyDonatCount(count)
    }

    const updateDonutQty = event => {
        setBuyCount(event.target.value)
    }

    const buyDonutHandler = async () => {
        try {
            await vmContract.methods.purchase(buyCount).send({
                from: address,
                value: web3.utils.toWei('0.1', 'ether') * buyCount
            })
            setSuccessMsg(`${buyCount} donuts purchased!`)

            if (vmContract) getInventoryHandler()
            if (vmContract && address) getMyDonutCountHandler()
        } catch(err) {
            setError(err.message)
        }
    }
     
    const connectWalletHandler = async () => {
        /* check if metamask is available */
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                /* request wallet connect */
                await window.ethereum.request({ method: "eth_requestAccounts" })
                /* set web3 instance */
                web3 = new Web3(window.ethereum)
                setWeb3(web3)
                /* get list of accounts */
                const account = await web3.eth.getAccounts()
                setAddress(account[0])

                /* create local contract copy */
                const vm = vendingMachineContract(web3)
                setVmContract(vm)
                console.log(vm)
            } catch (err) {
                setError(err.messsage)
            }
        } else {
            // metamask not installed
            console.log("Please install MetaMask")
        }
    }

    return (
        <div className={styles.main}>
            <Head>
                <title>Vending Machine App</title>
                <meta name="description" content="A blockchain vending maching app" />
            </Head>        
            <nav className="navbar mt-4 mb-4">
                <div className='container'>
                    <div className='navbar-brand'>
                        <h1>Vending Machine</h1>
                    </div>
                    <div className='navbar-end'>
                        <button className='button is-primary'
                            onClick={connectWalletHandler}>
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </nav>
            <section>
                <div className='container'>
                    <p><h2>Vending machine inventory: {inventory}</h2></p>
                </div>
            </section>
            <section>
                <div className='container'>
                    <p><h2>My donuts: {myDonutCount}</h2></p>
                </div>
            </section>
            <section className='mt-5'>
                <div className='container'>
                    <div className='field'>
                        <label className='label'>Buy donuts</label>
                    </div>
                    <div className='control'>
                        <input className='input' type='text' 
                            onChange={updateDonutQty}
                            placeholder='Enter amount...' />
                    </div>
                    <button className='button is-primary mt-2'
                        onClick={buyDonutHandler}>
                        Buy
                    </button>
                </div>
            </section>
            <section>
                <div className='container has-text-danger'>
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className='container has-text-success'>
                    <p>{successMsg}</p>
                </div>
            </section>
        </div>
    )
}

export default VendingMachine;