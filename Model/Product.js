export default class Product {
    constructor(obj) {
        this.productId = obj.productId;
        this.productNumber = obj.productNumber;
        this.productName = obj.productName;
        this.imageURLs = obj.imageURLs;
        this.price = obj.price;
        this.offerPrice = obj.offerPrice;
        this.stockQuantity = obj.stockQuantity;
        this.description = obj.description;
        this.category = obj.category;
        this.color = obj.color;
        Object.defineProperty(this, "productId", { writable: false });
    }
}