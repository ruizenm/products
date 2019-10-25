import React, { Component } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './style.css';
import { PriceTransformer, FreeShippingTransformer, ConditionTransformer } from '../Transformers';

export default class ProductList extends Component {

    renderList () {
        const { items } = this.props;
        const { showProductDetails } = this;

        const list = items.map(function(item) {
            return (<Row className="product-list-row" key={item.id}>
            <Col sm={3}>
                <Image  className="product-list-image" 
                        src={item.picture} alt={item.title} 
                        title="ver detalles"  
                        onClick={ () => showProductDetails(item.id) }
                        fluid/>
            </Col>
            <Col sm={9}>
                <Row>
                    <Col xs={12} sm={8}>
                        <span className="product-list-price" title={ 'Moneda: ' + item.price.currency }>
                            <PriceTransformer value={item.price.amount} />&nbsp;
                            <FreeShippingTransformer value={item.free_shipping} title="Envío gratis"/>
                        </span>
                    </Col>
                    <Col xs={12} sm={4}>
                        <span className="product-list-location">{item.address}</span>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <span   className="product-list-name" 
                                title="ver detalles"  
                                onClick={ () => showProductDetails(item.id) }>{item.title}</span>
                    </Col>
                    <Col sm={12}>
                        <span className="product-list-description">
                            <ConditionTransformer value={item.condition} />
                        </span>
                    </Col>
                </Row>
            </Col>
        </Row>);
        });

        return list;
    }

    showProductDetails = (id) => {
        this.props.callbackProducDetails(id);
    }
    
    render() {
        const list = this.renderList();

        return (<div>
        <Container>
            <div className="product-list">
                { list }
            </div>
        </Container>
        </div>);
    }
    
}