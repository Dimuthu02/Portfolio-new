// ==================== MENU ICON TOGGLE ====================
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// ==================== SCROLL SECTIONS ACTIVE LINK ====================
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document
        .querySelector("header nav a[href*=" + id + "]")
        .classList.add("active");
    }
  });

  // ==================== STICKY NAVBAR ====================
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // ==================== REMOVE MENU ICON ON SCROLL ====================
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// ==================== CLOSE MENU ON LINK CLICK ====================
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== SCROLL REVEAL ANIMATION ====================
const sr = {
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: false,
};

// Initialize scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".home-content, .home-img, .about-img, .about-content, .service-box, .project-card, .heading"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ==================== 3D TILT EFFECT ON MOUSE MOVE ====================
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".service-box, .project-card");

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    } else {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    }
  });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".home-img img, .about-img img"
  );

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ==================== TYPING ANIMATION ====================
const typingText = document.querySelector(".home-content h3:nth-child(2) span");
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    }
  }

  // Start typing animation when page loads
  setTimeout(typeWriter, 1000);
}

// ==================== CONTACT FORM VALIDATION ====================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const fullname = this.fullname.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();

    // Validation
    if (
      fullname === "" ||
      email === "" ||
      phone === "" ||
      subject === "" ||
      message === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ""))) {
      alert("Please enter a valid phone number");
      return;
    }

    // Success message
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// ==================== CURSOR TRAIL EFFECT ====================
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".cursor-circle");

// Create cursor circles if they don't exist
if (circles.length === 0 && window.innerWidth > 768) {
  for (let i = 0; i < 20; i++) {
    const circle = document.createElement("div");
    circle.className = "cursor-circle";
    circle.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(234, 88, 12, ${1 - i * 0.05});
      pointer-events: none;
      z-index: 9999;
      transition: 0.1s;
    `;
    document.body.appendChild(circle);
  }
}

const allCircles = document.querySelectorAll(".cursor-circle");

allCircles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  allCircles.forEach((circle, index) => {
    circle.style.left = x - 5 + "px";
    circle.style.top = y - 5 + "px";
    circle.style.transform = `scale(${
      (allCircles.length - index) / allCircles.length
    })`;

    circle.x = x;
    circle.y = y;

    const nextCircle = allCircles[index + 1] || allCircles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

if (window.innerWidth > 768) {
  animateCircles();
}

// ==================== DYNAMIC YEAR IN FOOTER ====================
const copyrightYear = document.querySelector(".copyright");
if (copyrightYear) {
  const currentYear = new Date().getFullYear();
  copyrightYear.textContent = `© ${currentYear} Dimuthu Karunarathna. All Rights Reserved.`;
}

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll("img[data-src]");
const imageOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px",
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
}, imageOptions);

images.forEach((img) => imageObserver.observe(img));

// ==================== PRELOADER ====================
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener("keydown", (e) => {
  // Press ESC to close mobile menu
  if (e.key === "Escape" && navbar.classList.contains("active")) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  }
});

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll(".btn, .gradient-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation to CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(20);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handler
window.onscroll = debounce(() => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      const activeLink = document.querySelector(
        "header nav a[href*=" + id + "]"
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });

  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
}, 10);

console.log("Portfolio website loaded successfully! ✨");

