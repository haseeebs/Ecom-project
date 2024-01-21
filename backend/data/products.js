const products = [
  {
    name: "Curology Labeled Spray Bottle",
    image: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A convenient spray bottle labeled for your skincare routine with Curology.",
    brand: "Curology",
    category: "Beauty & Personal Care",
    price: 9.99,
    countInStock: 25,
    rating: 4.5,
    numReviews: 20
  },
  {
    name: "Round Grey Hanging Decor on White Wall",
    image: "https://images.unsplash.com/photo-1474508297924-60ae8de135eb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Add a touch of elegance to your space with this round grey hanging decor.",
    brand: "HomeStyle",
    category: "Home Decor",
    price: 29.99,
    countInStock: 15,
    rating: 4.2,
    numReviews: 18
  },
  {
    name: "Shake and Shot Disposable Cup with Lid",
    image: "https://images.unsplash.com/photo-1573770012830-7cf1777db19c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Enjoy your favorite beverages on the go with this Shake and Shot disposable cup with lid.",
    brand: "SipAway",
    category: "Kitchenware",
    price: 5.99,
    countInStock: 50,
    rating: 4.0,
    numReviews: 15
  },
  {
    name: "Black Gucci Leather Shoulder Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Make a statement with this black Gucci leather shoulder bag.",
    brand: "Gucci",
    category: "Fashion",
    price: 599.99,
    countInStock: 5,
    rating: 4.9,
    numReviews: 15
  },
  {
    name: "Beverage by Boxed Water",
    image: "https://images.unsplash.com/photo-1627483262092-9f73bdf005cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stay refreshed with this eco-friendly beverage packaged in boxed water.",
    brand: "Boxed Water Co.",
    category: "Beverages",
    price: 2.99,
    countInStock: 40,
    rating: 4.3,
    numReviews: 22
  },
  {
    name: "Black and Yellow UNKs Coffee Can",
    image: "https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?q=80&w=1413&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Start your day with a kick using this black and yellow UNKs coffee can.",
    brand: "UNKs",
    category: "Coffee & Tea",
    price: 12.99,
    countInStock: 18,
    rating: 4.4,
    numReviews: 25
  },
  {
    name: "White Nike Air Force 1 Low",
    image: "https://images.unsplash.com/photo-1584590069631-1c180f90a54c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Step out in style with the iconic white Nike Air Force 1 Low sneakers.",
    brand: "Nike",
    category: "Footwear",
    price: 89.99,
    countInStock: 20,
    rating: 4.7,
    numReviews: 30
  },
  {
    name: "Stories Tulsi Tea Bag",
    image: "https://images.unsplash.com/photo-1622480914645-8fa9b36178a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Savor the soothing taste of tulsi with these Stories Tulsi Tea Bags.",
    brand: "Stories",
    category: "Tea",
    price: 7.99,
    countInStock: 35,
    rating: 4.6,
    numReviews: 15
  },
  {
    name: "Smart Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stay connected with this sleek and feature-rich smartwatch.",
    brand: "TechWear",
    category: "Electronics",
    price: 149.99,
    countInStock: 15,
    rating: 4.3,
    numReviews: 25
  },
  {
    name: "Nike Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Premium athletic shoes for optimal performance and style.",
    brand: "Nike",
    category: "Footwear",
    price: 89.99,
    countInStock: 20,
    rating: 4.6,
    numReviews: 30
  },
  {
    name: "Battle Creek Coffee",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Artisanal coffee beans for a rich and flavorful brew.",
    brand: "Battle Creek Roasters",
    category: "Beverages",
    price: 12.99,
    countInStock: 50,
    rating: 4.8,
    numReviews: 40
  },
  {
    name: "Vinta Premium Leather Bag",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Elegant and durable leather bag for the modern professional.",
    brand: "Vinta",
    category: "Fashion",
    price: 199.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 15
  },
  {
    name: "Plant Pot",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Decorate your space with this stylish and functional plant pot.",
    brand: "GreenThumb",
    category: "Home & Garden",
    price: 24.99,
    countInStock: 0,
    rating: 4.2,
    numReviews: 20
  },
  {
    name: "CocoOil Body Oil",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Nourish your skin with this luxurious and hydrating body oil.",
    brand: "CocoWellness",
    category: "Beauty",
    price: 29.99,
    countInStock: 25,
    rating: 4.7,
    numReviews: 35
  },
  {
    name: "Black Road Bike",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1422&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Hit the road with style on this sleek black road bike.",
    brand: "SpeedRider",
    category: "Sports & Outdoors",
    price: 549.99,
    countInStock: 8,
    rating: 4.8,
    numReviews: 12
  },
  {
    name: "Beverage Bottle",
    image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Keep your drinks cool on the go with this stylish beverage bottle.",
    brand: "HydraMate",
    category: "Home & Kitchen",
    price: 19.99,
    countInStock: 30,
    rating: 4.2,
    numReviews: 15
  },
  {
    name: "White Paper Roll",
    image: "https://images.unsplash.com/photo-1620987278429-ab178d6eb547?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A versatile white paper roll for all your artistic and creative needs.",
    brand: "ArtCraft",
    category: "Stationery",
    price: 9.99,
    countInStock: 50,
    rating: 4.0,
    numReviews: 10
  },
  {
    name: "Gray and Black Cordless Mouse",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Experience smooth and precise control with this ergonomic cordless mouse.",
    brand: "TechGear",
    category: "Electronics",
    price: 29.99,
    countInStock: 25,
    rating: 4.4,
    numReviews: 22
  },
  {
    name: "Red Lipstick",
    image: "https://plus.unsplash.com/premium_photo-1677541205130-51e60e937318?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Enhance your beauty with this vibrant red lipstick that lasts all day.",
    brand: "GlamBeauty",
    category: "Beauty & Personal Care",
    price: 14.99,
    countInStock: 40,
    rating: 4.7,
    numReviews: 30
  }
];

export default products;  