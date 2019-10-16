import React from 'react';
import './Breadcrumbs.scss';

const Breadcrumbs = ({data}) => {
  return (
    <div className="breadcrumbs">
      {
        data && data.map((element, index) => (
          index === data.length -1 
          ? <a href="#" className="breadcrumb breadcrumb-current" key={index}>{element}</a>
          : (<React.Fragment key={index}>
              <a href="#" className="breadcrumb">{element}</a>
              <span className="breadcrumb-separator"> > </span>
            </React.Fragment>)
        ))
      }
    </div>
  )
}

export default Breadcrumbs;