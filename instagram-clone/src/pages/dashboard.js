import React
, { useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";
import LoadingSpinner from "../components/loadingSpinner";

export default function Dashboard({ user: loggedInUser }) {
  if (!loggedInUser) {
    console.log("loggedInUser is undefined");
    return null; // Or your fallback component
  }
  console.log('Dashboard userId:', loggedInUser.uid);
  const { user: { activeUser, setActiveUser }, loading } = useUser(loggedInUser.uid);
  console.log('loggedInUser has userId:', loggedInUser && 'uid' in loggedInUser);
  console.log('Dashboard loading:', loading);
  useEffect(() => {
    if (activeUser && setActiveUser) {
      console.log('Dashboard context value:', { activeUser, setActiveUser });
    }
  }, [activeUser, setActiveUser]);

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={{ activeUser, setActiveUser, loading }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-2 gap-4 justify-between mx-auto max-w-screen-lg">
        {loading ? <LoadingSpinner /> : <Timeline />}
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};