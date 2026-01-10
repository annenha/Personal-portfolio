'use strict';

/*==================== ELEMENT TOGGLE FUNCTION ====================*/
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

/*==================== LIGHT/DARK MODE ====================*/
const toggleBtn = document.getElementById("toggleBtn");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/*==================== SIDEBAR TOGGLE ====================*/
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => { elementToggleFunc(sidebar); });


/*==================== OVERLAY ====================*/
const overlay = document.querySelector("[data-overlay]");

/*==================== PORTFOLIO MODALS ====================*/
const modals = document.querySelectorAll(".modal");
const modalCloseBtns = document.querySelectorAll(".modal .close");

/* ... 
// Åpne modal
document.querySelectorAll(".project-item a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const modalId = this.getAttribute("href").substring(1);
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
    overlay.classList.add("active");
  });
});


  
// Lukk modal
modalCloseBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    this.closest(".modal").classList.remove("active");
    overlay.classList.remove("active");
  });
});

*/


// Åpne modal via event delegation
document.querySelector(".project-list").addEventListener("click", function(e) {
  const link = e.target.closest("a");
  if (!link) return; // ikke klikk på noe annet
  e.preventDefault();
  const modalId = link.getAttribute("href").substring(1);
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
  overlay.classList.add("active");
});


/*==================== TESTIMONIALS MODAL ====================*/
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Toggle testimonials modal
const toggleTestimonialsModal = function() {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// Åpne testimonials modal
testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    toggleTestimonialsModal();
  });
});

// Lukk testimonials modal
modalCloseBtn.addEventListener("click", toggleTestimonialsModal);

/*==================== OVERLAY LUKKER ALT ====================*/
overlay.addEventListener("click", function() {
  modals.forEach(modal => modal.classList.remove("active"));
  if (modalContainer) modalContainer.classList.remove("active");
  this.classList.remove("active");
});

/*==================== CUSTOM SELECT / FILTER ====================*/
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => { elementToggleFunc(select); });

// Funksjon for å filtrere prosjekter (case-insensitive)
const filterFunc = function(selectedValue) {
  selectedValue = selectedValue.toLowerCase();
  filterItems.forEach(item => {
    const categories = item.dataset.category
      .split(",")
      .map(cat => cat.trim().toLowerCase());
    if (selectedValue === "all" || categories.includes(selectedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Select item click
selectItems.forEach(item => {
  item.addEventListener("click", function() {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter button click
let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function() {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/*==================== CONTACT FORM VALIDATION ====================*/
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

/*==================== PAGE NAVIGATION ====================*/
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link, i) => {
  link.addEventListener("click", function() {
    pages.forEach((page, j) => {
      if (link.innerHTML.toLowerCase() === page.dataset.page.toLowerCase()) {
        page.classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    });
  });
});
