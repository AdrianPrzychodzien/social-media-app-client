import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

// Material-UI
import { AppBar, Toolbar, Button } from '@material-ui/core'

import { Add as AddIcon, Home as HomeIcon, Notifications } from '@material-ui/icons'

class NavBar extends Component {
  render() {
    const { authenticated } = this.props

    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <>
              <MyButton tip="Post a Scream!">
                <AddIcon />
              </MyButton>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
            </>
          ) : (
              <>
                <Button color='inherit' component={Link} to='/login'>Login</Button>
                <Button color='inherit' component={Link} to='/'>Home</Button>
                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
              </>
            )}
        </Toolbar>
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
