import ReusableButton from "./ReusableButton";
import {FiLogOut, FiLogIn} from "react-icons/fi";
import { useNavigate } from  'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return <>
        <div className={"grow grid grid-cols-1 grid-rows-1 place-items-end"}>
            <div className={"col-start-1 row-start-1 place-self-center"}>
                <ReusableButton value={"PIRSOFT"} link={"/"} />
            </div>

                {sessionStorage.getItem('USER') ?
                    <div className={"col-start-1 col-end-1 row-start-1 row-end-1 flex flex-row"}>
                        {sessionStorage.getItem('ALERTS') ?
                            <ReusableButton value={"(!)"} link={"/"} /> :
                            <></>
                        }
                        <ReusableButton value={
                            sessionStorage.getItem('AVATAR') !== null ?
                                    <img src={"data:image/png;base64," + sessionStorage.getItem('AVATAR')} alt="Avatar image cap" className={"w-10 rounded-2xl"}/>
                                    : "MOJE KONTO"
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