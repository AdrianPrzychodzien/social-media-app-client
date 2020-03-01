import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  withStyles
} from '@material-ui/core'

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.styles
})

const Login = ({ classes, loginUser, UI: { loading, errors }, history }) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [localErrors, setLocalErrors] = useState({})

  const { email, password } = data

  useEffect(() => {
    errors && setLocalErrors(errors)
  }, [errors])

  const handleSubmit = e => {
    e.preventDefault()

    const userData = { email, password }
    loginUser(userData, history)
  }

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography
          variant="h2"
          className={classes.pageTitle}
        >
          Login
            </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={localErrors.email}
            error={localErrors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={localErrors.password}
            error={localErrors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          {localErrors.general && (
            <Typography
              variant='body2'
              className={classes.customError}>
              {localErrors.general}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={loading}
          >
            Login
              {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>dont have an account ? sign up <Link to='/signup'>here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login))
