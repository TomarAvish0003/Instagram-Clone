import { getFirestore, collection, doc, getDoc } from "firebase/firestore";


export async function doesUsernameExist(username) {
    try {
        const firestore = getFirestore(); // Get the Firestore instance
        const userRef = doc(collection(firestore, "users"), username); // Create a document reference
        const userDocSnap = await getDoc(userRef); // Get the document snapshot
        return userDocSnap.exists(); // Check if the document exists
      } catch (error) {
        console.error('Error checking username existence:', error);
        throw error; // Re-throw the error to be handled by the caller
      }
  }