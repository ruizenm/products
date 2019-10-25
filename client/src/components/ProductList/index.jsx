import React, { Component } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import './style.css';
import { PriceTransformer, FreeShippingTransformer, ConditionTransformer } from '../Transformers';


export default class ProductList extends Component {

    constructor(props) {
		super(props);
        this.state = {
            loading: false,
            items: []
        }
    }

    componentDidMount () {
        const query = this.props.match.params.query? this.props.match.params.query : '';
        this.loadList(query);
    }

    componentWillReceiveProps (nextProps) {
        const query = nextProps.match.params.query? nextProps.match.params.query : '';
        this.loadList(query);
    }

    renderList () {
        const { items } = this.state;
        const { showProductDetails } = this;

        let list = '';
        if (items.length > 0) {
            list = items.map(function(item) {
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
        }
        return list;
    }

    showProductDetails = (id) => {
        this.props.history.push('/items/' + id);
    }
    
    render() {
        const list = this.renderList();

        return (<div>
            <Container>
                { this.state.loading? (
                    <div className="loading"><Spinner animation="border" /></div>
                ) : ( list && list.length &&
                    <div className="product-list">
                        { list }
                    </div>
                )}
            </Container>
        </div>);
    }

    loadList (query) {
        this.setState({loading : true});
        fetch('/api/items?q=' + query)
        .then(response => {
            this.setState({loading: false});
            if (response.ok) {
                return response.json();
            } else {
                console.log("¡Error!");
            }
        })
        .then(data => {
            if (data && data.items) {
                this.setState({items: data.items});
            }
        });
    }
    
}