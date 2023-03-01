import {HiPlus} from "react-icons/hi";
import ReusableButton from "../base/ReusableButton";

const TeamLeader = ({value}) => {
    return (
        <>
        {value === undefined ?
            <ReusableButton value={<HiPlus/>}
                            color={""}
                            formatting={"hover:bg-gray-500 hover:border-2 hover:border-gray-400 w-96 h-6 rounded-md flex flex-col items-center place-content-center"}
                            onClick={() => console.log("calling for window to find leader")}
                /> :

            <input id={"team-leader"}
                      className={"grow border text-black rounded-md text-center h-6 w-96 hover:cursor-pointer"} type={"text"}
                      value={value.firstandlastname} disabled={true}>

            </input>
        }
        </>
    )
}

export default TeamLeader;