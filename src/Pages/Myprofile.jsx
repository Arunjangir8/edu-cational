import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../api.js';

function Myprofile() {
  const [userdata, setUserdata] = useState(null);
  const [isedit, setisedit] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(userId);
        setUserdata(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleSave = async () => {
    try {
      await updateUserProfile(userId, userdata);
      setisedit(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (!userdata) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className='pt-32  max-w-lg w-full flex flex-col gap-2 text-sm mx-auto h-auto lg:h-[90vh] px-4 lg:scale-[1.2]'>
      <img className='w-36 rounded self-center' src={"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"} alt="profile" />

      {
        isedit
          ? <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 mx-auto text-center'
              type="text"
              value={userdata.name}
              onChange={(e) => setUserdata(prev => ({ ...prev, name: e.target.value }))}
            />
          : <p className='font-medium text-3xl text-neutral-800 mt-4 text-center'>{userdata.name}</p>
      }

      <hr className='bg-zinc-300 h-[1px] border-none mt-2' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email</p>
          <p className='text-blue-500 break-words'>{userdata.email}</p>

          <p className='font-medium'>Phone</p>
          {
            isedit
              ? <input className='bg-gray-100 max-w-full sm:max-w-52 w-full'
                  type="text"
                  value={userdata.phone || ""}
                  onChange={(e) => setUserdata(prev => ({ ...prev, phone: e.target.value }))}
                />
              : <p className='text-blue-400'>{userdata.phone}</p>
          }

          
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {
            isedit
              ? <select className='max-w-[120px] bg-gray-100 w-full'
                  value={userdata.gender || ""}
                  onChange={(e) => setUserdata(prev => ({ ...prev, gender: e.target.value }))}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              : <p className='text-gray-400'>{userdata.gender}</p>
          }

          <p className='font-medium'>BirthDay</p>
          {
            isedit
              ? <input className='bg-gray-100 max-w-full sm:max-w-52 w-full'
                  type="date"
                  value={userdata.Bod ? userdata.Bod.slice(0, 10) : ""}
                  onChange={(e) => setUserdata(prev => ({ ...prev, Bod: e.target.value }))}
                />
              : <p className='text-gray-400'>{userdata.Bod ? userdata.Bod.slice(0, 10) : ""}</p>
          }
        </div>
      </div>

      <div className='mt-6 flex justify-center'>
        {
          isedit
            ? <button
                className="text-center w-32 sm:w-36 h-10 rounded-full bg-gray-100 shadow-sm shadow-[#000]/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#000]/70 hover:-translate-y-0.5 active:shadow-md hover:bg-blue-500 hover:text-white active:translate-y-0.5 my-6 lg:my-7 text-gray-700"
                onClick={() => { handleSave(); setisedit(false); }}
              >
                Save information
              </button>
            : <button
                className="text-center w-32 sm:w-36 h-10 rounded-full bg-gray-100 shadow-sm shadow-[#000]/50 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#000]/70 hover:-translate-y-0.5 active:shadow-md hover:bg-blue-500 hover:text-white active:translate-y-0.5 my-6 lg:my-7 text-gray-700"
                onClick={() => setisedit(true)}
              >
                Edit
              </button>
        }
      </div>
    </div>
  );
}

export default Myprofile;

