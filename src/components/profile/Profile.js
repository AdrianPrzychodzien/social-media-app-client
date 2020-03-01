import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'

import MyButton from '../../util/MyButton'
import ProfileSkeleton from '../../util/ProfileSkeleton'

import {
  Button,
  Link as MuiLink,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core'

import {
  CalendarToday,
  Edit as EditIcon,
  KeyboardReturn,
  Link as LinkIcon,
  LocationOn
} from '@material-ui/icons'

import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'

const styles = theme => ({
  ...theme.profile,
  ...theme.separators
})

const Profile = ({
  classes,
  uploadImage, logoutUser,
  user: {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated
  }
}) => {
  const handleImageChange = e => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    uploadImage(formData)
  }

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }

  const handleLogout = () => {
    logoutUser()
  }

  let profileMarkup = !loading ? (authenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />
          <MyButton
            tip="Edit profile picture"
            onClick={handleEditPicture}
            btnClassName="button" >
            <EditIcon color="primary" />
          </MyButton>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {' '}{website}
              </a>
              <hr />
            </>
          )}
          <CalendarToday color="primary" />{' '}
          <span>Joined {dayjs(createdAt).format('MM YYYY')}</span>
        </div>
        <MyButton tip="Logout" onClick={handleLogout}>
          <KeyboardReturn color="primary" />
        </MyButton>
        <EditDetails />
      </div>
    </Paper>
  ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/login">
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/signup">
            Signup
          </Button>
        </div>
      </Paper>
    )) : (<ProfileSkeleton />)

  return profileMarkup
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
