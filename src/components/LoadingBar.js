import React, { useState, useEffect } from 'react';

const LoadingBar = (props) => {
  const {progress} = props

//   useEffect(() => {
//     // Simulating loading progress with a timer
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return prevProgress + 10;
//       });
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return (
    <div className="loading-bar">
		<h1>progress</h1>
    	<div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default LoadingBar;