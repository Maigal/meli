import React from 'react'
import './LoadingContainer.scss'

/**
 * Loading spinner contained in a full height+width element to fill up empty spaces.
*/

const LoadingContainer = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingContainer;