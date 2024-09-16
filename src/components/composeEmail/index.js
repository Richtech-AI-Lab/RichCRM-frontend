import React from 'react';
import XButton from "../../components/button/XButton"
import { IoIosClose } from 'react-icons/io';
import logo from '../../assets/images/logo-dark.png'
import avatar from '../../assets/images/contact_avtar.png'

const ComposeEmail = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card fixed bottom-3 right-3 w-[552px]">
    <div className="flex justify-between items-center p-4">
      <h3 className="text-base text-secondary-800 font-medium">Compose Message</h3>
      <IoIosClose size={28} className="text-text-gray-100 cursor-pointer" />
    </div>
    <div className="mx-4">
      <div className="border-b border-b-border py-[6px] flex items-center">
        <label className="inline text-sm font-medium text-text-gray-100 mr-2">To</label>
        <ul>
          <li className="flex items-center p-2 bg-bg-gray-300 rounded-full">
            <img src={avatar} alt="" className="mr-2" />
            <span>Jack Fu</span>
            <IoIosClose size={28} className="text-text-gray-100 cursor-pointer" />
          </li>
        </ul>
        <input
          type="text"
          className="inline border-0 focus:ring-transparent"
        />
      </div>
      <div className="border-b border-b-border py-[6px]">
        <label className="inline text-sm font-medium text-text-gray-100 mr-2">Subject</label>
        <input
          type="text"
          className="inline border-0 focus:ring-transparent"
        />
      </div>
    </div>
    <div className="mx-4 py-3">
      <textarea
        rows={15}
        className="inline border-0 p-0 resize-none w-full focus:ring-transparent"
      />
    </div>
    <div className="mx-4 pb-3 flex">
      <img src={logo} alt="" className="mr-4" />
      <div>
        <h3 className="text-base text-secondary-800 font-semibold">Gary Tang</h3>
        <p className="text-sm text-text-gray-100 font-medium">Paralegal ; Office Manager </p>
      </div>
    </div>
    <div className="text-end px-4 py-3 shadow-full rounded-bl-2xl rounded-br-2xl">
      <XButton
        text="Send"
        className="bg-active-blue text-active-blue-text text-base py-[10px] px-6 rounded-[100px]"
      />
    </div>
  </div>
  );
};

export default ComposeEmail;
