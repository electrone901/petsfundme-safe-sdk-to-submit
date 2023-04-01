import React, { useEffect, useState, useContext } from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import styles from '../styles/Donate.module.css'
import {
  TextField,
  Container,
  Typography,
  Button,
  IconButton,
  Card,
  Box,
  Grid,
} from '@mui/material'
import { MyAppContext } from '../pages/_app'
import { apiKeyport } from '../APIKEYPORT'
import { Framework } from '@superfluid-finance/sdk-core'
import { GelatoRelay, SponsoredCallRequest } from '@gelatonetwork/relay-sdk'
import ABI from '../abis/ABI_CONTRACT.json'
const relay = new GelatoRelay()

function Donate({}) {
  const {
    account,
    setAccount,
    contract,
    setContract,
    selectedProfile,
    setSelectedProfile,
    data,
    setData,
  } = useContext(MyAppContext)

  const MUMBAI_DEPLOYED_CONTRACT = '0x1aae17D2C4B5ea1b6cf4eeFC0D2f54bc5cD464cf'

  console.log('account, selectedProfile:', account, selectedProfile)
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [imageName, setImageName] = useState(null)
  const [description, setDescription] = useState(null)
  const [codeHash, setCodeHash] = useState(null)
  const [donationConfirmation, setDonationConfirmation] = useState(null)
  const [ammount, setAmmount] = useState(null)
  const [donationAmmount, setDonationAmmount] = useState(null)
  const [streamConfirmation, setStreamConfirmation] = useState(null)

  const donateNow = async (event) => {
    console.log('🚀 ~ donateNow', contract)
    event.preventDefault()

    if (contract) {
      // Populate a relay request
      const { data } = await contract.populateTransaction.donate(
        selectedProfile.fundraiserId,
        donationAmmount,
      )
      console.log('🚀 ~ file: donate.js:57 ~ donateNow ~ data:', data)

      const request = {
        chainId: '0x13881',
        target: MUMBAI_DEPLOYED_CONTRACT,
        data: data,
      }

      // Without a specific API key, the relay request will fail!
      // Go to https://relay.gelato.network to get a testnet API key with 1Balance.
      // Send the relay request using Gelato Relay!
      const apiKey = 'wiXVyZUv_ikd3hHZ75mEbOee27bAfTPBDxEueOo7YyQ_'
      const relayResponse = await relay.sponsoredCall(request, apiKey)
      console.log(
        '🚀 ~ file: donate.js:71 ~ donateNow ~ relayResponse:',
        relayResponse,
      )

      // const res = await contract.donate(
      //   selectedProfile.fundraiserId,
      //   donationAmmount,
      // )
      // const tx = await res.wait()

      // console.log('🚀 ~ file: DonateNFT.js ~ line 49 ~ donateNow ~ tx', tx)
      // setDonationConfirmation(tx)
      // setDonationAmmount('')
    } else {
      alert('Somenthing went wrong!')
    }
  }

  const streamPayment = async () => {
    console.log('streamPayment, donationAmmount', typeof donationAmmount)
    const sf = await Framework.create({
      chainId: 80001, // you can also use chainId here instead
      provider: provider,
    })
    const createFlowOperation = sf.cfaV1.createFlow({
      sender: account,
      receiver: selectedProfile
        ? selectedProfile.organizer
        : '0x7214859DD1750d31EDa889bA44d432f9805Ff3F7',
      superToken: '0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f',
      flowRate: donationAmmount, // pass it on, amountToSend /10**18
    })
    const txnResponse = await createFlowOperation.exec(signer)
    const txnReceipt = await txnResponse.wait()
    if (txnReceipt) {
      setStreamConfirmation(txnReceipt)
    }
  }

  const mintWithNFTPort = async (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
    let mintAddress = selectedProfile
      ? selectedProfile?.organizer
      : '0x9B6efdCFcdfb9825f805C2FE2f7f87eBBe76b253'
    const form = new FormData()
    form.append('file', event.target.files[0])
    const options = {
      method: 'POST',
      body: form,
      headers: {
        Authorization: apiKeyport,
      },
    }

    if (image == '' || description == '') {
      alert('Please enter NFT name and description')
      return
    }

    fetch(
      'https://api.nftport.xyz/v0/mints/easy/files?' +
        new URLSearchParams({
          chain: 'polygon',
          name: imageName,
          description: description,
          mint_to_address: mintAddress,
          ammount: ammount,
          msg:
            'This is a gift from PetsFoundMe Community, thank you for everything you do!',
        }),
      options,
    )
      .then(function (response) {
        return response.json()
      })
      .then(function (responseJson) {
        console.log(
          '🚀 ~ file: DonateNFT.js ~ line 84 ~ responseJson',
          responseJson,
        )
        // Handle the response
        if (responseJson) {
          setCodeHash(responseJson)
        } else {
          setError('Oops! Some error occurred. Try again! ')
        }
      })
  }

  return (
    <Container
      className={styles.rootCreatePet}
      style={{ minHeight: '70vh', paddingBottom: '3rem' }}
    >
      {account ? (
        <div>
          <br />
          <br />

          {streamConfirmation ? (
            <Card className={styles.codeHash}>
              <Typography gutterBottom className={styles.title}>
                Your Superfluid Stream was successfully created 🎉
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                See more details:
              </Typography>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://app.superfluid.finance/`}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className="transaction-btn"
                >
                  Go
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}

          {/* Confirmation for NFTS  */}
          {codeHash ? (
            <Card className={styles.codeHash}>
              <Typography gutterBottom className={styles.title}>
                Your NFT was minted succesfully 🎉
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                Confirmation Transaction:
              </Typography>
              <p> {codeHash.transaction_hash}</p>

              <br />
              <p>MintedAddress:</p>
              <p>{codeHash.mint_to_address}</p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={codeHash.transaction_external_url}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.transactionBtn}
                >
                  See transaction details
                </Button>
              </a>
            </Card>
          ) : (
            ''
          )}
          <br />
          <br />

          {false ? (
            <>
              <h2> 💫 Donate NFTs Now ✨</h2>
              <br />
              <br />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="pet"
                  className={styles.imgPreview}
                />
              ) : (
                ''
              )}
              <div className={styles.formContainer}>
                <form className={styles.form} noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="NFTs name"
                    variant="outlined"
                    className={styles.textField}
                    defaultValue={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    required
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Short message"
                    variant="outlined"
                    className={styles.textField}
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <input
                    accept="image/*"
                    className="input"
                    id="icon-button-photo"
                    defaultValue={image}
                    onChange={mintWithNFTPort}
                    type="file"
                  />

                  <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                      <PhotoCameraIcon />
                    </IconButton>
                  </label>

                  <Button size="large" variant="contained" color="primary">
                    Upload & Submit
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ width: '120%' }}>
              {selectedProfile && (
                <Card
                  style={{
                    padding: '1.5rem',
                  }}
                >
                  <h2>You are donating to {selectedProfile.title}</h2>
                  <br />
                  <img
                    src={selectedProfile.image}
                    alt="community"
                    className={styles.foundraiserImg}
                  />
                  <br />
                  <br />
                  <div className={styles.outer}>
                    <p>
                      <strong>
                        {`${selectedProfile.organizer.substring(32)}...`}{' '}
                      </strong>
                      is organizing this fundraiser
                    </p>
                  </div>

                  <br />
                  <hr style={{ border: '1px solid #c8c8c8' }} />
                  <br />
                  <p className={styles.description}>
                    {selectedProfile.description}
                  </p>

                  {/* FORM */}
                  <form className="form" noValidate autoComplete="off">
                    <br />
                    <br />
                    <br />
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Donation Ammount"
                      variant="outlined"
                      type="number"
                      className={styles.textField}
                      defaultValue={donationAmmount}
                      onChange={(e) => setDonationAmmount(e.target.value)}
                    />
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={donateNow}
                    >
                      donate Now
                    </Button>
                  </form>

                  <br />
                  <br />
                  {/* DONATION CONFIRMATION */}
                  {donationConfirmation ? (
                    <Card className={styles.codeHash}>
                      <Typography gutterBottom className={styles.title}>
                        Your Donation was succesfully sent 🎉
                      </Typography>

                      <Typography gutterBottom variant="subtitle1">
                        Confirmation blockHash:
                      </Typography>
                      <p> {donationConfirmation.blockHash}</p>
                      <br />
                    </Card>
                  ) : (
                    ''
                  )}
                </Card>
              )}
            </div>
          )}

          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <h2>Please Login</h2>
      )}
    </Container>
  )
}

export default Donate
