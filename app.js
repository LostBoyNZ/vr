// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSY2qu2GhFTTJf_285skOYay9Xxdp6RZ8",
  authDomain: "vr-rental.firebaseapp.com",
  databaseURL: "https://vr-rental.firebaseio.com",
  projectId: "vr-rental",
  storageBucket: "vr-rental.appspot.com",
  messagingSenderId: "972272818616",
  appId: "1:972272818616:web:97b5ca28eebcba7ba4574d",
  measurementId: "G-3BEBTGP0TN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var firestore = firebase.firestore();
const docRef = firestore.doc("samples/sandwichData");
const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton")

saveButton.addEventListener("click", function() {
  const textToSave = inputTextField.value;
  console.log("I am going to save " + textToSave + " to Firestore");
  docRef.set({
    hotDogStatus: textToSave
  }).then(function() {
    console.log("Status saved!");
  }).catch(function (error) {
    console.log("Got an error: ", error);
  });
})
