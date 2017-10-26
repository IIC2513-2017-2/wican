import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SignsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>Completa tus datos:</p>
        <label htmlFor="name" className="special-label">
          <span>nombre:</span>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
        </label>
        <label htmlFor="email">
          <span>e-mail:</span>
          <input
            type="text"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.onInputChange}
          />
        </label>
        <div className="actions">
          <input type="submit" value="¡Firmar!" />
        </div>
      </form>
    );
  }
}

SignsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
