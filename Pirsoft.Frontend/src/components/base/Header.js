import ReusableButton from "./ReusableButton";
import {FiLogOut} from "react-icons/fi";
import { useNavigate } from  'react-router-dom';
import {appName} from "../../GlobalAppConfig";
import {BsPersonCircle} from "react-icons/bs";
import React from "react";
import {getLocalStorageKeyWithExpiry} from "../jwt/LocalStorage";

const Header = () => {
    const navigate = useNavigate();

    return <>
        <div className={"grid grid-cols-1 grid-rows-1 place-items-end items-center min-h-min max-h-min p-2"}>
            <div className={"col-start-1 row-start-1 place-self-center"}>
                <ReusableButton id={"header-home"} value={appName} link={"/"} />
            </div>

                {getLocalStorageKeyWithExpiry("loggedEmployee") !== null ?
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        
                        {/*<ReusableButton*/}
                        {/*    id={"header-notifications"}*/}
                        {/*    value={<HiOutlineExclamationCircle size={45}/>}*/}
                        {/*    link={'/notifications'}/>*/}

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
                                navigate('/employee/'+getLocalStorageKeyWithExpiry("loggedEmployee").UserId, { replace: true });
                                //window.location.reload()
                            }
                            }/>

                        <ReusableButton
                            id={"header-log-out"}
                            value={<FiLogOut  size={35}/>}
                            onClick={() => {
                                            localStorage.removeItem("loggedEmployee");
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