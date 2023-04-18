import {Link} from "react-router-dom";

const ReusableButton = ({value, link, onClick, color = "bg-brown-menu", formatting = "border-2 border-b-workday min-w-min w-24 h-12", id = ""}) => {
    let buttonFormat = typeof value === 'string'?
        "grid grid-cols-1 place-content-center justify-self-center " :
        "grid grid-rows-1 place-content-center place-items-center "

    return <div
            className={color + " " + formatting + " rounded-md grid grid-rows-1 place-items-center text-workday font-bold text-center hover:cursor-pointer hover:bg-gray-600 "}
            onClick={onClick}>
            <Link id={id}
                to={link}
                  className={ formatting !== "" ? " border-0 w-full h-full " + buttonFormat : ""}
            >{value}</Link>
        </div>
}

export default ReusableButton;