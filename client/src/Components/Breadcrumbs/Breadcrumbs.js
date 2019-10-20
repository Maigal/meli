import React from 'react';
import './Breadcrumbs.scss';
import PropTypes from 'prop-types';

/**
 * Generic breadcrumbs component
 * @prop {Array<string>} data List of categories, ordered from parent to children
*/

const Breadcrumbs = ({data}) => {

  if (data && Array.isArray(data) && data.length > 0) {
    return (
      <div className="breadcrumbs">
      {
        data && data.map((element, index) => (
          index === data.length -1 
          ? <a href="!#" className="breadcrumb breadcrumb-current" key={index}>{element}</a>
          : (<React.Fragment key={index}>
              <a href="!#" className="breadcrumb">{element}</a>
              <span className="breadcrumb-separator"> > </span>
            </React.Fragment>)
        ))
      }
    </div>
    )
  }

  return null;
}

Breadcrumbs.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string)
}


export default Breadcrumbs;