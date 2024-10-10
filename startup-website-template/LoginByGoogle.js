import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

// Get the Google login button element
const googleLogin = document.getElementById("google-login-btn1");

if (googleLogin) {
  googleLogin.addEventListener("click", async function () {
    event.preventDefault(); // Prevent default anchor behavior
    debugger;
    try {
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info.
      const user = result.user;

      // Extract user details
      const { uid, displayName, email, photoURL } = user;
      const [firstName, lastName] = displayName
        ? displayName.split(" ")
        : ["", ""];

      // Save user details to localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid,
          displayName,
          email,
          photoURL,
        })
      );

      // Prepare user data for API request
      const userData = {
        Email: email,
        Password: uid, // using uid as password
      };

      // Send user data to the API
      const response = await fetch(
        "https://localhost:7072/api/User/LOGIN",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData), // Send form-urlencoded data
        }
      );

      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle API response
      const data = await response.json();
console.log(data);
      // Store token and user ID from the API
      localStorage.setItem("Token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.messeges = JSON.stringify([
        {
          title: "Login Successful",
          message: "You have been logged in successfully",
        },
      ]);

  
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have been logged in successfully. Redirecting...",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        // Redirect to a new page (e.g., home page after login)
        window.location.href = "index.html";
      });
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Login Error!",
        text: "Error during login. Please try again.",
        confirmButtonText: "OK"
      });
      console.error("Error during login or API request:", error);
    }
  });
} else {
  console.error("Google login button not found");
}