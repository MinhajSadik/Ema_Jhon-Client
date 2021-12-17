import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import "./login.css";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramwork,
  signInWithEmailAndPassword,
} from "./LoginManager";

// if (!firebase.apps.length) {
// firebase.initializeApp(firebaseConfig)
// }

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    newUser: false,
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });
  initializeLoginFramwork();

  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };
  // const fbSignIn = () => {
  //   handleFbSignIn().then((res) => {
  //     handleResponse(res, true);
  //   });
  // };
  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redicrect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redicrect) {
      history.replace(from);
    }
  };

  const handleBlur = (event) => {
    let isFieldValid;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{3}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber; // javascript regexp code chack out
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div className="App">
      <br />
      <br />

      {loggedInUser.isSignedIn ? (
        <button className="signOut" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className="google" onClick={googleSignIn}>
          GOOGLE
        </button>
      )}
      <br />
      <br />

      {loggedInUser ? (
        <div>
          <p>{loggedInUser.name}</p>
          <p>{loggedInUser.email}</p>
          <img src={loggedInUser.photo} alt="" />
        </div>
      ) : (
        <div>
          <h1>Please Login</h1>
        </div>
      )}

      <h1>Manual Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            onBlur={handleBlur}
            placeholder="Enter Your Name:"
            name="name"
            type="text"
            required
          />
        )}
        <br />
        <input
          onBlur={handleBlur}
          type="text"
          name="email"
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          onBlur={handleBlur}
          type="password"
          name="password"
          placeholder="Enter Your Password"
          id=""
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}> {user.error} </p>

      {user.success && (
        <p style={{ color: "green" }}>
          {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
};

export default Login;
