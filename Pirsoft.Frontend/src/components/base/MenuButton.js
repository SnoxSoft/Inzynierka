import {Link} from "react-router-dom";
const MenuButton = ({id, value, link}) => {
    return (
        <Link id={id} className={"text-workday text-center font-bold border-y-2 p-2 hover:bg-gray-600 hover:bg-opacity-40"}
              to={link}>{value}
        </Link>
    );
}
export default MenuButton;