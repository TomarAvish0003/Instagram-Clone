import { useEffect, useState } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserObjByUserId(userId) {
      const response = await getUserByUserId(userId);
      console.log('getUserByUserId response:', response);
      if (Array.isArray(response)) {
        console.log('Is response an array?', Array.isArray(response));
        const [user] = response;
        setActiveUser(user || {});
      } else {
        setActiveUser({});
      }
      setLoading(false);
    }

    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  console.log('useUser output:', { activeUser,setActiveUser, loading });
  return { user:{activeUser,setActiveUser}, loading };
}