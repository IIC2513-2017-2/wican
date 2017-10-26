import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InitiativeSignsComponent from '../components/InitiativeSigns';
import initiativesService from '../services/initiatives';

export default class InitiativeSigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signsCount: 0,
      loading: false,
      error: undefined,
      showThanks: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchInitiative();
  }

  async onSubmit(data) {
    this.setState({ loading: true, error: undefined, showThanks: false });
    try {
      const json =
        await initiativesService.putSign(this.props.ongId, this.props.initiativeId, data);
      this.setState({ signsCount: json.signsCount, loading: false, showThanks: true });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  async fetchInitiative() {
    this.setState({ loading: true });
    const initiativeData = await initiativesService.get(this.props.ongId, this.props.initiativeId);
    this.setState({ signsCount: initiativeData.signsCount, loading: false });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {this.state.showThanks && <div className="notification">¡Gracias por tu apoyo!</div>}
        {this.state.error && <div className="error">Error: {this.state.error}</div>}
        <InitiativeSignsComponent
          signsCount={this.state.signsCount}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

InitiativeSigns.propTypes = {
  ongId: PropTypes.string.isRequired,
  initiativeId: PropTypes.string.isRequired,
};
