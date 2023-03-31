import '@/styles/globals.css'
import React, { useState } from 'react'
import Head from 'next/head'
import { Navbar } from '../components/layout/navbar/Navbar'
import Footer from '../components/layout/footer/Footer'
import { SafeAuthKit, SafeAuthProviderType } from '@safe-global/auth-kit'
import ABI from '../abis/ABI_CONTRACT.json'
import { ethers } from 'ethers'

export const MyAppContext = React.createContext({
  selectedProfile: undefined,
  setSelectedProfile: undefined,
  account: undefined,
  setAccount: undefined,
  contract: undefined,
  setContract: undefined,
  data: undefined,
  setData: undefined,
})

export default function App({ Component, pageProps, router }) {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState('')
  const [selectedNft, setSelectedNft] = useState('')
  const [selectedProfile, setSelectedProfile] = useState('')
  const [data, setData] = useState([])

  console.log('🚀 ~ :', contract)

  const getSafeAuthKitProvider = async (safeAuthKit) => {
    // Using ethers
    const provider = new ethers.providers.Web3Provider(
      safeAuthKit.getProvider(),
    )
    const MUMBAI_DEPLOYED_CONTRACT =
      '0x1aae17D2C4B5ea1b6cf4eeFC0D2f54bc5cD464cf'
    let signer = provider.getSigner()
    let contract = new ethers.Contract(MUMBAI_DEPLOYED_CONTRACT, ABI, signer)
    setContract(contract)
    if (contract) {
      getFundraisers(contract)
    }
  }

  const loginWithSafeAuthKit = async () => {
    const safeAuthKit = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
      chainId: '0x13881',
      authProviderConfig: {
        rpcTarget: 'https://rpc-mumbai.maticvigil.com/', // Add your RPC e.g. https://goerli.infura.io/v3/<your project id>
        clientId:
          'BInHmi5mb7OS5-JcYHCZ33D4VDEgvIjPMzCJ1LcOs5HOFya0wh4KSSjWQutFTY2ouWIasQb0cdysslZ8x8OKkqk', // Add your client id. Get it from the Web3Auth dashboard
        network: 'testnet', // The network to use for the Web3Auth modal. Use 'testnet' while developing and 'mainnet' for production use
        theme: 'light' | 'dark', // The theme to use for the Web3Auth modal
        modalConfig: {
          // The modal config is optional and it's used to customize the Web3Auth modal
          // Check the Web3Auth documentation for more info: https://web3auth.io/docs/sdk/web/modal/whitelabel#initmodal
        },
      },
    })
    const user = await safeAuthKit.signIn()
    const address = user?.eoa
    setAccount(address)
    getSafeAuthKitProvider(safeAuthKit)
  }

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  const getFundraisers = async (contract) => {
    const temp = []
    const res = await contract.getAllFundraisers()
    console.log('🚀 ~ file: index.js:78 ~ getFundraisers ~ res:', res)
    console.log(' res:', res)
    for (let i = 0; i < res.length; i++) {
      let obj = {}
      // data from smart contract
      const organizer = res[i][4]
      const totalDonations = res[i]['totalDonations'].toString()
      const fundraiserId = res[i].id.toString()

      // fetchs data from nftStorage
      const nftStorageURL = res[i][1]
      let getNFTStorageData = await fetch(nftStorageURL)
      let fundraiserData = await getNFTStorageData.json()

      //  fundraiser data
      const img = getImage(fundraiserData.image)
      // gets data from nftStorage
      const data = JSON.parse(fundraiserData.description)
      // builds fundraiser data
      obj.fundraiserId = fundraiserId
      obj.organizer = organizer
      obj.totalDonations = totalDonations
      obj.title = fundraiserData.name
      obj.image = img
      obj.description = data.description
      obj.category = data.category
      obj.targetAmmount = data.targetAmmount
      obj.creationDate = data.creationDate
      temp.push(obj)
    }

    setData(temp)
  }

  return (
    <MyAppContext.Provider
      value={{
        account,
        setAccount,
        contract,
        setContract,
        selectedProfile,
        setSelectedProfile,
        data,
        setData,
      }}
    >
      <Head>
        <title>PetFoundMe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar account={account} loginWithSafeAuthKit={loginWithSafeAuthKit} />
      <Component {...pageProps} />
      <Footer />
    </MyAppContext.Provider>
  )
}
