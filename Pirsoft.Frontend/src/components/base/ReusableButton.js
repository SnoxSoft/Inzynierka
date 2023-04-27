import {Link, useNavigate} from "react-router-dom";

<<<<<<< HEAD

const ReusableButton = ({value, link = undefined, onClick,
        color = "bg-brown-menu", id = "",
        formatting = "border-2 border-b-workday min-w-min w-24 h-12"}) => {

    const navigate = useNavigate();

    return <div
        id={id}
        onClick={() => {
            if(link){
                navigate(link);
            }
            else{
                onClick() }
        }}
        className={
            color + " " + formatting + " rounded-md grid grid-rows-1 place-items-center text-workday font-bold text-center hover:cursor-pointer hover:bg-gray-600 "
        }
    >{value}</div>
=======
const ReusableButton = ({value, link = undefined, onClick,
        color = "bg-brown-menu", id = "",
        formatting = "border-2 border-b-workday min-w-min w-24 h-12"}) => {

    const navigate = useNavigate();

    return <div id={id} onClick={() => {if(link){navigate(link);} else{onClick();}}}
                className={color + " " + formatting + " rounded-md grid grid-rows-1 place-items-center " +
                    "text-workday font-bold text-center hover:cursor-pointer hover:bg-gray-600 "}>
            {value}
        </div>
>>>>>>> e64e4e3b0caf45d6129b5bc93816f458bae16902
}
export default ReusableButton;