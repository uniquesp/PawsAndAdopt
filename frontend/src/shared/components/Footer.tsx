import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { ABOUT_US, HOME_PATH, SHOW_ADOPT_PET_REQUEST, SHOW_ALL_PETS, SHOW_DONATE_PET_REQUEST } from "@/routes/routes-constant";

const Footer = () => {
  return (
    <footer className="bg-[#8A5691] text-[#E4D3E7] py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-[#A864AF] pb-4">
          <Link to="/" className="text-2xl font-bold text-[#FFFEFE]">
            PawsAndAdopt
          </Link>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link to= {HOME_PATH} className="hover:text-[#D1B0D2]">Home</Link>
            <Link to={SHOW_ALL_PETS} className="hover:text-[#D1B0D2]">Pets</Link>
            <Link to={SHOW_DONATE_PET_REQUEST} className="hover:text-[#D1B0D2]">Donate Pet</Link>
            <Link to={SHOW_ADOPT_PET_REQUEST} className="hover:text-[#D1B0D2]">Adopt Pet</Link>
            <Link to={ABOUT_US} className="hover:text-[#D1B0D2]">About</Link>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 my-4">
          <Link to="#" className="hover:text-[#D1B0D2]">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link to="#" className="hover:text-[#D1B0D2]">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link to="#" className="hover:text-[#D1B0D2]">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-[#D1B0D2]">© 2025 PawsAndAdopt. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;