"use client"
import { company } from '@/database/company';
//import Lottie from "lottie-react"
import { areas } from "@/database/areas";

const Component = () => {
  return (
    <div className="egg-component">
      <div className="egg-left">
        <div className="egg-col">
          <p className="body-copy">Design Intelligence</p>
        </div>
        <div className="egg-col">
          <div className="egg-menu">
            <p className="egg-menu_head">{company?.shortName}</p>
            {areas.map(item =>
              <p key={item?.slug + '-egg'} className="body-copy">{item?.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="egg-right">
        <div className="sp-anim_holder">
          {/* <Lottie animationData={company?.animatedLogo} autoplay={false} loop={false} className={'sp-anim_container'} /> */}
        </div>
      </div>
    </div>
  )
}

export default Component