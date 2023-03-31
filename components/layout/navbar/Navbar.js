import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styles from '../../../styles/Navbar.module.css'

export const Navbar = ({ account, loginWithSafeAuthKit, disconnectWallet }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <EmailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const myLogout = () => {
    auth?.logout()
  }

  return (
    <div className={styles.grow}>
      <AppBar position="static" className={styles.navBar}>
        <Toolbar>
          {account ? (
            <>
              <Button>
                <Link className={styles.whiteLink} href="/">
                  PetsFoundMe
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/">
                  Home
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/profile">
                  Profile
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/createprofile">
                  Create
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/walletfund">
                  Wallet Fund
                </Link>
              </Button>
              {/* <Button>
                <Link className={styles.whiteLink} href="/profile">
                  Profile
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/create">
                  Create
                </Link>
              </Button> */}
            </>
          ) : (
            <>
              <Button>
                <Link className={styles.whiteLink} href="/">
                  Home
                </Link>
              </Button>

              <Button>
                <Link className={styles.whiteLink} href="/walletfund">
                  Wallet Fund
                </Link>
              </Button>
            </>
          )}

          <div className={styles.grow} />
          {account ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  background:
                    'linear-gradient(180deg,#91e1f9 35.42%,#f533e8 139.58%)',
                  color: 'white',
                  fontSize: '1rem',
                }}
                endIcon={<VerifiedUserIcon />}
                // onClick={myLogout}
              >
                {account}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#FF835B', color: 'white' }}
                onClick={loginWithSafeAuthKit}
              >
                Connect Wallet
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
