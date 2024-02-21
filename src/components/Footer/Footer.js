import React from "react";
import logo from "../../assets/logow.png";
import wfp from "../../assets/wfp.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="grid xl:grid-cols-footer xl:grid-rows-footer justify-items-center gap-5 bg-jetblack text-white mt-4 p-5">
      <div className="xl:col-span-6 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-1">
        <img src={logo} width={150} height={150} alt="WFP" />
      </div>
      <div className="sm:self-center xl:row-start-2 xl:col-start-1 xl:col-end-2 sm:row-start-2 sm:row-end-3 sm:col-start-5 sm:col-end-6">
        <img src={wfp} className="w-full h-2/4" alt="wfp-white" />
      </div>
      <div className="flex flex-col justify-around align-middle">
        <h1 className="mb-4">link</h1>
        <h4 className="mb-2">sublink</h4>
      </div>
      <div className="flex flex-col justify-around align-middle">
        <h1 className="mb-4">link</h1>
        <h4 className="mb-2">sublink</h4>
      </div>
      <div className="flex flex-col justify-around align-middle">
        <h1 className="mb-4">link</h1>
        <h4 className="mb-2">sublink</h4>
      </div>
      <div className="flex flex-col capitalize justify-around align-middle">
        <h1 className="mb-4">
          <Link to="/login">admin</Link>
        </h1>
      </div>
      <div className="flex">
        <h4 className="mb-4 self-end text-[12px] font-semibold">
          ©️ All rights reserved 2024. PSWFPC
        </h4>
      </div>
    </div>
  );
}
