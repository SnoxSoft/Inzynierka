import {Link, useNavigate} from "react-router-dom";

const ReusableButton = ({value, link = undefined, onClick,
        color = "bg-brown-menu", id = "",
        formatting = "border-2 border-b-workday min-w-min w-24 h-12",
        hover = "font-bold hover:cursor-pointer hover:bg-gray-600",
        disabled = false}) => {

    const navigate = useNavigate();

    return <div id={id} onClick={() => {if(!disabled){{if(link){navigate(link);} else{onClick();}}}}}
                className={color + " " + formatting + " rounded-md grid grid-rows-1 place-items-center " +
                    "text-workday text-center " + hover} di>
            {value}
        </div>
}
export default ReusableButton;