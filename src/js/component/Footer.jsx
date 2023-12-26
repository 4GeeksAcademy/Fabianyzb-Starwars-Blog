import React, { useContext } from 'react'
import { Context } from '../store/appContext'

import styles from '../../styles/Footer.module.css'

import Grid from './Grid.jsx'

const Footer = () => {
  const { store } = useContext(Context)
  const amountOfReadLater =
    store.readLaterUIDs.characters.length +
    store.readLaterUIDs.planets.length +
    store.readLaterUIDs.vehicles.length

  if (amountOfReadLater > 0)
    return (
      <div className={styles.container}>
        <Grid isReadLater />
      </div>
    )
}
export default Footer
