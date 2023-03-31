import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  Chip,
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import styles from '../../styles/Profile.module.css'
import { MyAppContext } from '../_app'
// import TableUpdates from './TableUpdates'

const dataUpdates = [
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
  {
    created: 'August 23, 2022',
    author: 'Annie Loizzi',
    update:
      'Cooper is making some positive progress this week. Following is an update from the Roberts family:  This week, we are happy to report that Cooper IV and PICC lines have been removed. He no longer requires IV pain medicine and antibiotics.',
  },
]

function Profile({ setDonateNfts, setDonateStream }) {
  const router = useRouter()
  const { userAddress } = router.query
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
  console.log('🚀 ~ file: [id].js:60 ~ selectedProfile:', selectedProfile)

  const donate = async (e) => {
    // setDonateStream(false)
    Router.push('/donate')
  }
  const donateStream = async (e) => {
    setDonateStream(true)
    Router.push(`/donate`)
  }

  const donateNFTs = async (e) => {
    setDonateNfts(true)
    Router.push(`/donate`)
  }

  const visitSite = (site) => {
    const link = site.value
    if (link) {
      window.open(link, '_blank')
    } else {
      window.open(site, '_blank')
    }
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container
      className="page-community"
      style={{ minHeight: '70vh', paddingBottom: '1rem' }}
    >
      <div>
        {selectedProfile ? (
          <Box sx={{ width: '100%' }}>
            <br />
            <br />
            <br />
            <p className={styles.titleFundraiser}> {selectedProfile.title}</p>
            <br />

            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={8}>
                <img
                  src={selectedProfile.image}
                  alt="community"
                  className={styles.foundraiserImg}
                />
                <br />
                <br />

                <div className={styles.outer}>
                  {/* <Image
                    src="/profile-icon.png"
                    alt="profileIcon"
                    className={styles.profileIcon}
                    width={70}
                    height={70}
                  /> */}

                  <img
                    src="/profile-icon.png"
                    alt="profileIcon"
                    className={styles.profileIcon}
                  />

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
                <br />
                <br />
                <Chip
                  className={styles.profileChip}
                  label={` Category: ${selectedProfile.category}`}
                  variant="outlined"
                />
                <Chip
                  className={styles.profileChip}
                  label={` Created at: ${selectedProfile.creationDate}`}
                  variant="outlined"
                />
                <Chip
                  className={styles.profileChip}
                  label={`Fundraiser id: ${selectedProfile.fundraiserId}`}
                  variant="outlined"
                />
                <br />
                <br />
                <hr style={{ border: '1px solid #c8c8c8' }} />
                <br />
                <br />

                <p className={styles.titleFundraiser}> Updates</p>
                {/* <TableUpdates /> */}
              </Grid>

              <Grid p xs={4} className={styles.gridRigthSide}>
                <Card
                  style={{
                    width: '300px',
                    padding: '1.5rem',
                    float: 'right',
                  }}
                >
                  <div className="">
                    <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                      $
                      {selectedProfile.totalDonations === '0'
                        ? '0.00'
                        : selectedProfile.totalDonations}
                      <span
                        style={{
                          fontSize: '.94rem',
                          color: 'rgb(90 87 87)',
                          paddingLeft: '0.3rem',
                        }}
                      >
                        raised of $ {selectedProfile.targetAmmount}
                      </span>
                    </p>
                    <br />
                    <LinearProgress variant="determinate" value={50} />

                    <p style={{ fontSize: '.9rem', color: 'rgb(90 87 87)' }}>
                      30.3K donations
                    </p>
                    <br />

                    <br />

                    <Button
                      style={{
                        width: '100%',
                        background:
                          'linear-gradient(180deg,#ffde9e 50%,#fcb957)',
                        color: 'black',
                      }}
                      onClick={donate}
                    >
                      Donate Now
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{
                        width: '100%',
                        background:
                          'linear-gradient(180deg,#ffde9e 50%,#fcb957)',
                        color: 'black',
                      }}
                      // onClick={donateStream}
                    >
                      Stream Payment By Superfluid
                    </Button>
                    <br />
                    <br />
                    <Button
                      // onClick={donateNFTs}
                      style={{
                        width: '100%',
                        background:
                          'linear-gradient(180deg,#fdb933 35.42%,#f58131 139.58%)',
                        color: 'black',
                      }}
                    >
                      Donate NFT By NftPort
                    </Button>
                    <br />
                    <br />

                    <Button
                      // onClick={donateNFTs}
                      style={{
                        width: '100%',
                        background:
                          'linear-gradient(180deg,#310242 35.42%,#2348cb 139.58%)',
                        color: 'white',
                      }}
                    >
                      Chat powered by XMTP
                    </Button>
                    <br />
                    <br />

                    <img
                      src="/donation.png"
                      alt="profileIcon"
                      className={styles.donationImg}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Box>
        ) : (
          // <Button variant="contained" color="primary" component={Link} to="/">
          <Button variant="contained" color="primary">
            <Link style={{ color: 'white', textDecoration: 'none' }} href="/">
              Refresh
            </Link>
          </Button>
        )}
      </div>
      <br />
      <Typography className="subtitle" color="textPrimary" gutterBottom>
        Updates comming soon...
      </Typography>
      <br /> <br />
    </Container>
  )
}

export default Profile
