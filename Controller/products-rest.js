import Product from "../Model/Product.js";

const endpoint = "http://localhost:4444";

let allProducts = [];
let lastFetch = 0;

async function getAllProducts() {
  const now = Date.now();
  const timeSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if (timeSinceLastFetch > 10_000) {
    await refetchAllProducts();
  }
  return allProducts;
}

async function getSomeProducts(limit, offset) {
  const response = await fetch(`${endpoint}/products?pageNum=${offset}&pageSize=${limit}`);
  const originalJson = await response.json();

  return originalJson.map((jsonObj) => new Product(jsonObj));
}

async function refetchAllProducts() {
  const response = await fetch(`${endpoint}/products`);
  const originalJson = await response.json();
  allProducts = originalJson.map((jsonObj) => new Product(jsonObj));

  lastFetch = Date.now();
}

export { getAllProducts, getSomeProducts, endpoint };
