import React, { useEffect } from 'react';
import cornerstone from 'cornerstone-core';
import 'cornerstone-core/dist/cornerstone.css';
import dicomParser from 'dicom-parser';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
const CornerstoneViewer: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  useEffect(() => {
    const element = document.getElementById('cornerstone-element');
    if (element) {
        cornerstone.enable(element);
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
        fetch(imageSrc)
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const byteArray = new Uint8Array(buffer);
            const dataSet = dicomParser.parseDicom(byteArray);
            const pixelDataElement = dataSet.elements.x7fe00010;
            const pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
            
            const image = cornerstoneWADOImageLoader.createImage(pixelData, dataSet);
            cornerstone.displayImage(element, image);
          });
      }
    if (element) {
      cornerstone.enable(element);
      cornerstone.loadImage(imageSrc).then(image => {
        cornerstone.displayImage(element, image);
      });
    }

    return () => {
        if(element){

            cornerstone.disable(element);
        }
    };
  }, [imageSrc]);

  return <div id="cornerstone-element"></div>;
};

export default CornerstoneViewer;
