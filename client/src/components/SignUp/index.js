import React,{Component} from 'react'
import Cookies from "js-cookie"
import {Link,Redirect} from "react-router-dom"
import "./index.css"

class SignUp  extends Component{
  state={
    email:"",
    username:"",
    password:"",
    confirmpassword:"",
  }

  onChangeUsername = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({username: event.target.value})
  }

  onChangePassname = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmpassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 100})
    history.replace('/login')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password,email,confirmpassword} = this.state
    const userDetails = {username, password,email,confirmpassword}
    const url = 'https://apis.ccbp.in/register'
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
    const {username, password, email, confirmpassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/sign" />
    }
    return (
      <div className="login-bg">
          <form className="login-form" onSubmit={this.submitForm}>
          <div className="login-container">
              <label htmlFor="userId" className="label-text">
                Email
              </label>
              <input
                id="userId"
                type="text"
                placeholder="Email"
                className="input-bar"
                value={email}
               onChange={this.onChangeUsername }
              />
            </div>
          
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
                onChange={this.onChangePassword}
               
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
                onChange={this.onChangePassname}
              
              />
            </div>
            <div className="login-container">
              <label htmlFor="pwd" className="label-text">
                CONFIRMPASSWORD
              </label>
              <input
                id="pwd"
                type="password"
                placeholder="Confirm Password"
                className="input-bar"
                value={confirmpassword}
                onChange={this.onChangeConfirmPassword}
              
              />
            </div>
            
            <button type="submit" className="login-btn">
              Sign Up
            </button>
            <p className="chng-txt">
              Already a member?
              <span>
                <button className="change-btn" type="button">
                 <Link to="/login">
                    Login
                    </Link>
                </button>
              </span>
            </p>
          </form>
        </div>
      )

  }
 
  
}

export default SignUp