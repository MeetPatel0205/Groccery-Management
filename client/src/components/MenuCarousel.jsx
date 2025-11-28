import React, { useEffect, useState } from "react";
import demo1 from "../images/demo1.jpeg";
import demo2 from "../images/demo2.jpeg";
import demo3 from "../images/demo3.jpg";
import { useCart, useDispatchCart } from "./ContextReducer";
import toast from "react-hot-toast";

const MenuCarousel = () => {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState([]);
  const [price, setPrice] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [menuData, setmenuData] = useState([]);

  const data = useCart();
  const dispatch = useDispatchCart();

  const foodData = async () => {
    let response = await fetch("http://localhost:5000/api/showmenu", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const jsonRes = await response.json();

    // console.log(jsonRes.data);

    setMenuItems(jsonRes.data);
    setmenuData(jsonRes.data);
  };

  const foodCategory = async () => {
    let response = await fetch("http://localhost:5000/api/showcategory", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const jsonRes = await response.json();

    // console.log(jsonRes.data);

    setCategory(jsonRes.data);
  };

  const handleSectionChange = (section) => {
    if (section == "") {
      setMenuItems(menuData);
      setMenuOpen(false);
      setQuantities([]);
    } else {
      console.log(section);
      console.log(menuData);
      setMenuItems(menuData.filter((item) => item.FoodCategory === section));
      setMenuOpen(false);
      setQuantities([]);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const increaseQuantity = (index, foodPrice, maxQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];

      if ((updatedQuantities[index] || 1) < maxQuantity) {
        updatedQuantities[index] = (updatedQuantities[index] || 1) + 1;

        setPrice((previousPrice) => {
          const updatedPrice = [...previousPrice];
          updatedPrice[index] = updatedQuantities[index] * foodPrice;
          return updatedPrice;
        });
      } else {
        toast.error("Maximum quantity reached");
      }
      return updatedQuantities;
    });
  };

  const decreaseQuantity = (index, foodPrice) => {
    if (quantities[index] > 1) {
      setQuantities((prevQuantities) => {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[index] = updatedQuantities[index] - 1;
        // console.log(updatedQuantities);

        setPrice((previousPrice) => {
          const updatedPrice = [...previousPrice];
          updatedPrice[index] = (updatedQuantities[index] || 1) * foodPrice;
          return updatedPrice;
        });
        return updatedQuantities;
      });
    }
  };

  const handleAddToCart = async (item, quantities, price) => {
    // console.log(item);
    // console.log(quantities);
    // console.log(price);

    let food = [];

    for (let menuItem of data) {
      if (menuItem.id == item._id) {
        food = item;
      }
    }

    if (food.length != 0) {
      await dispatch({
        type: "UPDATE",
        id: item._id,
        price: price,
        qty: quantities,
      });

      toast.success("Cart Updated");
    } else {
      await dispatch({
        type: "ADD",
        id: item._id,
        name: item.FoodName.charAt(0).toUpperCase() + item.FoodName.slice(1),
        img: item.image,
        price: price,
        qty: quantities,
      });

      toast.success("Added To Cart");
    }
  };

  console.log(menuItems);

  useEffect(() => {
    foodData();
    foodCategory();
  }, []);

  return (
    <>
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-times"></i>
        </button>
        <div className="menu-options">
          <button onClick={() => handleSectionChange("")}>All</button>

          {category.map((item) => (
            <button
              key={item._id}
              onClick={() => handleSectionChange(item.CategoryName)}
            >
              {item.CategoryName}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`hamburger-menu ${menuOpen ? "close" : ""}`}
        onClick={toggleMenu}
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="main-menu">
        {/* <div className="header-text">
          <h5>Home -&gt; Menu</h5>
        </div> */}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className=" carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center ">
                <input
                  className="input-form"
                  type="search"
                  placeholder="What's on your mind ?"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #ccc",
                    color: "#fff",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={demo1}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={demo2}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={demo3}
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="menuitems row d-flex justify-content-center my-3 category-btn">
          {menuItems
            .filter(
              (data) =>
                data.FoodStatus === "Available" &&
                data.Quantities > 0 &&
                data.FoodName.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div key={item._id} className="col-12 col-md-6 col-lg-3">
                <div className="card mb-3">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.FoodName}
                    width={"auto"}
                    height={"180px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.FoodName.charAt(0).toUpperCase() +
                        item.FoodName.slice(1)}
                    </h5>
                    <div className="quantity-selector">
                      <button
                        onClick={() => decreaseQuantity(index, item.FoodPrice)}
                      >
                        -
                      </button>
                      <span>{quantities[index] || 1}</span>
                      <button
                        onClick={() =>
                          increaseQuantity(
                            index,
                            item.FoodPrice,
                            item.Quantities
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="card-price">
                      ₹{price[index] || item.FoodPrice}
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        handleAddToCart(
                          item,
                          quantities[index] || 1,
                          price[index] || item.FoodPrice
                        );
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MenuCarousel;
