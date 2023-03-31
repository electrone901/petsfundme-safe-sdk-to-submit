import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import styles from '../../../../styles/ProfileList.module.css'
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import { apiKey } from '../../../../APIKEYS'

function ProfileList({ setSelectedProfile, data }) {
  const [loading, setLoading] = useState(false)
  const [profiles, setProfiles] = useState([])

  const details = (fundraiser) => {
    localStorage.removeItem('selectedProfile')
    localStorage.setItem('selectedProfile', fundraiser)
    setSelectedProfile(fundraiser)
    Router.push(`/profile/${fundraiser.fundraiserId}`)
  }

  return (
    <div style={{ minHeight: '60vh', borderRadius: '24px' }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Grid spacing={40} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data.length ? (
              data.map((fundraiser, index) => (
                <Grid
                  item
                  md={3}
                  spacing={1}
                  className={styles.swapCard}
                  key={index}
                >
                  <Card
                    sx={{ maxWidth: 240 }}
                    onClick={() => details(fundraiser)}
                  >
                    <CardMedia
                      component="img"
                      height="240"
                      image={fundraiser.avatar || fundraiser.image}
                      alt="Profile"
                    />
                    <CardContent>
                      <Typography
                        fontSize="12px"
                        className={styles.cardHeaderSwap}
                      >
                        {fundraiser.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <h2>No Profiles Yet...</h2>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ProfileList
