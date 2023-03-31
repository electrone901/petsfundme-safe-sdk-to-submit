import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ABI_GELATO from '../abis/ABI_CONTRACT.json'

const inter = Inter({ subsets: ['latin'] })
import { SafeAuthKit, SafeAuthProviderType } from '@safe-global/auth-kit'
import { ethers } from 'ethers'

export default function Home() {
  const GELATO_CONTRACT = '0x1aae17D2C4B5ea1b6cf4eeFC0D2f54bc5cD464cf'
  const [currentAccount, setCurrentAccount] = useState('')
  const [contractGelato, setContractGelato] = useState(null)
  const [data, setData] = useState([])

  const donateNow = async (event) => {
    event.preventDefault()

    const selectedProfile = {}
    const donationAmmount = 3
    selectedProfile.fundraiserId = 0

    const res = await contractGelato.donate(
      selectedProfile.fundraiserId,
      donationAmmount,
    )

    const tx = await res.wait()

    console.log('🚀 ~ file: DonateNFT.js ~ line 49 ~ donateNow ~ tx', tx)

    // setDonationConfirmation(tx)
    // setDonationAmmount('')
  }

  const getSafeAuthKitProvider = async (safeAuthKit) => {
    // Using ethers
    const provider = new ethers.providers.Web3Provider(
      safeAuthKit.getProvider(),
    )
    let signer = provider.getSigner()

    let contract = new ethers.Contract(GELATO_CONTRACT, ABI_GELATO, signer)
    setContractGelato(contract)
    getFundraisers(contract)

    // const message = 'hello world'
    // await signer.sendTransaction(tx)
    // console.log('sendTransaction:', signer)
    // await signer.signTransaction(tx)
    // console.log('signTransaction:', signer)
    // await signer.signMessage(message)
    // console.log('signMessage:', signer)
  }

  const loginSafeAuthKit = async () => {
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
    console.log(
      '🚀 ~ file: index.js:26 ~ loginSafeAuthKit ~ safeAuthKit:',
      safeAuthKit,
    )

    const a = await safeAuthKit.signIn()
    console.log('🚀 ~ file: index.js:29 ~ loginSafeAuthKit ~ a:', a)

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
    <>

      <main className={styles.main}>
        <button onClick={loginSafeAuthKit}>Login with SAFE</button>
        <button onClick={donateNow}>donate Now</button>

        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
