import { Button } from "@/components/ui/button";
import { FaSignInAlt } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-around min-h-16 items-center w-full sticky z-10 bg-[#001849] text-white top-0">
      <div className="w-2/12">Logo</div>
      <nav className="hidden  flex-row justify-start gap-x-24  w-5/12 md:flex">
        <div className="px-2 py-1 rounded-md hover:bg-sky-500 hover:text-slate-700">
          <Link to="/home">Home</Link>
        </div>
        <div className="px-2 py-1 rounded-md hover:bg-sky-500 hover:text-slate-700">
          <Link to="/fields">Fields</Link>
        </div>
        <div className="px-2 py-1 rounded-md hover:bg-sky-500 hover:text-slate-700">
          <Link to="/pricing">Pricing</Link>
        </div>
      </nav>

      <div className="hidden flex-row justify-around w-3/12 md:flex ">
        <Link to="/auth/login">
          <Button className="border rounded-lg min-w-[100px]  flex flex-row justify-between hover:bg-sky-500 hover:text-slate-700">
            <FaSignInAlt /> Login
          </Button>
        </Link>
        <Link to="/auth/register">
          <Button className="border rounded-lg min-w-[110px]  flex flex-row justify-between hover:bg-sky-500 hover:text-slate-700">
            <HiUserAdd />
            Register
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
