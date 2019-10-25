import React, { Component } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import './style.css';


export default class MyBreadcrumb extends Component {
    
    render() {
        return (<div>
        <Container>
            <Row>
                <Col sm={12}>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </Container>
        </div>);
    }
    
}