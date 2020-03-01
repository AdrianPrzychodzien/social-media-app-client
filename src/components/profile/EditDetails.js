import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

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
  const [data, setData] = useState({
    bio: '',
    website: '',
    location: '',
  })

  useEffect(() => {
    mapUserDetailsToState(credentials)
  }, [credentials])

  const { bio, website, location } = data

  const handleOpen = () => {
    setOpen(true)
    mapUserDetailsToState(credentials)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const mapUserDetailsToState = credentials => {
    setData({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    })
  }

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    const userDetails = { bio, website, location }
    editUserDetails(userDetails)
    handleClose()
  }

  return (
    <>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
            </Button>
        </DialogActions>
      </Dialog>
    </>
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
