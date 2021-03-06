import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core'

import { Chat as ChatIcon } from '@material-ui/icons'

import { connect } from 'react-redux'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

const Scream = ({
  classes,
  openDialog,
  scream: {
    body, createdAt, userImage, userHandle, likeCount, commentCount, screamId },
  user: {
    authenticated,
    credentials: { handle }
  }
}) => {
  dayjs.extend(relativeTime)

  const deleteButton = authenticated && userHandle === handle ? (
    <DeleteScream screamId={screamId} />
  ) : null

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title='Profile image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >{userHandle}</Typography>
        {deleteButton}
        <Typography
          variant='body2'
          color='textSecondary'
        >{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant='body1'>{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  )
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
