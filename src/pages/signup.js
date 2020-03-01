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
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.styles
})

const Signup = ({ classes, signupUser, UI: { errors, loading }, history }) => {
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    errors && setLocalErrors(errors)
  }, [errors])

  return (
    <Formik initialValues={{
      email: '',
      password: '',
      confirmPassword: '',
      handle: ''
    }}
      onSubmit={({ email, password, confirmPassword, handle }) => {
        const newUserData = {
          email,
          password,
          confirmPassword,
          handle,
        }
        signupUser(newUserData, history)
      }}
    >{() => (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography
            variant="h2"
            className={classes.pageTitle}
          >
            Signup
            </Typography>
          <Form>
            <Field
              name='email'
              type='email'
              label='Email'
              className={classes.textField}
              helperText={localErrors.email}
              error={localErrors.email ? true : false}
              fullWidth
              as={TextField}
            />
            <Field
              name='password'
              type='password'
              label='Password'
              className={classes.textField}
              helperText={localErrors.password}
              error={localErrors.password ? true : false}
              fullWidth
              as={TextField}
            />
            <Field
              name='confirmPassword'
              type='password'
              label='Confirm Password'
              className={classes.textField}
              helperText={localErrors.confirmPassword}
              error={localErrors.confirmPassword ? true : false}
              fullWidth
              as={TextField}
            />
            <Field
              name='handle'
              type='text'
              label='Handle'
              className={classes.textField}
              helperText={localErrors.handle}
              error={localErrors.handle ? true : false}
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>Already have an account ? login <Link to='/login'>here</Link></small>
          </Form>
        </Grid>
        <Grid item sm />
      </Grid>
    )}
    </Formik>
  )
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup))
