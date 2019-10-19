import React from 'react';
import './Header.scss'
import logo from './../../assets/images/logo-mercado-libre.png'
import SearchBox from '../../Containers/SearchBox/SearchBox';
import { Link } from 'react-router-dom';

/**
 * Static header component
*/

const Header = () => {
    return (
      <header>
        <div className="header-content">
          <Link to="/">
            <img src={logo} alt="Logo Mercadolibre"/>
          </Link>
          <SearchBox />
        </div>
      </header>
    )
}

export default Header;
