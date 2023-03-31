const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const db = firebase.firestore();
      db.collection("users").doc(user.uid).set({
          name: name,
          email: email,
          password: password
      })
      .then(() => {
          console.log("Document successfully written!");
          window.location.href = "http://localhost:5500/Login/login.html";
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
