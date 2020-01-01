import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  withStyles
} from '@material-ui/core'

const styles = {
  card: {
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

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime)
    const { classes, scream: { body, createdAt, userImage, userHandle } } = this.props
    // , screamId, likeCount, commentCount
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
          <Typography
            variant='body2'
            color='textSecondary'
          >{dayjs(createdAt).fromNow()}</Typography>
          <Typography
            variant='body1'
          >{body}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Scream)
