import { Link } from "react-router-dom"
import { useState } from "react"
import Carousel from "./Carousel";
const Main = () => {
  const [imageArray, setImageArray]=useState(["/img-3.jpg", "/img-4.jpg", "/img-2.jpg","/img-1.jpg"]);

  return (
    <div id='main'>
      <div className="text">
        <h1>Find your next<span style={{color:'rgb(100, 116, 139)'}}> perfect </span>place with ease</h1>
        <p>Sahand Estate will help you find your home fast, easy and comfortable.Our expert support are always available.</p>
        <Link to='/search'>Let's start now....</Link>
      </div>
      <Carousel  imageArray={imageArray}/>
    </div>
  )
}
export default Main