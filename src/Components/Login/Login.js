import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import firebaseConfig from "../../configs/firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

// firebase.initializeApp(firebaseConfig);
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(0);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  ////////////////////// Google auth provider
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  ////////////////////////// Sign in with popup.
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => console.log(err.message));
  };

  ////////////////////////////////// sign out
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const userSignOut = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(userSignOut);
        setLoggedInUser(userSignOut);
      })
      .catch((error) => {});
  };

  ///////////// function to act when writing on form
  const handleBlur = (event) => {
    let isFieldValid = true;

    console.log(event.target.name, event.target.value);
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (event.target.name === "password") {
      isFieldValid =
        event.target.value.length > 6 &&
        /[a-z]/i.test(event.target.value) &&
        /[0-9]/.test(event.target.value);
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  ///////////// Submitting form to google.
  const handleOnSubmit = (event) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          console.log("sign in with user info", res.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user name updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      {user.isSignedIn ? (
        <button className="btn btn-warning" onClick={handleSignOut}>
          Sign Out from google
        </button>
      ) : (
        <button className="btn btn-warning" onClick={handleSignIn}>
          Continue with google
        </button>
      )}
      <br />
      {user.isSignedIn && (
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <br />
      <h1>Our Own Authentication</h1>
      <br />
      <input
        type="checkbox"
        onClick={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New user sign up</label>

      <form onSubmit={handleOnSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeHolder="Your name."
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="your email"
          required
        />
        <br />
        <input
          className="m-2"
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="your password"
          required
        />
        <br />
        <input
          className="btn btn-success m-2"
          type="submit"
          value={newUser ? "Sign up" : "Sign In"}
        />
      </form>
      <br />
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} successfully.
        </p>
      )}
    </div>
  );
}

export default Login;
