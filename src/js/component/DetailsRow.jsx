import React from 'react'

import styles from '../../styles/DetailsRow.module.css'

const DetailsRow = ({ label, value }) => {
  return (
    <div className={styles.detailRow}>
      <span className={styles.label}>{label}:</span>{' '}
      <span className={styles.value}>{value}</span>
    </div>
  )
}
export default DetailsRow
