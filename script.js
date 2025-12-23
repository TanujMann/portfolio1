function openResume(){
  document.getElementById("resumeModal").style.display = "flex";
}

function closeResume(){
  document.getElementById("resumeModal").style.display = "none";
}



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkJ_vWxWNVIhbjpb7dI6TpKXWb-sExn7s",
  authDomain: "tanuj-portfolio-655ac.firebaseapp.com",
  projectId: "tanuj-portfolio-655ac",
  storageBucket: "tanuj-portfolio-655ac.firebasestorage.app",
  messagingSenderId: "867101386902",
  appId: "1:867101386902:web:2aaefd94f1f653f5507ab7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("contactForm");
const popup = document.getElementById("thankyouPopup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const phoneValue = document.getElementById("phone").value;
  const messageValue = document.getElementById("message").value;

  try {
    await addDoc(collection(db, "messages"), {
      name: nameValue,
      email: emailValue,
      phone: phoneValue,
      message: messageValue,
      createdAt: new Date()
    });

    popup.style.display = "flex";
    form.reset();

  } catch (error) {
    console.error("Firestore error:", error);
    alert("Error sending message");
  }
});
window.closePopup = function () {
  popup.style.display = "none";

  // smooth scroll to home
  document.getElementById("home").scrollIntoView({
    behavior: "smooth"
  });
};
window.openProject = function(id){
  const modal = document.getElementById("projectModal");
  const img = document.getElementById("projectModalImg");
  const title = document.getElementById("projectModalTitle");
  const desc = document.getElementById("projectModalDesc");
  const github = document.getElementById("projectGithub");
  const live = document.getElementById("projectLive");

  const projects = {
    1: {
      img: "zom.jpg",
      title: "Zomato Sales Dashboard",
      desc: "Interactive Power BI dashboard analyzing Sales and Growth metrics.",
      github: "https://github.com/TanujMann/Zomato-Dashboard",
      live: "https://app.powerbi.com/groups/me/reports/5445b57f-8c27-4e60-839c-f1a7d1e20638/51b3419bdb5b91c797d3?experience=power-bi"
    },
    2: {
      img: "images/projects/health.png",
      title: "Health & Fitness Dashboard",
      desc: "Interactive Power BI dashboard analyzing lifestyle and health metrics.",
      github: "#",
      live: "#"
    },
    3: {
      img: "images/projects/chatbot.png",
      title: "Order Tracking AI Bot",
      desc: "AI-powered chatbot for tracking orders with real-time responses.",
      github: "#",
      live: "#"
    }
  };

  img.src = projects[id].img;
  title.innerText = projects[id].title;
  desc.innerText = projects[id].desc;
  github.href = projects[id].github;
  live.href = projects[id].live;

  modal.style.display = "flex";
};

window.closeProject = function(){
  document.getElementById("projectModal").style.display = "none";
};

particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#b44cff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#b44cff",
      opacity: 0.25,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.2
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: { opacity: 0.6 }
      }
    }
  },
  retina_detect: true
});

import { doc, getDoc, updateDoc, increment } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const resumeBtn = document.getElementById("resumeBtn");
const badge = document.getElementById("downloadCount");
const tooltip = document.getElementById("resumeTooltip");

let resumeLocked = false;

// 🔥 Fetch count on page load
async function loadResumeCount() {
  const ref = doc(db, "resume_stats", "count");
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const count = snap.data().downloads;
    badge.innerText = count;
    tooltip.innerText = `Downloaded ${count} times`;
  }
}

loadResumeCount();

// 🔥 Track download + prevent spam
window.trackResume = async function (e) {
  if (resumeLocked) {
    e.preventDefault();
    return;
  }

  resumeLocked = true;
  resumeBtn.style.opacity = "0.6";

  const ref = doc(db, "resume_stats", "count");
  await updateDoc(ref, {
    downloads: increment(1)
  });

  setTimeout(() => {
    resumeLocked = false;
    resumeBtn.style.opacity = "1";
    loadResumeCount();
  }, 3000); // ⏱ 3s cooldown
};
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width =
    progress + "%";
});

document.querySelectorAll("a, button").forEach(el=>{
  el.addEventListener("click",()=>{
    const sound = document.getElementById("clickSound");
    if(!sound) return;
    sound.volume = 0.15;
    sound.currentTime = 0;
    sound.play();
  });
});
let typedKeys = "";

window.addEventListener("keydown", (e) => {
  // Ignore modifier keys
  if (e.key.length > 1) return;

  typedKeys += e.key.toLowerCase().replace(" ", "");

  if (typedKeys.endsWith("ml")) {
    const egg = document.getElementById("easter-egg");
    if (!egg) return;

    egg.classList.add("show");

    setTimeout(() => {
      egg.classList.remove("show");
    }, 3000);

    typedKeys = "";
  }

  // prevent memory overflow
  if (typedKeys.length > 5) typedKeys = "";
});
document.addEventListener("DOMContentLoaded", () => {
  const profileImages = [
    "profile.jpg",
    "profile1.jpg"
  ];

  let currentProfile = 0;
  const profileImg = document.getElementById("profileImage");
  let isHovering = false;

  if (!profileImg) return;

  profileImg.addEventListener("mouseenter", () => isHovering = true);
  profileImg.addEventListener("mouseleave", () => isHovering = false);

  setInterval(() => {
    if (isHovering) return;

    profileImg.style.opacity = 0;

    setTimeout(() => {
      currentProfile++;

      if (currentProfile >= profileImages.length) {
        currentProfile = 0;
      }

      profileImg.src = profileImages[currentProfile];
      profileImg.style.opacity = 1;
    }, 800);
  }, 10000);
});

