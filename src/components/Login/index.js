import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onUsernameInput = event => {
    this.setState({userName: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: userName, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="form-container">
          <div className="logo-container">
            <span className="logo-icon">J</span>
            <h1 className="logo-text">Jobby</h1>
          </div>
          <form className="form" onSubmit={this.onClickSubmit}>
            <div className="input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="input"
                onChange={this.onUsernameInput}
                value={userName}
                placeholder="Username"
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="input"
                onChange={this.onPasswordInput}
                value={password}
                placeholder="Password"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
