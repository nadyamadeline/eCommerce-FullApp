import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Nadya",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "CLAIRE Sofa",
      category: "Furniture",
      image: "/images/img1.jpeg",
      price: 500,
      countInStock: 10,
      numReviews: 3,
      brand: "Vinotti",
      rating: 4.7,
      description: "Lovely pink blush sofa",
    },
    {
      name: "MODENA Table",
      category: "Furniture",
      image: "/images/img2.jpeg",
      price: 200,
      countInStock: 8,
      numReviews: 5,
      brand: "Cellini",
      rating: 4.7,
      description: "Aesthetic pink coffee table",
    },
    {
      name: "ERICA Table",
      category: "Furniture",
      image: "/images/img3.jpeg",
      price: 500,
      countInStock: 7,
      numReviews: 2,
      brand: "Jakomo",
      rating: 4.9,
      description: "Natural beige marble table",
    },
    {
      name: "ALENA Chair",
      category: "Furniture",
      image: "/images/img4.jpeg",
      price: 50,
      countInStock: 0,
      numReviews: 20,
      brand: "Lumiere",
      rating: 4.5,
      description: "Simple transparent chair",
    },
    {
      name: "CARRIE Plate",
      category: "Tableware",
      image: "/images/img5.jpeg",
      price: 10,
      countInStock: 25,
      numReviews: 27,
      brand: "Bellagio",
      rating: 4.3,
      description: "Blue ceramic plate with gold spots",
    },
  ],
};

export default data;
