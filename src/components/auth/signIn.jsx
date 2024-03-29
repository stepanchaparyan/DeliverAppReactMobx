import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../../stylesheets/auth.scss'
import { ValidationForm, TextInput, TextInputGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { FaEye } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { DebounceInput } from 'react-debounce-input';
import { Button } from 'reactstrap';
import firebase from '../../config/fbConfig';
import { observer } from 'mobx-react';

@observer
class SignIn extends Component {
  state = {
    email: '',
    password: '',
    type: 'password',
    error: 'fbsfbsf'
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u) => { 
      document.getElementById("wrongUser").style.display = 'none';
    })
    .catch((error) => {
      this.text = error.message;
      document.getElementById("wrongUser").style.display = 'block';
    });
  }
  showhidepass = (e) => {
    this.state.type === 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'})
  }

  render() {
    const { user } = this.props;
    if (user) return <Redirect to='/' /> 
    return (
      <div className="loginContainer">
       <div className="formSignIn">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="title">LogIn</div>
          <ValidationForm onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className="lebel" htmlFor="email">Email</label>
                <DebounceInput element={TextInput}
                    debounceTimeout={500}
                    name="email"
                    id="email"
                    type="email"
                    validator={validator.isEmail}
                    errorMessage={{ validator: "Please enter a valid email" }}
                    value={this.state.email}
                    onChange={this.handleChange}
                />
            </div>
            <div className="form-group">
                <label className="lebel" htmlFor="password">Password</label>
                <DebounceInput element={TextInputGroup}
                    debounceTimeout={500}
                    name="password"
                    id="password"
                    type={this.state.type}
                    required
                    pattern=".{6,}"
                    errorMessage={{
                        required: "Password is required",
                        pattern: "Password should be at least 6 characters long"
                    }}
                    value={this.state.password}
                    onChange={this.handleChange}
                    append={<div id="eye" onClick={this.showhidepass}><FaEye /></div>}
                    autoComplete='true'
                />
            </div>
            <div id="wrongUser">
                { !user ? <p>{'The password is invalid or the user does not have a password'}</p> : null }
            </div>
            <div className="form-group" id="btn">
              <Button className="btnSignIn" size="lg" block color="info">Submit</Button>
            </div>
            <Link className="forgotPassword" to="/forgotPassword">Forgot password?</Link>
        </ValidationForm>
        </div>
      </div>  
    )
  }
}

export default SignIn
