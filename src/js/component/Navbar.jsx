import React from 'react'
import { useNavigate } from 'react-router'

import styles from '../../styles/Navbar.module.css'

import Logo from './Logo.jsx'
import Dropdown from './Dropdown.jsx'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.navbar}>
      <Logo onClick={() => navigate('/')} />
      <Dropdown />
    </div>
  )
}
export default Navbar
