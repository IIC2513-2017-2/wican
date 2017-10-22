import React, { Component } from 'react';
import InitiativeSignsComponent from '../components/InitiativeSigns';

export default class InitiativeSigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signsCount: 0,
      loading: false,
      showThanks: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchInitiative();
  }

  async onSubmit() {
    this.setState({ loading: true });
    const response = await fetch(`${window.location.pathname}/sign`, {
      method: 'put',
      headers: { Accept: 'application/json' },
    });
    const json = await response.json();
    this.setState({ signsCount: json.signsCount, loading: false, showThanks: true });
  }

  fetchInitiative() {
    this.setState({ loading: true });
    fetch(window.location.pathname, {
      headers: { Accept: 'application/json' },
    })
      .then(response => response.json())
      .then((json) => {
        this.setState({ signsCount: json.signsCount, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {this.state.showThanks && <div className="notification">¡Gracias por tu apoyo!</div>}
        <InitiativeSignsComponent
          signsCount={this.state.signsCount}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
