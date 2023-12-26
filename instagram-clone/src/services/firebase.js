import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { FieldValue } from "firebase/firestore";

export async function checkDocument(collectionName, docId) {
  try {
    const db = getFirestore();
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

export async function doesUsernameExist(username) {
  try {
    const db = getFirestore(); // Get the Firestore instance
    const userRef = doc(collection(db, "users"), username); // Create a document reference
    const userDocSnap = await getDoc(userRef); // Get the document snapshot
    return userDocSnap.exists(); // Check if the document exists
  } catch (error) {
    console.error("Error checking username existence:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function getUserByUserId(userId) {
  try {
    console.log("Getting user by user ID:", userId); // Log the userId
    const db = getFirestore();
    const userDocSnap = await getDoc(doc(db, "users", userId));

    if (userDocSnap.exists()) {
      const userData = { ...userDocSnap.data(), docId: userDocSnap.id };
      console.log("Fetched user data:", userData); // Log the user data
      return [userData];
    }
  } catch (error) {
    console.error("Error getting user by user ID:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function getSuggestedProfiles(userId, following) {
  const db = getFirestore();
  let userQuery;
  if (following.length > 0) {
    userQuery = query(
      collection(db, "users"),
      where("userId", "not-in", [...following, userId])
    );
  } else {
    userQuery = query(collection(db, "users"), where("userId", "!=", userId));
  }

  const userQuerySnapshot = await getDocs(userQuery);
  console.log("userQuerySnapshot:", userQuerySnapshot);

  const suggestedProfiles = userQuerySnapshot.docs.map((docSnap) => ({
    ...docSnap.data(),
    docId: docSnap.id,
  }));
  console.log('Suggested Profiles:', suggestedProfiles); 
  return suggestedProfiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const db = getFirestore();
  try {
    await updateDoc(doc(collection(db, "users"), loggedInUserDocId), {
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
  } catch (error) {
    console.error("Error updating following list:", error);
  }
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  try {
    const db = getFirestore();
    await updateDoc(doc(db, "users", profileDocId), {
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
  } catch (error) {
    console.error("Error updating followers list:", error);
  }
}
