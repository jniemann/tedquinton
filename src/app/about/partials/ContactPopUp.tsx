'use client';
import { company } from "@/database/company"

const Component = () => {
  return (
    <div team-item="contact-popup" role="listitem" className="team-col_item w-dyn-item">
      {/* <a
        data-swup-animation="to-black"
        href="/team-members/join-the-team"
        className="team-img_holder w-inline-block w-condition-invisible"
      >
        <div className="team-img_height"></div>
        <div className="team-img_overlay"></div>
      </a> */}

      <div className="team-name w-condition-invisible">
        Join the team
      </div>

      <div className="join-btn">
        <div className="join-content">
          <div className="body-copy is-wrap">
            Join the team
            <br />
            {company?.emails?.info}
          </div>
        </div>
        <div className="team-img_height"></div>
      </div>
    </div>
  )
}

export default Component