import React from 'react'
import styles from '@/styles/Footer.module.css'
function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.row}></div>

        <div className={styles.row}>
          <ul>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Our Services</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className={styles.row}>
          Copyright &copy; {new Date().getFullYear()} PetsFoundMe
        </div>
      </div>
    </footer>
  )
}

export default Footer
