import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";
import "./Header.css"

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <h3 onClick={()=>{navigate('/home')}} style={{ cursor: "pointer"}}>To Do App</h3>
      </div>
      <div className="user-info">
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/assets/${user.picturePath}`}
          width="35px"
          height="35px"
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          alt={user.name}
        />
        <div className="user-dropdown">
          <span>{user.name}</span>
          <div className="dropdown-content">
            <div onClick={() => { dispatch(setLogout()); navigate('/'); }}>Logout</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
