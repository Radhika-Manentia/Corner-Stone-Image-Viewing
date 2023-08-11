//@react server use-client
import Image from 'next/image'
import CornerstoneViewer from '../components/CornerstoneViewport';
export default function Home() {
  const dicomImageSrc = '/im.dcm';
  return (
    <div>

      <h1 className='text-3xl text-center font-bold'>CORNERSTONE 3B</h1>
       <CornerstoneViewer imageSrc={dicomImageSrc} />
    </div>
  )
}
