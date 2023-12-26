import React, { useContext } from 'react'
import { Context } from '../store/appContext.js'

import styles from '../../styles/Home.module.css'

import Grid from '../component/Grid.jsx'
import Loader from '../component/Loader.jsx'

const Home = () => {
  const { store } = useContext(Context)

  if (store.characters.length < 1 || store.planets < 1 || store.vehicles < 1)
    return <Loader />

  return (
    <div className={styles.container}>
      <Grid type='character' />
      <Grid type='planet' />
      <Grid type='vehicle' />
    </div>
  )
}
export default Home
