// Sidebar.jsx
import React from 'react';
import {
  IoChatbubbleOutline,
  IoEllipseOutline,
  IoCallOutline,
  IoPeopleOutline,
  IoSettingsOutline,
  IoAddCircleOutline,
  IoHappyOutline,
  IoMicOutline,
  IoVideocamOutline,
  IoChevronDownOutline,
  IoSearchOutline,
  IoEllipsisVertical
} from 'react-icons/io5';
import { FaCircleNotch } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column align-items-center bg-light"
      style={{ width: 60, borderRight: '1px solid #ddd' }}
    >
      {/* Chats */}
      <div className="p-2 position-relative">
        <IoChatbubbleOutline size={24} />
        <span
          className="badge bg-success position-absolute"
          style={{ top: 6, right: 6, fontSize: 10 }}
        >
          1
        </span>
      </div>

      {/* Status */}
      <div className="p-2">
        <IoEllipseOutline size={24} />
      </div>

      {/* Calls */}
      <div className="p-2">
        <IoCallOutline size={24} />
      </div>

      {/* Communities/Groups */}
      <div className="p-2">
        <IoPeopleOutline size={24} />
      </div>

      <div className="flex-grow-1" />

      {/* Loader */}
      <div className="p-2">
        <FaCircleNotch size={24} className="spinner" />
      </div>

      {/* Settings */}
      <div className="p-2">
        <IoSettingsOutline size={24} />
      </div>

      {/* User avatar */}
      <div className="p-2">
        <img
          src="https://ui-avatars.com/api/?name=DemoUser&background=ddd"
          alt="me"
          className="rounded-circle"
          style={{ width: 32, height: 32 }}
        />
      </div>
    </div>
  );
}
