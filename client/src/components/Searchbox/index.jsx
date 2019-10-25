import React, { Component } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default class Searchbox extends Component {

    constructor(props) {
		super(props);
        this.state = {
            query: '',
            loading: false
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name] : value
        });
    }

    render () {
        return(<Form onSubmit={this.handleSubmit}>
            <InputGroup>
                <FormControl
                    placeholder="Nunca dejes de buscar"
                    name="query" 
                    onChange={this.handleChange}
                    value={this.state.query}
                />
                <InputGroup.Append>
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </Form>);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const query = this.state.query;
        this.setState({ query: '' });
        this.props.history.push('/items/search/' + query);
    }

}