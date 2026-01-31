const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close navbar when link clicked
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Dark mode toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

toggleSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Load saved theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") toggleSwitch.checked = true;
}

// Add current year
document.querySelector("#datee").textContent = new Date().getFullYear();

// Skills bar animation
const skillsSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress");

function animateSkills() {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    progressBars.forEach(bar => bar.style.width = bar.dataset.percent);
  }
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

// Contact form handling
const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    submitBtn.style.opacity = "0.6";
    statusMsg.textContent = "Sending...";
    statusMsg.style.color = "gray";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusMsg.textContent = "✅ Message sent successfully!";
        statusMsg.style.color = "green";
        contactForm.reset();
      } else {
        statusMsg.textContent = "❌ Failed to send message. Try again.";
        statusMsg.style.color = "red";
      }
    } catch (error) {
      statusMsg.textContent = "❌ Something went wrong.";
      statusMsg.style.color = "red";
    }

    submitBtn.style.opacity = "1";
  });
}

