'use client';

import { company } from "@/database/company"
import Image from "next/image"
import Link from "next/link";

interface ComponentProps {
  pageTitle: string
}

const Component = ({ pageTitle }: ComponentProps) => {
  return (
    <div className="global-head">
      <div className="global-head_layout">
        <a t-white="" pload="" href="/" className="head-logo_holder w-inline-block" >
          <div className="head-logo_height" />
          <Image src={company?.logoBold} loading="eager" alt="" className="head-logo" />
          <Image src={company?.logoBold} loading="eager" alt="" className="head-logo-white" />
        </a>


        <div pload="" className="head-page_name">
          <div className="page-name_text">{pageTitle}</div>
        </div>
      </div>
    </div>
  )
}

export default Component