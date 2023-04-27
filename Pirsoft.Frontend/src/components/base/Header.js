import ReusableButton from "./ReusableButton";
import {FiLogOut} from "react-icons/fi";
import { useNavigate } from  'react-router-dom';
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {appName, avatarAlterText, employeeRegisterMenu} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";
import React from "react";

const Header = () => {
    const navigate = useNavigate();

    return <>
        <div className={"grid grid-cols-1 grid-rows-1 place-items-end items-center min-h-min max-h-min p-2"}>
            <div className={"col-start-1 row-start-1 place-self-center"}>
                <ReusableButton id={"header-home"} value={appName} link={"/"} />
            </div>

                {sessionStorage.getItem('USER') ?
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        
<<<<<<< HEAD
                        <ReusableButton
                            id={"header-notifications"}
                            value={<HiOutlineExclamationCircle size={45}/>}
                            link={'/notifications'}/>
=======
                        {/*<ReusableButton*/}
                        {/*    id={"header-notifications"}*/}
                        {/*    value={<HiOutlineExclamationCircle size={45}/>}*/}
                        {/*    link={'/notifications'}/>*/}
>>>>>>> e64e4e3b0caf45d6129b5bc93816f458bae16902

                        <ReusableButton
                            id={"header-profile"}
                            value={
                            // sessionStorage.getItem('AVATAR') !== null ?
                            //         <img src={"data:image/png;base64," + sessionStorage.getItem('AVATAR')}
                            //              alt="Avatar img" className={"w-10 rounded-2xl"}/>
                            //         : avatarAlterText
                                <BsPersonCircle fontSize={40}/>
                            }
                            onClick={() => {
                                navigate('/employee/'+sessionStorage.getItem('USER'), { replace: true });
                                window.location.reload()}
                            }/>

                        <ReusableButton
                            id={"header-log-out"}
                            value={<FiLogOut  size={35}/>}
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