import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
  const [body, setBody] = useState('')
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    errors && setLocalErrors(errors)
    !errors && !loading && setBody('')
  }, [errors, loading])

  const handleChange = e => {
    setBody(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    submitComment(screamId, { body: body })
    setBody('')
  }

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={localErrors.comment ? true : false}
          helperText={localErrors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
          </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup
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
