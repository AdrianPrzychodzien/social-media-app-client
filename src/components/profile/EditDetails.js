import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

import { Formik, Form, Field } from 'formik'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  withStyles
} from '@material-ui/core'

import { Edit as EditIcon } from '@material-ui/icons'

import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

const styles = theme => ({
  ...theme.styles,
  button: {
    float: 'right'
  }
})

const EditDetails = ({ classes, credentials, editUserDetails }) => {
  const [open, setOpen] = useState(false)

  return (
    <Formik initialValues={{
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    }}
      onSubmit={({ bio, website, location }) => {
        editUserDetails({ bio, website, location })
      }}
    >
      {() => (
        <>
          <MyButton
            tip="Edit details"
            onClick={() => setOpen(true)}
            btnClassName={classes.button}>
            <EditIcon color="primary" />
          </MyButton>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth='sm'>
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
              <Form>
                <Field
                  name="bio"
                  type="text"
                  label="Bio"
                  multiline
                  rows="3"
                  placeholder="A short bio about yourself"
                  className={classes.textField}
                  fullWidth
                  as={TextField}
                />
                <Field
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="Your personal/professional website"
                  className={classes.textField}
                  fullWidth
                  as={TextField}
                />
                <Field
                  name="location"
                  type="text"
                  label="Location"
                  placeholder="Where you live"
                  className={classes.textField}
                  fullWidth
                  as={TextField}
                />
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                    </Button>
                  <Button type="submit" color="primary">
                    Save
                    </Button>
                </DialogActions>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Formik>
  )
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  credentials: state.user.credentials
})

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails))
