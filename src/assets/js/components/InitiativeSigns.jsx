import React from 'react';
import PropTypes from 'prop-types';
import SignsForm from './SignsForm';

export default function InitiativeSigns(props) {
  return (
    <div>
      <h2>Firmas de apoyo</h2>
      <p>Han apoyado esta iniciativa {props.signsCount} personas. ¡Apóyala tú también!</p>
      <p>Nadie a apoyado esta iniciativa aún. ¡Puedes ser el primero!</p>
      <div>
        <SignsForm onSubmit={props.onSubmit} />
      </div>
    </div>
  );
}

InitiativeSigns.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  signsCount: PropTypes.number.isRequired,
};
