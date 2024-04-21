import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons"
const Carousel = ({imageArray}) => {
    const [imageIndex, setImageIndex]=useState(0);
  return (
    <div className="images">
    <div id="images-div">
      {imageArray.map(image=>{
          return(
            <img src={image} alt="Images" key={image} style={{translate:`${-100*imageIndex}%`}}/>
          )
        })}
    </div>
    <button id="left-button" onClick={()=>{
      setImageIndex((index)=>{
        if(index==0) return imageArray.length-1;
        return index-1;
      })
    }}>
      <FontAwesomeIcon icon={faArrowLeft} id="left-arrow"/>
    </button>
    <button id="right-button" onClick={()=>{
      setImageIndex((index)=>{
        if(index==imageArray.length-1) return 0;
        return index+1;
      })
    }}>
      <FontAwesomeIcon icon={faArrowRight} id="right-arrow"/>
    </button>
  </div>
  )
}
export default Carousel