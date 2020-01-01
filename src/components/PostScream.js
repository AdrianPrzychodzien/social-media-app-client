import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'

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
import { postScream } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.styles,
  submitButton: {
    position: 'relative'
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

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
      this.handleClose()
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, errors: {} })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.postScream({ body: this.state.body })
  }

  render() {
    const { errors } = this.state
    const { classes, UI: { loading } } = this.props

    return (
      <>
        <MyButton tip="Post a Scream!" onClick={this.handleOpen}>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream!"
                multiline
                rows="3"
                placeholder="Scream at your fellows"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
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
            </form>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI
})

export default connect(
  mapStateToProps,
  { postScream }
)(withStyles(styles)(PostScream))
