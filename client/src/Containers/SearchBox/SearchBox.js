import React, { useState } from 'react';
import './SearchBox.scss';
import iconSearch from './../../assets/images/icon-search.svg';
import * as searchActions from '../../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component that handles searches and redirects to the corresponding search results
 * @prop {String} currentSearch Current value used for searching
 * @prop {Function} submitSearch Action that submits the next search value
 * @prop {Object} history Provides URL history
*/


export const SearchBox = ({currentSearch, submitSearch, history}) => {

  const [searchString, setSearchString] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    
    if (searchString !== '' && searchString !== currentSearch) {
      submitSearch(searchString)
      history.push(`/items?search=${searchString}`)
    }
    
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nunca dejes de buscar" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
      <button type="submit">
        <img src={iconSearch} alt=""/>
      </button>
    </form>
  )
}

const mapStateToProps = state => ({
  currentSearch: state.search.currentSearch
});

SearchBox.propTypes = {
  currentSearch: PropTypes.string,
  submitSearch: PropTypes.func,
  history: PropTypes.object,
}


export default connect(mapStateToProps, searchActions)(withRouter(SearchBox));