import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

import { Formik, Form, Field } from 'formik'

import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles
} from '@material-ui/core'

import {
  Add as AddIcon,
  Close as CloseIcon
} from '@material-ui/icons'

import { connect } from 'react-redux'
import { postScream, clearErrors } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
})

const PostScream = ({
  classes,
  clearErrors,
  postScream,
  UI: { loading, errors }
}) => {
  const [open, setOpen] = useState(false)
  const [localErrors, setLocalErrors] = useState({})

  useEffect(() => {
    errors && setLocalErrors(errors)
    if (!errors && !loading) {
      setOpen(false)
      setLocalErrors({})
    }
  }, [errors, loading])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    clearErrors()
    setOpen(false)
    setLocalErrors({})
  }

  return (
    <>
      <MyButton tip="Post a Scream!" onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <Formik initialValues={{
            body: ''
          }}
            onSubmit={({ body }) => {
              postScream({ body })
            }}
          >
            {() => (
              <Form>
                <Field
                  name="body"
                  type="text"
                  label="Scream!"
                  multiline rows="3"
                  placeholder="Scream at your fellows"
                  error={localErrors && localErrors.body ? true : false}
                  helperText={localErrors && localErrors.body}
                  className={classes.textField}
                  fullWidth
                  as={TextField}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submitButton}
                  disabled={loading}
                >
                  Submit
                {loading && (
                    <CircularProgress size={30} className={classes.progressSpinner} />
                  )}
                </Button>

              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { postScream, clearErrors }
)(withStyles(styles)(PostScream))
