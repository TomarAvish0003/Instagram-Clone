import React from "react";
import { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
import LoggedInUserContext from '../../context/logged-in-user';

export default function Sidebar() {
  const loggedInUserContext = useContext(LoggedInUserContext);
  console.log('loggedInUserContext:', loggedInUserContext);
  if (!loggedInUserContext) {
    // Render a fallback component, return null, or throw an error
    return null;
  }

  const { activeUser: { docId = '', fullName, username, userId, following } = {} } = loggedInUserContext;
  console.log('Sidebar props:', { userId, following, docId });
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
  );
}