import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { Link } from 'react-router-dom'

import { Formik, Form, Field } from 'formik'

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
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    errors && setLocalErrors(errors)
  }, [errors])

  return (
    <Formik initialValues={{
      email: '',
      password: ''
    }}
      onSubmit={({ email, password }) => {
        const userData = { email, password }
        loginUser(userData, history)
      }}
    >
      {() => (
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
            <Form>
              <Field
                type="email"
                name="email"
                label='Email'
                helperText={localErrors.email}
                error={localErrors.email ? true : false}
                className={classes.textField}
                fullWidth
                as={TextField}
              />
              <Field
                type="password"
                name="password"
                label='Password'
                helperText={localErrors.password}
                error={localErrors.password ? true : false}
                className={classes.textField}
                fullWidth
                as={TextField}
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
            </Form>
          </Grid>
          <Grid item sm />
        </Grid>
      )}
    </Formik>
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
