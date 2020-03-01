import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'

import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core'

import {
  Chat as ChatIcon,
  Close as CloseIcon,
  UnfoldMore
} from '@material-ui/icons'

import { connect } from 'react-redux'
import { getScream, clearErrors } from '../../redux/actions/dataActions'

const styles = theme => ({
  ...theme.styles,
  ...theme.separators,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 45
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})

const ScreamDialog = ({
  classes,
  getScream, clearErrors,
  openDialog, userHandle, screamId, //from parent
  scream: {
    body, createdAt, commentCount, userImage, comments, likeCount
  },
  UI: { loading },
}) => {
  const [open, setOpen] = useState(false)
  const [path, setPath] = useState({
    oldPath: '',
    newPath: ''
  })

  // useEffect(() => {
  //   if (openDialog) {
  //     handleOpen()
  //   }
  // }, [openDialog])

  const { oldPath } = path

  const handleOpen = () => {
    let oldPath = window.location.pathname

    const newPath = `/users/${userHandle}/scream/${screamId}`

    if (oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath)

    setOpen(true)
    setPath({ oldPath, newPath })
    getScream(screamId)
  }

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false)
    clearErrors()
  }

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography
            variant="body2"
            color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography
            variant="body1">
            {body}
          </Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    )

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent} >
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  )
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
})

const mapActionsToProps = {
  getScream,
  clearErrors
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog))