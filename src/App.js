import './App.css';
import React, { useState } from 'react';
import Webcam from "react-webcam";
import { callCognitiveApi } from './callCognitiveApi';
import Graph from './Graph';
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
};

function App() {
  const [imgSrc, setImgSrc] = React.useState(null);
  const webcamRef = React.useRef(null);  

  const b64toBlob = (b64DataStr, contentType , sliceSize = 512) => {
    const byteCharacters = atob(b64DataStr);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };
  const capture = React.useCallback(
    () => {
      // const imageSrc = webcamRef.current.getScreenshot();
      // setImgSrc(imageSrc);
      const base64Str = webcamRef.current.getScreenshot() || '';
      setImgSrc(base64Str);
      const s = base64Str.split(',');
      const blob = b64toBlob(s[1]);
      callCognitiveApi(blob);      
    },
    [webcamRef]
  );

  return (

  <div class="flex flex-col h-screen">
    <div class="flex flex-row h-1/2">
        <div class="basis-1/2 border-2">
          <div class="flex flex-col justify-center items-center py-8 px-8 rounded-lg">
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
              style={{borderRadius:"10px"}}
            />
          <button>start</button>
        </div>
      </div>
      <div class="basis-1/2 border-2">
        02
      </div>
    </div>
    <div class="flex flex-row h-1/2">
      
          <Graph/>
      
      <div class="basis-1/2 border-2">
        04
      </div>
    </div>
  </div>
  );
}

export default App;
