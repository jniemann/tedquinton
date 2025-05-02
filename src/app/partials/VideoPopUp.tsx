'use client';
import { homeSectionTwo } from '@/database/homePage';
import Word from '../../components/Word'

const Component = () => {
  const { video } = homeSectionTwo
  return (
    <div className="video-popup" >
      <div className="video-holder" >
        <div className="video-height" />
        <div className="video-embed w-embed">
          <video id="sp-vid" playsInline loop>
            <source src={video} data-wf-ignore="true" />
          </video>
        </div>
      </div>
      <div className="video-close" >
        <div h-effect="" className="video-close_holder">
          <Word text="close" />
        </div>
      </div>
    </div>
  );
}

export default Component