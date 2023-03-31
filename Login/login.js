const firebaseConfig = {
    apiKey: "AIzaSyB42yWk9gpE3sFe0XkeqtWNLJ73-cVg1aI",
    authDomain: "farmate-49212.firebaseapp.com",
    databaseURL: "https://farmate-49212-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "farmate-49212",
    storageBucket: "farmate-49212.appspot.com",
    messagingSenderId: "584200670850",
    appId: "1:584200670850:web:9c6caf4faa6384c50dee9b",
    measurementId: "G-G012K1CHCD"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const db = firebase.firestore();
  
  // Login form elements
  const loginForm = document.getElementById("login-form");
  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginErrorMessage = document.getElementById("login-error-message");
  
  // Registration form elements
  const registrationForm = document.getElementById("registration-form");
  const registrationName = document.getElementById("registration-name");
  const registrationEmail = document.getElementById("registration-email");
  const registrationPassword = document.getElementById("registration-password");
  const registrationConfirmPassword = document.getElementById("registration-confirm-password");
  const registrationErrorMessage = document.getElementById("registration-error-message");
  
  // Login form submit event listener
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful, redirect to home page
        window.location.href = "home.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        loginErrorMessage.innerHTML = errorMessage;
      });
  });
  
  // Registration form submit event listener
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = registrationName.value;
    const email = registrationEmail.value;
    const password = registrationPassword.value;
    const confirmPassword = registrationConfirmPassword.value;
  
    if (password !== confirmPassword) {
      registrationErrorMessage.innerHTML = "Passwords do not match.";
      return;
    }
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful, add user details to the database
        const user = userCredential.user;
        const uid = user.uid;
        db.collection("users").doc(uid).set({
          name: name,
          email: email
        })
        .then(() => {
          // User details added to the database, redirect to home page
          window.location.href = "home.html";
        })
        .catch((error) => {
          const errorMessage = error.message;
          registrationErrorMessage.innerHTML = errorMessage;
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        registrationErrorMessage.innerHTML = errorMessage;
      });
  });
  