import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header';
import ProductDetails from './Containers/ProductDetails/ProductDetails';
import SearchResults from './Containers/SearchResults/SearchResults';

function App() {

  
  return (
    <Router>
      <Header />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/items/:id" component={ProductDetails} />
        <Route path="/items" component={SearchResults} />
      </Switch>
    </Router>
  );
}

export default App;
