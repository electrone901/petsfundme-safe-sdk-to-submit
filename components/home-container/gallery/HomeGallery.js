import React, { useEffect, useState } from 'react'
import ProfileList from './profile-list/ProfileList'
import logo from '../../../images/logo.png'
import myAudio from './click.mp3'
import { Grid, Container, Card, Button } from '@mui/material'
import { WorldIDWidget } from '@worldcoin/id'
import './HomeGallery.css'
import BarcodeScannerComponent from 'react-qr-barcode-scanner'
// this is the tutorial https://codesandbox.io/s/tgo42?file=/src/App.js
import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'

function HomeGallery({
  setSelectedProfile,
  contract,
  connectWallet,
  currentAccount,
}) {
  console.log('HomeGallery n contract', contract)
  const [displayBar, setDisplayBar] = React.useState('')
  const [sdata, setSdata] = React.useState('Not Found')
  console.log('🚀 ~ file: HomeGallery.js:19 ~ sdata:', sdata)
  const [stopStream, setStopStream] = React.useState(false)
  const [data, setData] = useState([])
  // let audio = new Audio('../../../images/click.mp3')

  console.log('🚀 ~ file: HomeGallery.js:17 ~ data', data)

  useEffect(() => {
    if (contract) {
      getFundraisers()
    }
  }, [contract])

  const getImage = (ipfsURL) => {
    if (!ipfsURL) return
    ipfsURL = ipfsURL.split('://')
    return 'https://ipfs.io/ipfs/' + ipfsURL[1]
  }

  const getFundraisers = async () => {
    const temp = []
    const res = await contract.getAllFundraisers()
    console.log('🚀 ~ file: HomeGallery.js:34 ~ getFundraisers ~ res', res)

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

  const mockdata = [
    {
      id: '01',
      name: 'Product 01',
    },
    {
      id: '02',
      name: 'Product 02',
    },
    {
      id: '03',
      name: 'Product 03',
    },
    {
      id: '04',
      name: 'Product 04',
    },
    {
      id: '05',
      name: 'Product 05',
    },
  ]
  const playSound = (text) => {
    console.log('MYSCAN text:', text)
    setDisplayBar(text)
    var audio = new Audio(myAudio)
    audio.play()
    //  For demo purposes, any scanning will display the same item
    //  so please take a beuty product from home & scann it to
    // make it feel real
    const product1 = mockdata[0]
    setSdata(product1)
  }

  return (
    <div
      id=""
      style={{
        minHeight: '70vh',
        paddingBottom: '4rem',
        paddingTop: '.5rem',
      }}
    >
      <Container>
        {/* <BarcodeScannerComponent
          width={500}
          height={500}
          stopStream={stopStream}
          onUpdate={(err, result) => {
            if (result) {
              playSound(result.text)
              // setSdata(result.text)
              setStopStream(true)
            } else {
              setSdata('Not Found')
            }
          }}
        />
        <p> {displayBar && `Scanned: ${displayBar}`} </p>
        <p>  {sdata.id}</p>
        <p>{sdata.name}</p> */}

        <Container>
          <div className="root">
            <Grid
              container
              spacing={3}
              style={{
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              <Grid item xs={5} className="outer">
                <img src={logo} className="logo-hero" alt="logo-hero" />
              </Grid>
              <Grid item xs={7}>
                <p className="home-text-intro">
                  <strong>PetsFoundMe</strong> is a social app built by the
                  community for everyone who loves and supports pets.
                  PetsFoundMe is an NFT platform where pet owners and pet lovers
                  come together and help each other to solve their pet's needs
                  from expensive surgeries to food supplies or free services.
                </p>{' '}
                <br />
                <p className="home2-text-intro">
                  PetsFoundMe is the perfect pet hub for nonprofits, medical &
                  government institutions, influencers, and artists to come
                  together to solve the needs of the Community Pets. Come to ask
                  for financial support, as questions, answer questions, and
                  give or receive donations. Come join us to make this planet a
                  better world.
                </p>
              </Grid>
            </Grid>
          </div>
        </Container>

        {/* search */}
        <form className="search-form">
          <div className="pseudo-search">
            <input
              type="text"
              placeholder="Search for people, etc"
              autoFocus
              required
            />
            <span className="search-clear">Clear</span>
            <span className="search-icon">🔍</span>
          </div>
        </form>

        <br />
        <Card
          style={{
            borderRadius: '24px',
            paddingTop: '1rem',
            paddingBottom: '1rem',
            backgroundColor: '#fff9f7',
            minHeight: '20rem',
          }}
        >
          {data.length ? (
            <ProfileList setSelectedProfile={setSelectedProfile} data={data} />
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '3rem' }}>
              <Button style={{ backgroundColor: '#FF835B', color: 'white' }}>
                Please connect your wallet to Mumbai Network
              </Button>
            </div>
          )}
        </Card>
      </Container>
    </div>
  )
}

export default HomeGallery
