import {Link} from "react-router-dom";

const ReusableButton = ({value, link, onClick, color = "bg-brown-menu"}) => {
    return <div
            className={color + " border-2 border-b-workday min-w-min w-24 h-12 rounded-md grid grid-rows-1 place-items-center text-workday font-bold text-center hover:cursor-pointer hover:bg-gray-600 "}
            onClick={onClick}>
            <Link to={link}
                  className={""}>{value}</Link>
        </div>
}

export default ReusableButton;