import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import MyBreadcrumb from './components/MyBreadcrumb';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';
import { Spinner } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
		super(props);
    this.state = {
      result: {},
      view: 'list',
      productId: ''
    }
  }

  render() {
    return (<div className="App-body">
      <Header callbackProductList={this.callbackProductList} />
      { this.state.result.items && 
        this.state.result.items.length > 0 &&
        <div>
          <MyBreadcrumb />
          { this.state.view == 'list' ? (
            <ProductList items={this.state.result.items} callbackProducDetails={this.callbackProducDetails} />
          ) : (
            <ProductDetails productId={ this.state.productId }/>
          )}
        </div>
      }
    </div>);
  }

  callbackProductList = (result) => {
    this.setState({
      result: result,
      view: 'list'
    });
  }
  
  callbackProducDetails = (id) => {
    this.setState({
      view: 'details',
      productId: id
    });
  }

}

export default App;
