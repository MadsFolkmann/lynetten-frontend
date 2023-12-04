"use strict";
import { endpoint, getAllProducts } from "./Controller/products-rest.js";
import { getAllCategories, getCategoryWithProducts } from "./Controller/category-rest.js";

import ProductRenderer from "./View/Renderer/ProductRenderer.js";
import CategoryRenderer from "./View/Renderer/CategoryRenderer.js";
import Paginater from "./View/Renderer/Paginater.js";
import ListRenderer from "./View/Renderer/ListRenderer.js";
import toggleSearchBar from "./View/Renderer/search.js";

endpoint;

let products = [];
let categories = [];

let productsLists = null;
let categoriesLists = null;

const htmlSide = window.location.pathname;

window.addEventListener("load", baddServiceApp);

async function baddServiceApp() {
  console.log("baddService loaded!");
  products = await getAllProducts();
  categories = await getAllCategories();

  console.log("number of products: " + products.length);
  console.log("number of categories: " + categories.length);

  if (htmlSide === "/products.html") {
    initializeProductViews();
  } else {
    initializeOtherHtmlViews();
  }
  toggleSearchBar();
}

function initializeOtherHtmlViews() {
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();
}

function initializeProductViews() {
  productsLists = new Paginater(products, "#products-container", ProductRenderer, 10);
  productsLists.render();

  // initialize Category Views //
  categoriesLists = new ListRenderer(categories, ".category-list", CategoryRenderer);
  categoriesLists.render();

  // initialize Products views based on Categories  //

  const categoryLinks = document.querySelectorAll(".category-list a");
  categoryLinks.forEach((categoryLink) => {
    categoryLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const categoryId = categoryLink.dataset.categoryId;

      // Brug den nye funktion til at hente kategori og produkter
      const { category, products } = await getCategoryWithProducts(categoryId);

      // Gør noget med kategori og produkter, f.eks. vis dem i konsollen
      console.log("Category:", category);
      console.log("Products for category ID", categoryId, products);

      productsLists = new ListRenderer(products, "#products-container", ProductRenderer);
      productsLists.render();
    });
  });
}

// // Add this to your existing JavaScript file or create a new one
// document.addEventListener("DOMContentLoaded", function () {
//   const discountToggle = document.getElementById("discountToggle");
//   const discountContent = document.getElementById("discountContent");

//   discountToggle.addEventListener("click", function () {
//     discountContent.style.display = discountContent.style.display === "block" ? "none" : "block";
//   });
// });

// function applyDiscount() {
//   // Add your logic to apply the discount here
//   // You can access the discount code using document.getElementById("discountCode").value
// }

// document.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dropbtn")) {
//     let dropdown = e.target.nextElementSibling;
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//   } else {
//     let openDropdowns = document.querySelectorAll(".dropdown-content");
//     openDropdowns.forEach(function (dropdown) {
//       if (dropdown.style.display === "block") {
//         dropdown.style.display = "none";
//       }
//     });
//   }
// });

// Place this script after your HTML or at the end of the body

// document.addEventListener("DOMContentLoaded", function () {
//   let navItems = document.querySelectorAll(".nav-item");

//   navItems.forEach(function (item) {
//     item.addEventListener("click", function (event) {
//       // Fjern 'active' klassen fra alle faner og tilføj den til den aktive fane
//       navItems.forEach(function (navItem) {
//         navItem.classList.remove("active");
//       });
//       item.classList.add("active");
//     });
//   });
// });

// MAP _____________________________

var myMap = L.map("interactive-map").setView([55.691046, 12.599752], 13); // Replace with your coordinates

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap contributors",
}).addTo(myMap);

// NEWSLETTER ______________________

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has already subscribed in this session
  if (!sessionStorage.getItem("subscribed")) {
    setTimeout(function () {
      document.getElementById("newsletter-popup").classList.add("show");
    }, 2000);
  }

  // Handle form submission
  document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("newsletter-form").classList.add("hidden");
    document.getElementById("subscription-message").classList.remove("hidden");

    // Set a flag in session storage
    sessionStorage.setItem("subscribed", "true");

    // Close the popup automatically after a delay
    setTimeout(function () {
      document.getElementById("newsletter-popup").classList.remove("show");
    }, 3000); // Adjust time as needed
  });

  // Close button functionality
  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("newsletter-popup").classList.remove("show");
  });
});
