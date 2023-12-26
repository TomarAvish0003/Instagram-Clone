/* eslint-disable no-unused-vars */
import React, {useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../context/user';
import {updateLoggedInUserFollowing,updateFollowedUserFollowers, getUserByUserId} from '../../services/firebase';
import FirebaseContext from '../../context/firebase';
import '../../pages/login.css';
import PropTypes from 'prop-types';
import LoggedInUserContext from '../../context/logged-in-user';


// eslint-disable-next-line react/prop-types
export default function SuggestedProfile({profileDocId,username,profileId,userId,loggedInUserDocId}) {
    const [followed,setFollowed] = useState(false);
    const {setActiveUser} = useContext(LoggedInUserContext);
    // eslint-disable-next-line no-unused-vars
    const {firebase} = useContext(FirebaseContext);

    async function handleFollowUser(){
        try {
          setFollowed(true);
      
          await updateLoggedInUserFollowing(loggedInUserDocId,profileId,false);
          await updateFollowedUserFollowers(profileDocId,userId,false);
          const [user]= await getUserByUserId(userId);
          setActiveUser(user);
        } catch (error) {
          console.error('Error in handleFollowUser:', error);
        }
      }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img className="rounded-full w-8 flex mr-3" src={`/images/avatars/${username}.jpg`} alt="" />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div className="flex">
                <button className="text-sm font-bold text-blue-medium" type="button" onClick={handleFollowUser}>Follow</button>
            </div>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
  };