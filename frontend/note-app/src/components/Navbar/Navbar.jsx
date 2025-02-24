import React, { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../Searchbar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, searchingNotes, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!userInfo); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token")); // Update login state based on localStorage
  }, [userInfo]);

  const onLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false); // Update state to reflect logout
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      searchingNotes(searchQuery);
    }
  };

  const onClearQuery = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-3 drop-shadow-md w-full">
      <h2 className="text-xl font-medium text-black py-2">Notizen</h2>

      {/* Show only if user is logged in */}
      {isLoggedIn && (
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearQuery={onClearQuery}
          />
          <ProfileInfo userInfo={userInfo} onlogout={onLogout} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
