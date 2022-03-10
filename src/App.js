import './App.css';
import React from 'react';
import Webcam from "react-webcam";
import { callCognitiveApi } from './callCognitiveApi';

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
    <div className="App">
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </div>
  );
}

export default App;
