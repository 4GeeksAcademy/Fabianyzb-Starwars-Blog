import React, { useContext } from 'react'
import { Context } from '../store/appContext.js'
import capitalize from '../utils/capitalize.js'

import styles from '../../styles/Grid.module.css'

import Card from '../component/Card.jsx'

const Grid = ({ type, isReadLater }) => {
  const { store, actions } = useContext(Context)

  if (isReadLater) {
    return (
      <div className={styles.container}>
        <h2>
          Read Later <i className='fas fa-bookmark'></i>
        </h2>
        <div className={styles.grid}>
          {Array.isArray(store.characters) &&
            store.characters.length > 0 &&
            store.readLaterUIDs.characters
              .map((uid) => store.characters.find((c) => c.uid === uid))
              .map((c) => (
                <Card key={c.uid} name={c.name} uid={c.uid} type='character' />
              ))}
          {Array.isArray(store.planets) &&
            store.planets.length > 0 &&
            store.readLaterUIDs.planets
              .map((uid) => store.planets.find((c) => c.uid === uid))
              .map((c) => (
                <Card key={c.uid} name={c.name} uid={c.uid} type='planet' />
              ))}
          {Array.isArray(store.vehicles) &&
            store.vehicles.length > 0 &&
            store.readLaterUIDs.vehicles
              .map((uid) => store.vehicles.find((c) => c.uid === uid))
              .map((c) => (
                <Card key={c.uid} name={c.name} uid={c.uid} type='vehicle' />
              ))}
        </div>
      </div>
    )
  }

  const list = store[`${type}s`]
  return (
    <div className={styles.container}>
      <h2>{capitalize(type)}s</h2>
      <div className={styles.grid}>
        {list.map((v) => (
          <Card key={v.uid} name={v.name} uid={v.uid} type={type} />
        ))}
        {store.nextPageURLs[`${type}s`] && (
          <button
            className={styles.nextPageBtn}
            onClick={() => actions.loadNextPage(type + 's')}
          >
            Load more
            <i className='fas fa-caret-right'></i>
          </button>
        )}
      </div>
    </div>
  )
}
export default Grid
