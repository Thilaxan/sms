// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD1AHXl7yv8kewYGyunxBW3xtusNrbg1ew",
    authDomain: "chat-6137d.firebaseapp.com",
    databaseURL: "https://chat-6137d-default-rtdb.firebaseio.com",
    projectId: "chat-6137d",
    storageBucket: "chat-6137d.firebasestorage.app",
    messagingSenderId: "117540174449",
    appId: "1:117540174449:web:f531ed293ecd4ad4c2b9d0",
    measurementId: "G-Y84FSTMJSJ"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Database
  const db = firebase.database();
  
  // Prompt for username
  const username = prompt("Please Tell Us Your Name");
  
  // Send message function
  function sendMessage(e) {
    e.preventDefault();
  
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // Clear the input box
    messageInput.value = "";
  
    // Auto-scroll to bottom of messages
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // Send message data to Firebase
    db.ref("messages/" + timestamp).set({
      username: username,
      message: message,
      timestamp: timestamp,
    });
  }
  
  // Listen for form submission
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // Fetch chat messages
  const fetchChat = db.ref("messages/");
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    document.getElementById("messages").innerHTML += message;
  });
  