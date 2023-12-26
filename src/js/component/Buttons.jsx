import React, { useContext } from 'react'
import { Context } from '../store/appContext.js'

import styles from '../../styles/Buttons.module.css'

const Buttons = ({ uid, type, big }) => {
  const { store, actions } = useContext(Context)

  const isInFavorites = store.favoritesUIDs[`${type}s`].includes(uid)
  const isInReadLater = store.readLaterUIDs[`${type}s`].includes(uid)

  const toggleFavorite = () => {
    if (!isInFavorites) actions.addToFavorites({ uid, type })
    else actions.removeFromFavorites({ uid, type })
  }

  const toggleReadLater = () => {
    if (!isInReadLater) actions.addToReadLater({ uid, type })
    else actions.removeFromReadLater({ uid, type })
  }

  return (
    <div className={`${styles.buttons} ${big && styles.big}`}>
      <button onClick={toggleFavorite}>
        {isInFavorites ? (
          <i className='fas fa-heart' style={{ color: 'rgb(200 25 25)' }}></i>
        ) : (
          <i className='far fa-heart'></i>
        )}
      </button>
      <button onClick={toggleReadLater}>
        {isInReadLater ? (
          <i className='fas fa-bookmark' style={{ color: '#ffc500' }}></i>
        ) : (
          <i className='far fa-bookmark'></i>
        )}
      </button>
    </div>
  )
}
export default Buttons
