// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import CollectionDetails from "./components/CollectionDetails";
import Cart from "./components/Cart";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./contexts/CartContext";

const NavBar = () => {
  const { cartItems } = useCart();
  
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/600px-Zomato_logo.png"
            alt="Zomato Logo"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4 text-gray-700">
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-2xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </Link>

        <a href="#">Login</a>
        <a href="#">Signup</a>
      </div>
    </nav>
  );
};

function App() {
  const collections = [
    {
      id: 1,
      title: "Great Breakfasts",
      description: "The breakfast must have something to do with happiness...",
      image: "./breakfast.jpg",
      items: [
        { id: 1, name: "English Breakfast", price: 15.99, image: "./english-breakfast.jpg" },
        { id: 2, name: "Pancake Stack", price: 12.99, image: "./pancakes.jpg" },
        { id: 3, name: "Avocado Toast", price: 10.99, image: "./avocado-toast.jpg" }
      ]
    },
    {
      id: 2,
      title: "Afternoon Tea",
      description: "Relax with your mid-day cuppa",
      image: "./afternoon tea.jpeg",
      items: [
        { id: 4, name: "Classic Tea Set", price: 25.99, image: "./tea-set.jpg" },
        { id: 5, name: "Scones Platter", price: 18.99, image: "./scones.jpg" }
      ]
    },
    {
      id: 3,
      title: "Michelin Star Restaurants",
      description: "Dine at the best award-winning restaurants",
      image: "./Michelin Star Restaurants.jpeg",
      items: [
        { id: 6, name: "Tasting Menu", price: 150.00, image: "./tasting-menu.jpg" },
        { id: 7, name: "Wine Pairing", price: 80.00, image: "./wine-pairing.jpg" }
      ]
    },
    {
      id: 4,
      title: "Veggie Friendly",
      description: "Restaurants serving the best vegetarian fare",
      image: "./veggie-friendly.webp",
      items: [
        { id: 8, name: "Buddha Bowl", price: 16.99, image: "./buddha-bowl.jpg" },
        { id: 9, name: "Veggie Burger", price: 14.99, image: "./veggie-burger.jpg" }
      ]
    },
    {
      id: 5,
      title: "Where's The Party?",
      description: "Lets eat together",
      image: "./where is my party.jpeg",
      items: [
        { id: 10, name: "Party Platter", price: 45.99, image: "./party-platter.jpg" },
        { id: 11, name: "Drinks Package", price: 35.99, image: "./drinks.jpg" }
      ]
    },
    {
      id: 6,
      title: "Sweet Tooth Heaven",
      description: "Indulge in the city's best desserts and bakeries",
      image: "./sweet-tooth-heaven.jpg",
      items: [
        { id: 12, name: "Dessert Box", price: 28.99, image: "./dessert-box.jpg" },
        { id: 13, name: "Ice Cream Set", price: 22.99, image: "./ice-cream.jpg" }
      ]
    }
  ];

  return (
    <CartProvider>
      <Router>
        <div className="font-sans bg-gray-100 min-h-screen">
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <div
                    className="relative h-[500px] bg-cover bg-center"
                    style={{
                      backgroundImage: "url('./search zomato.avif')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/600px-Zomato_logo.png"
                        alt="Zomato Logo"
                        className="h-20 mb-8"
                      />
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Find the best restaurants, cafés, and bars in London
                      </h2>
                      <div className="flex flex-col md:flex-row gap-2 w-full max-w-2xl">
                        <select className="p-3 rounded text-black w-full md:w-1/3">
                          <option value="india">📍India</option>
                          <option value="london">📍 London</option>
                          <option value="birmingham">📍 Birmingham</option>
                          <option value="liverpool">📍 Liverpool</option>
                          <option value="leeds">📍 Leeds</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Search for restaurants or cuisines..."
                          className="p-3 rounded text-black w-full min-w-lg"
                        />
                        <button className="bg-red-500 px-6 py-3 text-white rounded">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Collections Section */}
                  <div className="py-10 px-4">
                    <div className="max-w-6xl mx-auto">
                      <div className="mb-6 text-left">
                        <h3 className="text-2xl font-semibold mb-2">Collections</h3>
                        <p className="text-sm text-gray-600">
                          Explore curated lists of top restaurants, cafés, pubs, and bars in
                          London, based on trends
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {collections.map((item) => (
                          <Link to={`/collection/${item.id}`} key={item.id}>
                            <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition">
                              <div className="flex">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-1/2 h-40 object-cover"
                                />
                                <div className="p-4 w-1/2 flex flex-col justify-center">
                                  <h4 className="text-md font-semibold">{item.title}</h4>
                                  <p className="text-sm text-gray-500">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              }
            />
            <Route
              path="/collection/:id"
              element={<CollectionDetails collections={collections} />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;