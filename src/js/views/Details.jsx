import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import capitalize from '../utils/capitalize.js'
import addThousandSeparator from '../utils/addThousandSeparator.js'

import styles from '../../styles/Details.module.css'

import DetailsRow from '../component/DetailsRow.jsx'
import Buttons from '../component/Buttons.jsx'
import Loader from '../component/Loader.jsx'

const Details = ({ type }) => {
  const [element, setElement] = useState(null)
  const { actions } = useContext(Context)
  const { uid } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    actions.loadDetails({ uid, type }).then((el) => {
      setElement(el)
    })
  }, [type])

  if (!element || type !== element.type) return <Loader />

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img
          src={`https://starwars-visualguide.com/assets/img/${type}s/${uid}.jpg`}
          onError={(e) =>
            (e.target.src =
              'https://starwars-visualguide.com/assets/img/big-placeholder.jpg')
          }
          alt={element.name}
        />
        <Buttons type={type} uid={uid} big />
      </div>
      <div className={styles.rightContainer}>
        <h1>{element.name}</h1>
        {/* Character details */}
        {type === 'character' && (
          <>
            <div className={styles.details}>
              <DetailsRow label='Birth Year' value={element.birth_year} />
              <DetailsRow label='Height' value={element.height + ' cm'} />
              <DetailsRow label='Mass' value={element.mass + ' kg'} />
              <DetailsRow label='Gender' value={capitalize(element.gender)} />
              <DetailsRow
                label='Hair Color'
                value={capitalize(element.hair_color)}
              />
              <DetailsRow
                label='Skin Color'
                value={capitalize(element.skin_color)}
              />
            </div>
            <div className={styles.homeworld}>
              <div className={styles.homeworldHeader}>
                <DetailsRow label='Homeworld' value={element.homeworld.name} />
                <button
                  onClick={() => {
                    setElement(null)
                    navigate(`/planet/${element.homeworld.uid}`)
                    actions
                      .loadDetails({
                        uid: element.homeworld.uid,
                        type: 'planet',
                      })
                      .then((el) => setElement(el))
                  }}
                >
                  <i className='fas fa-info-circle'></i>
                </button>
              </div>
              <div className={styles.divider}></div>
              <img
                src={`https://starwars-visualguide.com/assets/img/planets/${element.homeworld.uid}.jpg`}
                onError={(e) =>
                  (e.target.src =
                    'https://starwars-visualguide.com/assets/img/big-placeholder.jpg')
                }
                alt={`Image of ${element.name}`}
              />
            </div>
          </>
        )}
        {/* Planet details */}
        {type === 'planet' && (
          <div className={styles.details}>
            <DetailsRow
              label='Population'
              value={addThousandSeparator(element.population)}
            />
            <DetailsRow label='Diameter' value={element.diameter + ' km'} />
            <DetailsRow
              label='Rotation Period'
              value={element.rotation_period + '  days'}
            />
            <DetailsRow
              label='Orbital Period'
              value={element.orbital_period + ' days'}
            />
            <DetailsRow label='Gravity' value={element.gravity} />
            <DetailsRow label='Terrain' value={element.terrain} />
            <DetailsRow
              label='Surface Water'
              value={element.surface_water + '%'}
            />
            <DetailsRow label='Climate' value={element.climate} />
          </div>
        )}
        {/* Vehicle details */}
        {type === 'vehicle' && (
          <div className={styles.details}>
            <DetailsRow label='Model' value={element.model} />
            <DetailsRow label='Manufacturer' value={element.manufacturer} />
            <DetailsRow
              label='Class'
              value={capitalize(element.vehicle_class)}
            />
            <DetailsRow
              label='Cost'
              value={addThousandSeparator(element.cost_in_credits) + ' credits'}
            />
            <DetailsRow
              label='Speed'
              value={element.max_atmosphering_speed + ' km/h'}
            />
            <DetailsRow label='Length' value={element.length + ' m'} />
            <DetailsRow
              label='Cargo Capacity'
              value={Number(element.cargo_capacity) / 1000 + ' metric tons'}
            />
            <DetailsRow label='Minimum Crew' value={element.crew} />
            <DetailsRow label='Passengers' value={element.passengers} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Details
