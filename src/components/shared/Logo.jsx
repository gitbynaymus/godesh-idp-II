import { Link } from "react-router";
import logo from '../../assets/logo.png'
const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} alt="GoDesh Logo" className="w-7" />
      <span className="text-2xl font-bold text-primary">GoDesh</span>
    </Link>
  );
};

export default Logo;