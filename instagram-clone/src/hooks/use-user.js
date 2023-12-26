import { useState, useEffect } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState();


  useEffect(() => {
    async function getUserObjByUserId(userId) {
      console.log('Calling getUserByUserId with userId:', userId);
      const response = await getUserByUserId(userId);
      if (Array.isArray(response)) {
        const [user] = response;
        console.log('Fetched user:', user);
        setActiveUser(user || {});
      } else {
        console.log('No user found with userId:', userId);
        setActiveUser({});
      }
    }

    if (userId) {
      console.log('Calling getUserObjByUserId with userId:', userId);
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser, setActiveUser };
}