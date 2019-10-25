import React, { Component } from 'react';
import logo from './Logo_ML.png';
import { Container, Row, Col } from 'react-bootstrap';
import Searchbox from '../Searchbox';
import './style.css';


export default class Header extends Component {
    
    render() {
        const { history } = this.props;
        return (<div className="header">
            <Container>
                <Row>
                    <Col xs={2} sm={1}>
                        <img    className="header-logo" 
                                src={logo} alt="logo de mercadolibre" 
                                onClick={ () => { history.push("/")} }/>        
                    </Col>
                    <Col xs={10} sm={11}>
                        <Searchbox history={history}/>
                    </Col>
                </Row>
            </Container>
        </div>);
    }
    
}