import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PawPrint, UserCircle, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { HOME_PATH, SHOW_ADOPT_PET_REQUEST, SHOW_ALL_PETS, SHOW_DONATE_PET_REQUEST } from "@/routes/routes-constant";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profileImage, logout } = useAuth();

  return (
    <nav className="w-full bg-[#8A5691] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo with Subtle Hover Effect */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-[1.02]"
          >
            <PawPrint className="h-6 w-6 text-[#D1B0D2]" />
            <span className="font-bold text-lg text-[#E4D3E7]">PawsAndAdopt</span>
          </Link>

          {/* Desktop Nav Links with Subtle Hover */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { text: "Home", link: HOME_PATH },
              { text: "Pets", link: SHOW_ALL_PETS },
              { text: "Donate Pet", link: SHOW_DONATE_PET_REQUEST },
              { text: "Adopt Pet", link: SHOW_ADOPT_PET_REQUEST}
            ].map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="px-3 py-2 text-[#E4D3E7] 
                  relative 
                  after:absolute 
                  after:bottom-0 
                  after:left-0 
                  after:w-0 
                  after:h-0.5 
                  after:bg-[#D1B0D2] 
                  after:transition-all 
                  after:duration-300 
                  hover:after:w-full 
                  hover:text-[#D1B0D2] 
                  transition-colors 
                  text-sm 
                  font-medium"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Menubar className="border-0 bg-transparent">
                <MenubarMenu>
                  <MenubarTrigger 
                    className="focus:bg-[#A864AF] 
                    data-[state=open]:bg-[#A864AF] 
                    cursor-pointer 
                    px-3 
                    py-2 
                    rounded-lg 
                    transition-all 
                    duration-200 
                    hover:bg-[#A864AF]/20"
                  >
                    <div className="flex items-center space-x-2">
                      <img 
                        src={profileImage || "https://via.placeholder.com/40"} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full border border-[#D1B0D2] transition-transform hover:scale-105" 
                      />
                      <span className="text-sm font-medium text-[#E4D3E7]">
                        {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase()}{" "}
                        {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </MenubarTrigger>
                  <MenubarContent 
                    className="bg-[#8A5691] 
                    text-[#E4D3E7] 
                    rounded-md 
                    shadow-lg 
                    border 
                    border-[#A864AF]"
                  >
                    {[
                      { 
                        icon: <UserCircle className="h-4 w-4 text-[#D1B0D2]" />, 
                        text: "Profile", 
                        link: "/profile" 
                      },
                    ].map((item, index) => (
                      <MenubarItem 
                        key={index}
                        className="focus:bg-[#A864AF] 
                        cursor-pointer 
                        hover:bg-[#A864AF]/20 
                        transition-colors"
                      >
                        <Link to={item.link} className="flex items-center gap-2 w-full py-1">
                          {item.icon}
                          <span>{item.text}</span>
                        </Link>
                      </MenubarItem>
                    ))}
                    <MenubarSeparator className="bg-[#A864AF]" />
                    <MenubarItem 
                      className="focus:bg-[#A864AF] 
                      cursor-pointer 
                      text-[#D1B0D2] 
                      hover:bg-red-600/10 
                      transition-colors"
                      onClick={logout}
                    >
                      <div className="flex items-center gap-2 w-full py-1">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </div>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Link 
                to="/signin" 
                className="px-4 
                py-1.5 
                bg-[#D1B0D2] 
                text-[#8A5691] 
                rounded-full 
                text-sm 
                font-medium 
                hover:bg-white 
                transition-colors 
                shadow-md 
                hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden 
            p-2 
            text-[#E4D3E7] 
            transition-transform 
            active:scale-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden 
          bg-[#A864AF] 
          text-[#E4D3E7] 
          fixed 
          inset-0 
          z-40 
          overflow-y-auto"
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button 
              className="p-2 text-[#E4D3E7] transition-transform active:scale-90"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            {[
              { text: "Home", link: HOME_PATH  },
              { text: "Pets", link: SHOW_ALL_PETS },
              { text: "Donate Pet", link: SHOW_DONATE_PET_REQUEST },
              { text: "Adopt Pet", link: SHOW_ADOPT_PET_REQUEST }
            ].map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="px-3 
                py-2 
                hover:bg-[#8A5691]/20 
                rounded-md 
                transition-colors"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.text}
              </Link>
            ))}

            <div className="border-t border-[#8A5691] mt-2 pt-2">
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="flex 
                    items-center 
                    gap-2 
                    px-4 
                    py-2 
                    text-sm 
                    hover:bg-[#8A5691]/20 
                    rounded-md 
                    transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 text-[#D1B0D2]" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex 
                    items-center 
                    gap-2 
                    w-full 
                    text-left 
                    px-4 
                    py-2 
                    text-sm 
                    hover:bg-[#8A5691]/20 
                    text-[#D1B0D2] 
                    rounded-md 
                    transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/signin" 
                  className="px-4 
                  py-2 
                  bg-[#D1B0D2] 
                  text-[#8A5691] 
                  rounded-md 
                  text-sm 
                  font-medium 
                  block 
                  text-center 
                  hover:bg-white 
                  transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;