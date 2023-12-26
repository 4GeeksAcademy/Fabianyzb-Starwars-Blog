import React from 'react'
import { useNavigate } from 'react-router'

import styles from '../../styles/Card.module.css'
import Buttons from './Buttons.jsx'

const Card = ({ name, uid, type }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <img
        src={`https://starwars-visualguide.com/assets/img/${type}s/${uid}.jpg`}
        onError={(e) =>
          (e.target.src =
            'https://starwars-visualguide.com/assets/img/big-placeholder.jpg')
        }
        alt={`Image of ${name}`}
      />
      <h3>{name}</h3>
      <div className={styles.cardFooter}>
        <button onClick={() => navigate(`${type}/${uid}`)}>Learn more!</button>
        <Buttons type={type} uid={uid} />
      </div>
    </div>
  )
}
export default Card
