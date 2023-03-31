import React, { useState } from 'react'
import styles from '../styles/Donate.module.css'
import { SafeOnRampKit, SafeOnRampProviderType } from '@safe-global/onramp-kit'
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

function WalletFund() {
  const [address, setAddress] = useState('')

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const fundWallet = async () => {
    const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
      onRampProviderConfig: {
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          'pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO',
        // Deploy your own server: https://github.com/safe-global/account-abstraction-sdk/tree/main/packages/onramp-kit/example/server
        onRampBackendUrl: 'https://aa-stripe.safe.global',
      },
    })

    const sessionData = await safeOnRamp.open({
      walletAddress: address,
      networks: ['polygon', 'ethereum'],
      element: '#stripe-root',
      // Optional, if you want to use a specific created session
      // sessionId: 'cos_1Mei3cKSn9ArdBimJhkCt1XC',
      events: {
        onLoaded: () => console.log('Loaded'),
        onPaymentSuccessful: () => console.log('Payment successful'),
        onPaymentError: () => console.log('Payment failed'),
        onPaymentProcessing: () => console.log('Payment processing'),
      },
    })
    console.log({ sessionData })
  }

  return (
    <Container
      className={styles.rootCreatePet}
      style={{ minHeight: '70vh', paddingBottom: '3rem', textAlign: 'center' }}
    >
      <div id="stripe-root">
        <Card
          style={{
            padding: '3rem',
            width: '100%',
          }}
        >
          <h2>Continue to Fund your wallet</h2>
          <br />
          <br />
          <img src="/stipe.jpg" alt="community" style={{ width: '400px' }} />
          <br />
          <br />
          <br />

          <TextField
            fullWidth
            id="outlined-basic"
            label="Destination Address"
            variant="outlined"
            style={{ width: '90%' }}
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <br />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            color="primary"
            className="transaction-btn"
            onClick={fundWallet}
          >
            Fund Wallet
          </Button>
        </Card>
      </div>
    </Container>
  )
}

export default WalletFund
