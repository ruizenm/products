import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import logo from './ic_shipping.png';

class PriceTransformer extends Component {
    transformer = (value) => {
        if (typeof value == 'undefined' || !value)
            return '';
        return Number(value).toLocaleString();
    }

    render () {
        const { value } = this.props;
        return <span>$ { this.transformer(value) }</span>
    }
}

class FreeShippingTransformer extends Component {
    transformer = (value) => {
        if (typeof value == 'undefined' || !value)
            return '';
        return (<Image className="product-list-free-shipping" src={logo} alt="Envío gratis" title="Envío gratis"/>);
    }

    render () {
        const { value } = this.props;
        return <span>{ this.transformer(value) }</span>
    }
}

class ConditionTransformer extends Component {
    transformer = (value) => {
        let text = '';
        switch (value) {
            case 'new':
                text = 'Nuevo';
                break;
        }
        return text;
    }

    render () {
        const { value } = this.props;
        return <span>{ this.transformer(value) }</span>
    }
}

export {
    PriceTransformer,
    FreeShippingTransformer,
    ConditionTransformer
};