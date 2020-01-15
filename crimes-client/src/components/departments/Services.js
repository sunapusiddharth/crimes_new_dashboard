import React, { Fragment,useState } from 'react'
import {Carousel} from 'react-bootstrap'

export default function Services() {
    const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
    return (
        <Fragment>
        <h4>Services</h4>
      <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
      <div className="w3-center">
          <h5>TITLE HEADING</h5>
          <h6>Title description, <span className="w3-opacity">May 2, 2016</span></h6>
        </div>

        <div className="w3-justify">
          <img src="/assets/blog_image.jpg" alt="Girl Hat" style={{width:"100%"}} className="w3-padding-16"/>
          <p><strong>More Hats!</strong> I am crazy about hats these days. Some text about this blog entry. Fashion fashion and mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor
            magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <p className="w3-center"><button className="w3-button w3-black" onclick="myFunction('demo1')" id="myBtn">View More</button></p>
        </div>
      </Carousel.Item>
      

      <Carousel.Item>
      <div className="w3-center">
          <h3>TITLE HEADING</h3>
          <h5>Title description, <span className="w3-opacity">May 2, 2016</span></h5>
        </div>

        <div className="w3-justify">
          <img src="/assets/blog_image.jpg" alt="Girl Hat" style={{width:"100%"}} className="w3-padding-16"/>
          <p><strong>More Hats!</strong> I am crazy about hats these days. Some text about this blog entry. Fashion fashion and mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor
            magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <p className="w3-left"><button className="w3-button w3-white w3-border" onclick="likeFunction(this)"><b><i className="fa fa-thumbs-up"></i> Like</b></button></p>
          <p className="w3-right"><button className="w3-button w3-black" onclick="myFunction('demo1')" id="myBtn"><b>Replies  </b> <span className="w3-tag w3-white">1</span></button></p>
          <p className="w3-clear"></p>
          <div className="w3-row w3-margin-bottom" id="demo1" style={{display:"none"}}>
            <hr/>
          </div>
        </div>
      </Carousel.Item>
      </Carousel>
      </Fragment>
    )
}
