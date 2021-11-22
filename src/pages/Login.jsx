import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(true);
  const history = useHistory();
  const MINIMUM_CHARACTERS = 6;

  // Código abaixo de validar email visualizado em Stack Overflow
  // URL: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  function validateEmail(emailInput) {
    const re = /\S+@\S+\.\S+/;
    return re.test(emailInput);
  }

  function inputEmail(value) {
    setEmail(value);
    const isEmailValid = validateEmail(value);
    if (isEmailValid) setEmailInvalid(false);
    if (!isEmailValid) setEmailInvalid(true);
  }

  function buttonDisabled() {
    if (emailInvalid === false && password.length > MINIMUM_CHARACTERS) {
      return false;
    }
    return true;
  }

  function handleClick() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const userEmail = { email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/comidas');
  }

  return (
    <div className="container">
      <h1>LOGIN</h1>
      <div className="inputs-container">
        <div className="inputs">
          <input
            data-testid="email-input"
            type="email"
            placeholder="Email"
            value={ email }
            onChange={ ({ target }) => inputEmail(target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ buttonDisabled() }
          onClick={ () => handleClick() }
        >
          {' '}
          Entrar

        </button>
      </div>
    </div>
  );
}
