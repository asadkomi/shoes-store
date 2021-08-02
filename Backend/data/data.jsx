import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "jane@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Js",
      slug: "j-s",
      category: "Sport Shoes",
      image: "/images/shoe1.jpg",
      isFeatured: true,
      featuredImage: "/images/banner1.jpeg",
      price: 120,
      brand: "Nike",
      rating: 3.5,
      reviews: 10,
      inStock: 30,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy  galley",
    },
    {
      name: "Js",
      slug: "j-s8",
      category: "Sport Shoes",
      image: "/images/shoe2.jpg",
      isFeatured: true,
      featuredImage: "/images/banner2.jpeg",
      price: 120,
      brand: "Nike",
      rating: 4.5,
      reviews: 10,
      inStock: 30,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy  galley",
    },
    {
      name: "Women Heels",
      slug: "women-heels",
      category: "Casual Shoes",
      image: "/images/shoe3.jpg",
      price: 120,
      brand: "Nike",
      rating: 5,
      reviews: 10,
      inStock: 30,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy  galley",
    },
    {
      name: "Js",
      slug: "j-s9",
      category: "Sport Shoes",
      image: "/images/shoe4.jpg",
      price: 120,
      brand: "Nike",
      rating: 2.5,
      reviews: 10,
      inStock: 30,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy  galley",
    },
    {
      name: "All Stars",
      slug: "all-stars",
      category: "Casual Shoes",
      image: "/images/shoe5.jpg",
      price: 120,
      brand: "Convers",
      rating: 5,
      reviews: 10,
      inStock: 30,
      description:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy  galley",
    },
  ],
};

export default data;
