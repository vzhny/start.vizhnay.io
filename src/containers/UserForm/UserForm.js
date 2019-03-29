import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardBody } from '@/components/Card/Card';
import { form, label, input, buttonGroup, registerButton, loginButton } from './UserForm.module.scss';

const UserForm = ({ toggleVisibility }) => {
  const registerNewAccount = e => {
    e.preventDefault();
    toggleVisibility(false);
  };

  const loginExistingAccount = e => {
    e.preventDefault();
    toggleVisibility(false);
  };

  return (
    <Card>
      <CardHeader>
        <h3>Login/Register</h3>
      </CardHeader>
      <CardBody>
        <form className={form}>
          <label className={label} htmlFor="email">
            Email:
            <input className={input} name="email" placeholder="hello@gmail.com" type="text" />
          </label>
          <label className={label} htmlFor="password">
            Password:
            <input className={input} name="password" placeholder="••••••" type="password" />
          </label>
          <div className={buttonGroup}>
            <button className={registerButton} onClick={e => registerNewAccount(e)} type="submit">
              Register
            </button>
            <button className={loginButton} onClick={e => loginExistingAccount(e)} type="submit">
              Login
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

UserForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default UserForm;
