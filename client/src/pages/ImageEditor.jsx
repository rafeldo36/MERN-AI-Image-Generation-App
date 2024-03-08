import React, { useState, useEffect } from 'react';

const ImageEditor = ({ generatedImage, updatedEditedImage }) => {
  const [editedImage, setEditedImage] = useState(generatedImage);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [blur, setBlur] = useState(0);
  const [hue, setHue] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const [sepia, setSepia] = useState(0);
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = generatedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${isGrayscale ? 1 : 0}) blur(${blur}px) hue-rotate(${hue}deg) invert(${isInverted ? 1 : 0}) sepia(${sepia}%) opacity(${opacity}%)`;
      context.drawImage(img, 0, 0, img.width, img.height);
      setEditedImage(canvas.toDataURL());
    };
  }, [generatedImage, brightness, contrast, saturation, isGrayscale, blur, hue, isInverted, sepia, opacity]);

  const handleHueChange = (event) => {
    setHue(event.target.value);
  };

  const toggleInvert = () => {
    setIsInverted(!isInverted);
  };

  const handleSepiaChange = (event) => {
    setSepia(event.target.value);
  };

  const handleOpacityChange = (event) => {
    setOpacity(event.target.value);
  };

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleContrastChange = (event) => {
    setContrast(event.target.value);
  };

  const handleSaturationChange = (event) => {
    setSaturation(event.target.value);
  };

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
  };

  const handleBlurChange = (event) => {
    setBlur(event.target.value);
  };

  const resetImage = () => {
    setEditedImage(generatedImage);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setIsGrayscale(false);
    setBlur(0);
    setHue(0);
    setIsInverted(false);
    setSepia(0);
    setOpacity(100);
  };

  const handleSaveImage = () => {
    updatedEditedImage(editedImage);
  };

  return (
    <div>
      <h2 className="block text-lg font-medium text-gray-900 mb-2">Image Editor</h2>
      <div>
        <img
          src={editedImage}
          alt="Generated"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${isGrayscale ? 1 : 0}) blur(${blur}px) hue-rotate(${hue}deg) invert(${isInverted ? 1 : 0}) sepia(${sepia}%) opacity(${opacity}%)`,
            width: '480px',
          }}
        />
        <div>
          <label htmlFor="brightness">Brightness:</label>
          <input type="range" id="brightness" min="0" max="200" value={brightness} className="slider mx-5" onChange={handleBrightnessChange} />
          <label htmlFor="contrast">Contrast:</label>
          <input type="range" id="contrast" min="0" max="200" value={contrast} className="slider" onChange={handleContrastChange} />
          <br />
          <label htmlFor="saturation">Saturation:</label>
          <input type="range" id="saturation" min="0" max="200" value={saturation} className="slider mx-5" onChange={handleSaturationChange} />
          <label htmlFor="blur">Blur:</label>
          <input type="range" id="blur" min="0" max="10" value={blur} className="slider" onChange={handleBlurChange} />
          <br />
          <label htmlFor="hue">Hue:</label>
          <input type="range" id="hue" min="0" max="360" value={hue} className="slider mx-5" onChange={handleHueChange} />
          <label htmlFor="sepia">Sepia:</label>
          <input type="range" id="sepia" min="0" max="100" value={sepia} className="slider" onChange={handleSepiaChange} />
          <br />
          <label htmlFor="opacity">Opacity:</label>
          <input type="range" id="opacity" min="0" max="100" value={opacity} className="slider mx-5" onChange={handleOpacityChange} />
          <br />
          <button type="button" className='mt-3 text-white bg-[#3a3838] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2' onClick={toggleGrayscale}>{isGrayscale ? 'Remove Grayscale' : 'Apply Grayscale'}</button>
          <button type="button" className='mt-3 text-black bg-[#c2b6b6] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2' onClick={toggleInvert}>{isInverted ? 'Original Colors' : 'Invert Colors'}</button>
          <button type="button" className='mt-3 text-white bg-[#e03737] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2' onClick={resetImage}>Reset</button>
          <button type="button" className='mt-3 text-white bg-[#007bff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-2' onClick={handleSaveImage}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
