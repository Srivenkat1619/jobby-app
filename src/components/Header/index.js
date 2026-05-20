import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import logoImg from '../assets/jobby_logo.png'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/">
          <img
            src={logoImg}
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="menu">
          <li>
            <Link to="/" className="menu-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="menu-item">
              Jobs
            </Link>
          </li>
          </ul>
          <div>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
