import React from "react";
import { initials } from "../../utils/helper";

const ProfileInfo = ({ onlogout, userInfo }) => {
  if (userInfo) {
    var fullname = initials(userInfo.fullName);
  }

  return (
    <>
      <div className="flex items-center gap-3 p-2 max-sm:gap-2 max-sm:text-xs">
        <div className="w-12 h-12 max-sm:w-10 max-sm:h-10 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {fullname}
        </div>
        <div>
          <p className="text-sm max-sm:text-xs font-medium">
            {userInfo && userInfo.fullName}
          </p>
          <button
            className="text-sm max-sm:text-xs text-slate-700 underline"
            onClick={onlogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
