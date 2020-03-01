import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Formik, Form, Field } from 'formik'

import {
  Button,
  Grid,
  TextField,
  withStyles
} from '@material-ui/core'

import { connect } from 'react-redux'
import { submitComment } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.styles,
  ...theme.separators,
})

const CommentForm = ({ classes, authenticated, submitComment, screamId, UI: { loading, errors } }) => {
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    errors && setLocalErrors(errors)
  }, [errors, loading])

  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <Formik initialValues={{
        body: ''
      }}
        onSubmit={({ body }, { resetForm }) => {
          submitComment(screamId, { body })
          resetForm()
        }}
      >
        {() => (
          <Form>
            <Field
              name="body"
              type="text"
              label="Comment on scream"
              error={localErrors.comment ? true : false}
              helperText={localErrors.comment}
              fullWidth
              className={classes.textField}
              as={TextField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm))
