import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from './firebase.config';

export const initializeLoginFramwork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            // console.log(err.message);
        })
}

export const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            var credential = result.credential;
            var user = result.user;
            var accessToken = credential.accessToken;
            console.log(user, accessToken);
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.log(errorCode, errorMessage, email, credential);
        });
}

export const handleSignOut = () => {
   return firebase.auth().signOut()
        .then(res => {
            const SignOutUser = {
                isSignedIn: false,
                name: ' ',
                email: ' ',
                photo: ' ',
                error: ' ',
                success: false
            }
            return SignOutUser
        })
        .catch(err => {
            console.log(err);
        })
}

// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//         })
//         .catch((error) => {

//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo)
//             updateUserName(user.name)
//         });
// }

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo)
//             setLoggedInUser(newUserInfo);
//             history.replace(from);
//             console.log('sign in user info', user.res);
//         })
// }

//  const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: { name }
//     })
//         .then(function () {
//             console.log('user name updated successfully');
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
