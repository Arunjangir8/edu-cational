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
            <a onClick={() => setIsOpen(!isOpen)} href="/" className="nav-link text-[#374151] hover:text-[#A594F9]">Home</a>
            <a onClick={() => setIsOpen(!isOpen)} href="/Explore" className="nav-link text-[#374151] hover:text-[#A594F9]">Explore</a>
            <a onClick={() => setIsOpen(!isOpen)} href="/Books" className="nav-link text-[#374151] hover:text-[#A594F9]">Books & PDFs</a>
            <a onClick={() => setIsOpen(!isOpen)} href="/AI" className="nav-link text-[#374151] hover:text-[#A594F9]">AI Assistant</a>
            {token ? (
              <div className="relative group ml-6 cursor-pointer">
                <div className="w-10 h-10 bg-cover rounded-full border-2 border-[#A594F9] overflow-hidden">
                </div>
                <div className="absolute top-0 right-0 pt-12 hidden group-hover:block z-20">
                  <div className="bg-white rounded-lg shadow-lg p-3 w-40">
                    <p onClick={() => navigate("/my-profile")} className="dropdown-item text-[#374151] hover:text-[#A594F9] p-2">My Profile</p>
                    <p onClick={() => navigate("/Progress")} className="dropdown-item text-[#374151] hover:text-[#A594F9] p-2">Progress</p>
                    <div className=" border-t border-gray-200 "></div>
                    <p onClick={handleLogout} className="p-2 dropdown-item text-[#A594F9] hover:text-red-400">Logout</p>
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
          <a href="/" className="block py-2 text-[#374151] hover:text-[#A594F9] m-1">Home</a>
          <a href="/Explore" className="block py-2 text-[#374151] hover:text-[#A594F9] m-1">Explore</a>
          <a href="/Books" className="block py-2 text-[#374151] hover:text-[#A594F9] m-1">Books & PDFs</a>
          <a href="/AI" className="block py-2 text-[#374151] hover:text-[#A594F9] m-1">AI Assistant</a>
          {token ? (
            <>
              <p onClick={() => navigate("/my-profile")} className="dropdown-item text-[#374151] hover:text-[#A594F9] m-1 py-2">My Profile</p>
              <p onClick={() => navigate("/Progress")} className="dropdown-item text-[#374151] hover:text-[#A594F9] m-1 py-2">Progress</p>
              <button onClick={handleLogout} className="block m-1 py-2 text-[#A594F9]">Logout</button>
            </>
          ) : (
            <button onClick={handleLogin} className="block py-2 text-[#374151] hover:text-[#A594F9]">Login</button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
