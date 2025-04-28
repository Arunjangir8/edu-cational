import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [localStorage.getItem("token")]);

  return (
    <>
      <div className='w-full fixed h-[50px] lg:h-[65px] z-50 bg-[#f9f6fe]'>
        <div className='flex justify-between px-6 lg:justify-between items-center w-full mx-auto h-full'>
          <div className="text-xl text-[#A594F9]">LOGO</div>
          <div className='hidden lg:flex lg:justify-around lg:items-center lg:w-[40vw]'>
            <p onClick={() => navigate("/")} className="nav-link text-[#374151] hover:text-[#A594F9] cursor-pointer">Home</p>
            <p onClick={() => navigate("/Books")} className="nav-link text-[#374151] hover:text-[#A594F9] cursor-pointer">Books & PDFs</p>
            <p onClick={() => navigate("/AI")} className="nav-link text-[#374151] hover:text-[#A594F9] cursor-pointer">AI Assistant</p>
            {token ? (
              <div className="relative group ml-6 cursor-pointer">
                <div className="w-10 h-10 bg-cover rounded-full border-2 border-[#A594F9] overflow-hidden">
                  {/* You can put user's profile image inside here later */}
                </div>
                <div className="absolute top-0 right-0 pt-12 hidden group-hover:block z-20">
                  <div className="bg-white rounded-lg shadow-lg p-3 w-40">
                    <p onClick={() => navigate("/my-profile")} className="dropdown-item text-[#374151] hover:text-[#A594F9] p-2 cursor-pointer">My Profile</p>
                    <div className="border-t border-gray-200"></div>
                    <p onClick={handleLogout} className="p-2 dropdown-item text-[#A594F9] hover:text-red-400 cursor-pointer">Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button onClick={handleLogin} className="text-[#374151] hover:text-[#A594F9] ml-4">Login</button>
              </>
            )}
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6 text-[#374151]" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-[#374151]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#F5EFFF] px-4 py-2 absolute top-[50px] w-full z-40 shadow-md">
          <p onClick={() => { navigate("/"); setIsOpen(false); }} className="block py-2 text-[#374151] hover:text-[#A594F9] m-1 cursor-pointer">Home</p>
          <p onClick={() => { navigate("/Books"); setIsOpen(false); }} className="block py-2 text-[#374151] hover:text-[#A594F9] m-1 cursor-pointer">Books & PDFs</p>
          <p onClick={() => { navigate("/AI"); setIsOpen(false); }} className="block py-2 text-[#374151] hover:text-[#A594F9] m-1 cursor-pointer">AI Assistant</p>
          {token ? (
            <>
              <p onClick={() => { navigate("/my-profile"); setIsOpen(false); }} className="dropdown-item text-[#374151] hover:text-[#A594F9] m-1 py-2 cursor-pointer">My Profile</p>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block m-1 py-2 text-[#A594F9]">Logout</button>
            </>
          ) : (
            <button onClick={() => { handleLogin(); setIsOpen(false); }} className="block py-2 text-[#374151] hover:text-[#A594F9]">Login</button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
