import React, { useState } from 'react';
import './SearchBox.scss';
import iconSearch from './../../assets/images/icon-search.svg'
import * as searchActions from '../../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SearchBox = ({currentSearch, submitSearch, history}) => {

  const [searchString, setSearchString] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    
    if (searchString !== currentSearch) {
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


export default connect(mapStateToProps, searchActions)(withRouter(SearchBox));