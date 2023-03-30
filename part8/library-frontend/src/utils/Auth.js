import Cookies from 'js-cookie'

const Auth = {
  isAuthorized() {
    if(Cookies.get('token')) return true
    return null
  },
  storeToken(token) {
    Cookies.set('token', token)
  },
  getToken() {
    return Cookies.get('token')
  },
  logout(navigate) {
    if (window.confirm('Are you sure you want to logout?')) {
      Cookies.remove('token')
      navigate('/')
    }
  }
}

export default Auth;