import React, { Component } from 'react';
import logo from './Logo_ML.png';
import { Container, Row, Col } from 'react-bootstrap';
import Searchbox from '../Searchbox';
import './style.css';


export default class Header extends Component {
    
    render() {
        return (<div className="header">
            <Container>
                <Row>
                    <Col xs={2} sm={1}>
                        <img src={logo} alt="logo de mercadolibre"/>        
                    </Col>
                    <Col xs={10} sm={11}>
                        <Searchbox callbackProductList={this.props.callbackProductList} />
                    </Col>
                </Row>
            </Container>
        </div>);
    }
    
}