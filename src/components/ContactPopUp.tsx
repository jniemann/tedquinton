'use client';
import Link from "next/link";

export default function Header() {
  return (
    <div className="contact-popup lenis lenis-smooth" >
      <div className="contact-popup_content" >
        <div className="contact-popup_form-holder">
          <div className="sp-form w-form">
            <form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-flow="66601c7c6b0d48cf88bbe06f" data-wf-page-id="66601c7c6b0d48cf88bbe083" data-wf-element-id="3d4da971-c555-ffd2-cca0-b51909bfb00d">
              <h3 className="contact-popup_head">Get in touch</h3>
              <label htmlFor="Position" className="contact-label">Position</label>
              <div className="contact-select_layout">
                <select id="Position-2" name="Position" data-name="Position" className="contact-input w-select">
                  <option value="">Select a category</option>
                  <option value="Intern">Intern</option>
                  <option value="Candidate Architect">Candidate Architect</option>
                  <option value="Architectural Technologist">Architectural Technologist</option>
                  <option value="Professional Architect">Professional Architect</option>
                  <option value="Other">Other</option>
                </select>
                <div className="contact-dropdown_arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 16" fill="none">
                    <path d="M1 1L14.9999 15L29 1" stroke="white" />
                  </svg>
                </div>
              </div>
              <label htmlFor="Position-2" className="contact-label">Name &amp; Surname</label>
              <input className="contact-input w-input" name="name" data-name="Name" placeholder="Name Surname" type="text" id="name" />
              <label htmlFor="email" className="contact-label">Email Address</label>
              <input className="contact-input w-input" name="email" data-name="Email" placeholder="name@email.com" type="email" id="email" required />
              <label htmlFor="field" className="contact-label">Message</label>
              <textarea placeholder="Message" id="field" name="field" data-name="Field" className="contact-input w-input">
              </textarea>
              <input type="submit" data-wait="Please wait..." className="form-submit w-button" value="Submit" />
              <div className="submit-btn">
                <div className="submit-btn_text">Submit Form</div>
                <div className="submit-arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 22 22" fill="none">
                    <g style={{ mixBlendMode: "difference" }}>
                      <path d="M0.945953 0.949066L10.8943 0.947449L20.8394 0.947468L20.8394 20.8409M0.945927 20.8409L20.8394 0.94423" stroke="white" />
                    </g>
                  </svg>
                </div>
              </div>
            </form>
            <div className="sp-success w-form-done">
              <h3 className="success-head">Form submitted</h3>
              <div className="success-text">Thank you for contacting us. A member of our team will respond in due course.</div>
              <Link href="#" className="explore-btn w-inline-block">
                <div className="submit-btn_text">Explore more</div>
                <div className="submit-arrow w-embed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 22 22" fill="none">
                    <g style={{ mixBlendMode: "difference" }}>
                      <path d="M0.945953 0.949066L10.8943 0.947449L20.8394 0.947468L20.8394 20.8409M0.945927 20.8409L20.8394 0.94423" stroke="white" />
                    </g>
                  </svg>
                </div>
              </Link>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
      <div className="close-contact">
        <div h-effect="" className="text-overflow is-menu">
          <div h-item="" mask-in="" className="menu-btn_text">
            <span className="word">
              <span className="char">C</span>
              <span className="char">l</span>
              <span className="char">o</span>
              <span className="char">s</span>
              <span className="char">e</span>
            </span>
          </div>
          <div h-item="" mask-in="" className="menu-btn_text">
            <span className="word">
              <span className="char">C</span>
              <span className="char">l</span>
              <span className="char">o</span>
              <span className="char">s</span>
              <span className="char">e</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
