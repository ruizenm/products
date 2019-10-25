import React, { Component } from 'react';
import {  BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MyBreadcrumb from './components/MyBreadcrumb';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';


class App extends Component {

  render() {
    return (<div className="App-body">
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Route exact path="/items/:id" component={ProductDetails} />
        <Route path="/items/search/:query" component={ProductList} />
      </BrowserRouter>
    </div>);
  }

}

export default App;
