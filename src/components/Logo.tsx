"use client"
import Image from "next/image";
import Link from "next/link";
import { useAnimation } from "../contexts/AnimationContext";

export default function Logo() {
  const { refs } = useAnimation()

  return (
    <div className="mobile-text_logo" ref={refs.logoRef}>
      <a t-white="" href="/" aria-current="page" className="head-logo_holder w-inline-block w--current" >
        <div className="head-logo_height">
        </div>
        <Image src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg" alt="" className="head-logo" />
      </a>
    </div>
  )
}