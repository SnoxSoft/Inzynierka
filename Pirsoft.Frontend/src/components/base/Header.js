import ReusableButton from "./ReusableButton";
import {FiLogOut} from "react-icons/fi";
import { useNavigate } from  'react-router-dom';
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {appName, avatarAlterText, employeeRegisterMenu} from "../../GlobalAppConfig";
import {useRef, useState} from "react";
import {Button, Grid, Popup} from "semantic-ui-react";
import Notifications from "../../pages/notifications/Notifications";
import MenuButton from "./MenuButton";

const Header = () => {
    const navigate = useNavigate();
    const contextRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return <>
        <div className={"grid grid-cols-1 grid-rows-1 place-items-end items-center min-h-min max-h-min p-2"}>
            <div className={"col-start-1 row-start-1 place-self-center"}>
                <ReusableButton value={appName} link={"/"} />
            </div>

                {sessionStorage.getItem('USER') ?
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        
                        <ReusableButton
                                 onClick={() => setIsOpen(true)}
                                 value={<HiOutlineExclamationCircle size={40}/>}
                                 link={'/notifications'}/>


                        <ReusableButton value={
                            sessionStorage.getItem('AVATAR') !== null ?
                                    <img src={"data:image/png;base64," + sessionStorage.getItem('AVATAR')}
                                         alt="Avatar img" className={"w-10 rounded-2xl"}/>
                                    : avatarAlterText
                            } link={'/employee/'+sessionStorage.getItem('USER')} onClick={() => window.location.reload()}/>
                        <ReusableButton value={<FiLogOut  size={30}/>}
                                        onClick={() => {
                                            sessionStorage.removeItem('USER');
                                            navigate("/", { replace: true });
                                            window.location.reload(false);

                                        }} />
                    </div>
                    :
                    <></>}
        </div>

    </>
}
export default Header;