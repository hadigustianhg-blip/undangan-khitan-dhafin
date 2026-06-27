
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const openBtn = document.getElementById("openBtn");
const page2 = document.getElementById("page2");

function updateMusicButton() {
  const isPlaying = !bgMusic.paused && !bgMusic.muted;

  musicToggle.classList.toggle("is-muted", !isPlaying);
  musicToggle.textContent = isPlaying ? "♫" : "♪";
  musicToggle.setAttribute("aria-label", isPlaying ? "Matikan musik" : "Putar musik");
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused || bgMusic.muted) {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.muted = true;
    bgMusic.pause();
  }

  updateMusicButton();
});

openBtn.addEventListener("click", () => {

    bgMusic.muted = false;
    bgMusic.play().catch(() => {});

    updateMusicButton();

    page2.scrollIntoView({
        behavior: "smooth"
    });

});

/* BINTANG JATUH SEMUA PAGE */
const snowLayers = document.querySelectorAll(".snow-layer");

function createFallStar(layer) {
  if (!layer) return;

  const star = document.createElement("span");
  star.className = "fall-star";

  const symbols = ["✦", "✧", "❅", "•"];
  star.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  star.style.left = Math.random() * 100 + "%";
  star.style.fontSize = Math.random() * 9 + 7 + "px";
  star.style.animationDuration = Math.random() * 7 + 8 + "s";
  star.style.opacity = Math.random() * 0.45 + 0.45;

  layer.appendChild(star);

  setTimeout(() => star.remove(), 16000);
}

setInterval(() => {
  snowLayers.forEach(layer => createFallStar(layer));
}, 900);

/* COUNTDOWN */
const targetDate = new Date("2026-07-02T09:30:00+07:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) return;

  document.getElementById("days").textContent =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").textContent =
    Math.floor((distance / (1000 * 60 * 60)) % 24);

  document.getElementById("minutes").textContent =
    Math.floor((distance / (1000 * 60)) % 60);

  document.getElementById("seconds").textContent =
    Math.floor((distance / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* MAPS */
function openMaps() {
  window.open("https://maps.app.goo.gl/YPSMBSuh4YGxxrW3A", "_blank");
}

/* RSVP */
function kirimRSVP() {
  const nama = document.getElementById("namaTamu").value || "-";
  const ucapan = document.getElementById("ucapan").value || "-";
  const status = document.querySelector('input[name="hadir"]:checked').value;

  const pesan =
`Assalamu'alaikum

Nama: ${nama}
Konfirmasi: ${status}
Ucapan / Doa:
${ucapan}`;

  window.open(
    "https://wa.me/6281385840031?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}

/* COPY REKENING */
function copyRekening(rekening) {
  navigator.clipboard.writeText(rekening).then(() => {
    alert("Nomor rekening berhasil disalin");
  });
}

/* UCAPAN */
const commentName = document.getElementById("commentName");
const commentMessage = document.getElementById("commentMessage");
const commentList = document.getElementById("commentList");
const commentStorageKey = "dhafinUcapan";

const dummyComments = [
  {
    name: "Keluarga Besar",
    message: "Alhamdulillah, semoga menjadi momen yang indah dan penuh doa baik untuk Dhafin.",
    time: "2 hari lalu"
  }
];

function getUcapanList() {
  return JSON.parse(localStorage.getItem(commentStorageKey) || "[]");
}

function saveUcapanList(comments) {
  localStorage.setItem(commentStorageKey, JSON.stringify(comments));
}

function renderUcapanList() {
  const comments = [...getUcapanList(), ...dummyComments];
  commentList.innerHTML = "";

  comments.forEach(comment => {
    const item = document.createElement("div");
    item.className = "comment-item";

    item.innerHTML = `
      <strong class="comment-name">${comment.name}</strong>
      <p class="comment-text">${comment.message}</p>
      <small class="comment-time">${comment.time}</small>
    `;

    commentList.appendChild(item);
  });
}

function submitUcapan() {
  const name = commentName.value.trim();
  const message = commentMessage.value.trim();

  if (!name || !message) {
    alert("Nama dan ucapan wajib diisi ya.");
    return;
  }

  const comments = getUcapanList();

  comments.unshift({
    name,
    message,
    time: new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  });

  saveUcapanList(comments.slice(0, 30));
  commentName.value = "";
  commentMessage.value = "";
  renderUcapanList();
}

renderUcapanList();

/* LIGHTBOX ZOOM */
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("open");

  setTimeout(() => {
    lightboxImg.src = "";
  }, 250);
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => observer.observe(el));

/* GALLERY CHANGE */
function changeGallery(el) {
  const mainPhoto = document.getElementById("mainGalleryPhoto");

  mainPhoto.style.opacity = "0";
  mainPhoto.style.transform = "scale(.96)";

  setTimeout(() => {
    mainPhoto.src = el.src;
    mainPhoto.style.opacity = "1";
    mainPhoto.style.transform = "scale(1)";
  }, 180);

  document.querySelectorAll(".thumb").forEach(img => {
    img.classList.remove("active");
  });

  el.classList.add("active");
}

document.getElementById("mainGalleryPhoto").addEventListener("click", function () {
  lightboxImg.src = this.src;
  lightbox.classList.add("open");
});

/* NAMA TAMU DARI LINK */
function setGuestNameFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to");

  if (guestName) {
    document.getElementById("guestName").textContent = guestName;
  }
}

setGuestNameFromUrl();