import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Rice from "../images/itemData/Rice.jpeg"
import Shampoo from "../images/itemData/Shampoo.jpeg"
import Potato from "../images/itemData/Potato.jpeg"
import Soap from "../images/itemData/Soap.jpeg"
import Tomato from "../images/itemData/Tomato.jpeg"
import Wheat from "../images/itemData/Wheat.jpeg"
import Carrot from "../images/itemData/Carrot.webp"
import Capsicum from "../images/itemData/capsicum-green.webp"
import Burger from "../images/items/Burger.avif"
import Biryani from "../images/items/Biryani_2.avif"
import Cakes from "../images/items/Cakes.avif"
import Tea from "../images/items/Tea.avif"
import Dosa from "../images/items/Dosa.avif"
import Khichdi from "../images/items/Khichdi.avif"
import Lassi from "../images/items/Lassi.avif"
import Noodles from "../images/items/Noodles.avif"
import Paratha from "../images/items/Paratha.avif"
import Pavbhaji from "../images/items/Pav_Bhaji.avif"
import Poori from "../images/items/Poori.avif"
import Salad from "../images/items/Salad.avif"
import Shakes from "../images/items/Pizza.avif"
import Vada from "../images/items/Vada.avif"
import Thepla from "../images/items/Thepla.avif"

const images = [

    // {
    //     img: Rice,
    //     name: "Rice"
    // },
    // {
    //     img: Soap,
    //     name: "Soap"
    // },
    // {
    //     img: Shampoo,
    //     name: "Shampoo"
    // },
    // {
    //     img: Wheat,
    //     name: "Wheat"
    // },
    // {
    //     img: Tomato,
    //     name: "Tomato"
    // },
    // {
    //     img: Potato,
    //     name: "Potato"
    // },
    {
        img: Carrot,
        name: "Carrot"
    },
    {
        img: Capsicum,
        name: "Capsicum"
    },
    {
        img: Carrot,
        name: "Carrot"
    },
    {
        img: Capsicum,
        name: "Capsicum"
    },
    {
        img: Carrot,
        name: "Carrot"
    },
    {
        img: Capsicum,
        name: "Capsicum"
    },
    {
        img: Carrot,
        name: "Carrot"
    },
    {
        img: Capsicum,
        name: "Capsicum"
    },
];

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const SliderComponent = () => {
  return (
    <>
    <h1 style={{display: "flex", justifyContent: "center", alignItems: "center", fontSize: "40px", marginTop: "50px", color: "#0e6f3a"}}>What's on your mind?</h1>
    <div style={{marginTop: "50px", cursor: "pointer", border: "none", outline: "none"}}>
    <Slider {...settings} >
      {images.map((image, index) => (
        <div key={index} >
          <img src={image.img} alt={`Slide ${index}`} width={200} style={{borderRadius: "50%"}} />
        </div>
      ))}
    </Slider>
    </div>
    </>
  );
};

export default SliderComponent;
