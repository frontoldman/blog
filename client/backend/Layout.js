
import 'primer-css/build/build.css'
import AdminStyle from './Admin.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import constants from '../redux/constants/'
import { bindActionCreators } from 'redux'
import { logOut } from '../redux/actions/login/'

const defaultAvatar = '/avatar.png'

class Layout extends Component {
  state = {
    quitShowState: false
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleAvatarOver (e) {
    this.setState({
      quitShowState: true
    })
  }

  handleAvatarOut (e) {
    this.setState({
      quitShowState: false
    })
  }

  handleLogOut (e) {
    const { logOut } = this.props
    this.handleAvatarOut()
    logOut()
  }

  componentWillReceiveProps (props) {
    if (props.loginStatus.status === 0 && props.location.pathname !== '/login') {
      this.context.router.push('/login')
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: constants.system.SERVER_RENDERED
    })
  }

  renderContent () {
    const { children, user } = this.props
    var avatar = user.avatar ? user.avatar : defaultAvatar

    return (
      <div className="container">
        <div className="blankslate position-relative">
          <h3>前端杂记</h3>
          <div
            className="position-absolute right-0 top-0 border"
            onMouseOver={this.handleAvatarOver.bind(this)}
            onMouseOut={this.handleAvatarOut.bind(this)}>
            <img className="avatar" src={avatar} width="72" height="72" />
            <div className={AdminStyle.tip}
                 onClick={this.handleLogOut.bind(this)}
                 style={{display: this.state.quitShowState ? 'block' : 'none'}}>退出登录</div>
          </div>
        </div>
        {children}
      </div>
    )
  }

  renderLogin () {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }

  render () {
    return (
      this.props.loginStatus.status === 0 ? this.renderLogin() : this.renderContent()
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.login.loginStatus.user,
    loginStatus: state.login.loginStatus,
    system: state.system
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({
      logOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
