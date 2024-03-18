import { IUser } from "@/interface/user";
import { useSelector } from "react-redux";
import { IoTicketSharp } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTurnsClient } from "@/reducer/turnsReducer";
import { AppDispatch } from "@/store/store";

function DashBoard() {
  const user = useSelector((state: { user: IUser }) => state.user);
  const dispatch: AppDispatch = useDispatch();

  console.log(user.id_user);
  useEffect(() => {
    dispatch(setTurnsClient(user.id_user));
  }, [dispatch, user.id_user]);

  return (
    <div className="w-1/6 h-screen text-white bg-blueDark sticky top-0">
      <div className="h-2/6 border-slate-100">
        <div className="flex flex-col items-center justify-center ">
          <img
            src={user.profile_image}
            className="rounded-full aspect-square h-24"
          />
          <h3 className="text-greenLight font-medium">
            {user.first_name} {user.last_name}
          </h3>
        </div>
      </div>
      <div className="h-3/6">
        <Link
          to="/user/turns"
          className="p-4 hover:bg-greenLight hover:text-blueDark font-bold flex items-center border-y"
        >
          <IoTicketSharp className="w-2/6" size={30} />
          <h5 className="w-4/6 ">My Turns</h5>
        </Link>
        <Link
          to="/user/turns/add"
          className="p-4 hover:bg-greenLight hover:text-blueDark font-bold flex items-center border-b"
        >
          <MdBookmarkAdd className="w-2/6" size={30} />
          <h5 className="w-4/6">Solicitar Turno</h5>
        </Link>
        <Link
          to="/user/fields"
          className="p-4 hover:bg-greenLight hover:text-blueDark font-bold flex items-center border-b"
        >
          <GiSoccerField className="w-2/6" size={30} />
          <h5 className="w-4/6">Canchas</h5>
        </Link>
      </div>
      <div className="h-1/6  hover:bg-greenLight hover:text-blueDark font-bold flex items-center">
        <CiLogout className="w-2/6" size={40} />
        <h5 className="w-4/6">Cerrar sesion</h5>
      </div>
    </div>
  );
}

export default DashBoard;
