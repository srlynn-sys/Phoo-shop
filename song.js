// songs.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkT8J7ttr9w-ZJJmbyu6aT9qLCUmauXcA",
  authDomain: "my-k-pop-shop.firebaseapp.com",
  projectId: "my-k-pop-shop",
  storageBucket: "my-k-pop-shop.firebasestorage.app",
  messagingSenderId: "697172084426",
  appId: "1:697172084426:web:6fb0b4cf2cc1f57e291633"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function initShopSongs() {
  const bubbleContainer = document.getElementById("song-bubble-container");
  if (!bubbleContainer) return;

  try {
    const querySnapshot = await getDocs(collection(db, "songs"));
    if (querySnapshot.empty) {
      bubbleContainer.innerHTML = "<p>သီချင်း မရှိသေးပါ။</p>";
      return;
    }

    bubbleContainer.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
      const song = docSnap.data();
      
      const songCard = document.createElement("div");
      songCard.className = "shop-song-item";
      songCard.innerHTML = `
        <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px;">🎵 ${song.name}</div>
        <audio controls src="${song.url}" style="width: 100%; height: 32px;"></audio>
      `;
      bubbleContainer.appendChild(songCard);
    });
  } catch (error) {
    console.error("Error loading songs:", error);
  }
}
