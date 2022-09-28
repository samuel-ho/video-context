import React, {useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import styled from 'styled-components';
import Slide1 from "./Slide1.png";
import Slide2 from "./Slide2.png";
import Slide3 from "./Slide3.png";
import './TutorialSwiper.css';
import Button from '../../components/elements/Button/Button.js';

SwiperCore.use([Navigation, Pagination]);

const SlideContentWrapper = styled.div`
  max-width: 100%;
  .swiper-container{
    text-align: center; 
    h1{
      margin-top: 8px; 
      font-size: 20px; 
      margin-bottom: 24px; 
      line-height: 150%; 
    }
    margin: 0px 32px; 
  }
  .swiper-wrapper{
    max-width: 100%; 
    font-weight: 600; 
    margin: auto; 
    img{
      max-width: 100%; 
      margin: auto; 
      max-height: 240px; 
      margin-bottom: 56px; 
    }
    height: auto; 
  }
`

const DisabledButton = styled.button`
  float: right; 
  margin: 10px;  
  padding: 12px 19px; 
  border-radius: 35px; 
  font-weight: 600; 
  background: ${props => props.styleDisabled == 'disabled' ? 
  '#efefef !important;': 'linear-gradient(140deg,#205cf3,#2629ef);'
  }
  border: ${props => props.styleDisabled == 'disabled' ? 
    '1px solid #cccccc;': '1px solid #205cf3;'
  }
  color: ${props => props.styleDisabled == 'disabled' ? 
    '#adadad': '#fff;'
  }
`


const TutorialSwiper = ({closeModal}) => {
  const headings = ["Join a lounge to start meeting new people!", "Inside the lounge, join randomized chats", "Get to know and connect with people in chats!"];
  const screenshots = [Slide1, Slide2, Slide3];
  const slides = [];

  for (let i = 0; i < 3; i += 1) {
    slides.push(
      <SwiperSlide key={`screenshot=${i}`} tag="li">
        <h1>{headings[i]}</h1>
        <img className="screenshot" src={screenshots[i]} alt={`${screenshots[i]}`} />
      </SwiperSlide>
    );
  }

  const [isLast, setLast] = useState(false);
  return (
    <SlideContentWrapper>
    <Swiper
      showspagination={"true"}
      tag="section"
      wrapperTag="ul"
      id="main"
      navigation
      pagination
      onReachEnd={()=> setLast(true)}
    >
      {slides}
    </Swiper>
    <DisabledButton 
      disabled={isLast ? false : true}
      styleDisabled={isLast ? 'enabled' : 'disabled'}
      onClick={() => {
        closeModal()
      }}>Get Started</DisabledButton>
    </SlideContentWrapper>
  );
};

export default TutorialSwiper;
