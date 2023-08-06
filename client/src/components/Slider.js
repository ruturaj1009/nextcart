import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
    height: '150px',
    width: '100%'
  };

const Slider = () => {
  return (
    <>
      <Carousel autoplay effect="fade">
    <div>
      <img style={contentStyle} src='/images/banner.png' />
    </div>
    <div>
      <img style={contentStyle} src='/images/banner.png' />
    </div>
    <div>
      <img style={contentStyle} src='/images/banner.png' />
    </div>
    <div>
      <img style={contentStyle} src='/images/banner.png' /> 
    </div>
    </Carousel>
    </>
  )
}

export default Slider;
