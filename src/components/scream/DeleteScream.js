import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  withStyles
} from '@material-ui/core'

import { DeleteOutline } from '@material-ui/icons'

import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
}

const DeleteScream = ({ classes, deleteScream, screamId }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteScream = () => {
    deleteScream(screamId)
    setOpen(false)
  }

  return (
    <>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>
          Are you sure you want to delete this scream ?
          </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
            </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            Delete
            </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
