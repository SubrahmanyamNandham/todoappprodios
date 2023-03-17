import React from 'react'
import "./index.css"
import Cookies from "js-cookie"
import { Component} from "react"

import {Link,Redirect} from "react-router-dom"

class Login extends Component{
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://localhost:7000/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
      //   console.log(data.error_msg)
    }
  }

render(){
  const {username, password, showSubmitError, errorMsg} = this.state
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/todo" />
  }

  return (
    <div className="login-bg">
        <form className="login-form" onSubmit={this.onSubmitSuccess}>
          <img
            src="https://res.cloudinary.com/dvco5xnoe/image/upload/v1678955321/1528642636782_bcmlqt.jpg"
            alt="website logo"
            className="login-logo"
          />
          <div className="login-container">
            <label htmlFor="userId" className="label-text">
              USERNAME
            </label>
            <input
              id="userId"
              type="text"
              placeholder="Username"
              className="input-bar"
              value={username}
              onChange={this.onChangeUsername}
             
            />
          </div>
          <div className="login-container">
            <label htmlFor="pwd" className="label-text">
              PASSWORD
            </label>
            <input
              id="pwd"
              type="password"
              placeholder="Password"
              className="input-bar"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
       
          <button type="submit" className="login-btn">
            Log in
          </button>
          <p className="chng-txt">
            Already a member?
            <span>
              <button className="change-btn" type="button">
               <Link to="/sign">
                  Sign Up
                  </Link>
              </button>
            </span>
          </p>
          {showSubmitError && <p className="error-msg">{errorMsg}</p>}

        </form>

      </div>
  )

}
}

export default Login