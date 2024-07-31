import React, { useState } from "react";

const CartDonationProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  return (
    <>
      <div className="p-[15px] bg-[#fff]">
        <div className="text-[16px] font-medium text-[#000] mb-2">
          Masukan Data Diri
        </div>
        <p>Nama</p>
        <input
          name="name"
          className="border-[#C8C7B7] border rounded-[8px] p-[8px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
          value={profile.name}
          onChange={handleInputChange}
        />
        <p>Nomor Handphone</p>
        <input
          type="tel"
          name="phone"
          className="border-[#C8C7B7] border rounded-[8px] p-[8px] text-[#1D2129] text-[20px] font-semibold my-[10px] w-full focus:border-[#F7B500] focus:outline-none"
          value={profile.phone}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};

export default CartDonationProfile;
