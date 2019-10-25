import React, { Component } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import './style.css';
import { PriceTransformer, FreeShippingTransformer, ConditionTransformer } from '../Transformers';

export default class ProductList extends Component {

    constructor(props) {
		super(props);
        this.state = {
            loading: false,
            item: {}
        }
    }

    componentDidMount() {
        const { productId } = this.props;
        this.setState({loading : true});
        fetch('/api/items/' +  productId)
        .then(response => {
            this.setState({loading: false});
            if (response.ok) {
                return response.json();
            } else {
                console.log("¡Error!");
            }
        })
        .then(data => {
            if (data && data.item) {
                this.setState({item: data.item});
            }
        });
    }
    
    render() {
        const { item } = this.state;
        return (<div>
        { item.id &&
            <Container>
                <div className="product-details">
                <Row>
                    <Col xs={6} sm={7}>
                        <Image src={ item.picture } alt="producto 1" fluid/>
                    </Col>
                    <Col xs={6} sm={5}>
                        <Row>
                            <Col sm={12}>
                                <span className="product-details-sells">
                                    <ConditionTransformer value={item.condition} />&nbsp;
                                    { item.sold_quantity } vendidos&nbsp;
                                    <FreeShippingTransformer value={item.free_shipping} />
                                </span>
                            </Col>
                            <Col sm={12}>
                                <h1 className="product-details-name">
                                    { item.title }
                                </h1>
                            </Col>
                            <Col sm={12}>
                                <span className="product-details-price" title={ 'Moneda: ' + item.price.currency }>
                                    <PriceTransformer value={item.price.amount} />
                                </span>
                            </Col>
                            <Col sm={12}>
                            <Button className="product-details-botton-comprar" variant="primary">
                                Comprar
                            </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={7}>
                        <div className="product-details-description">
                            <h2>Descripción del producto</h2>
                            <p>{ item.description }</p>
                        </div>
                    </Col>
                </Row>
                </div>
            </Container>
        }
        </div>);
    }
    
}