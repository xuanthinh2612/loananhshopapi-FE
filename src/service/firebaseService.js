import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STOREAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const uploadImage = async (file, targetFolderName, ...rest) => {
  const app = initializeApp(firebaseConfig);
  const [setProgress] = [...rest];

  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(
    storage,
    `${targetFolderName}/` + Math.floor(Math.random() * 999999999999)
  );

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Return a promise that resolves with the download URL once the upload is complete
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            // console.log("Upload is paused");
            break;
          case "running":
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject(
              new Error("User doesn't have permission to access the object")
            );
            break;
          case "storage/canceled":
            // User canceled the upload
            reject(new Error("User canceled the upload"));
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            reject(new Error("Unknown error occurred"));
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        try {
          const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });

  // Pause the upload
  // uploadTask.pause();

  // Resume the upload
  // uploadTask.resume();

  // Cancel the upload
  // uploadTask.cancel();
  // [END storage_manage_uploads_modular]
  // };
};
