import ReusableButton from "../base/ReusableButton";
import {labelChange, labelDelete} from "../../GlobalAppConfig";

const TeamEmployeeEditButtons = ({showOptions, changeMethod, changeValue, deleteMethod, deleteValue, id, mode}) => {

    return (
        <>
            {showOptions ?
                <div className={"flex flex-row gap-4 place-content-center"}>
                    {mode !== 'create'?
                    <ReusableButton id={id + "-change"} value={labelChange} formatting={"h-6 w-16 border-2 border-gray-400"}
                                    onClick={() => changeMethod(changeValue)}/> :
                        <></>
                    }
                    <ReusableButton id={id + "-remove"} value={labelDelete} formatting={"h-6 w-16 border-2 border-gray-400"}
                                    onClick={() => deleteMethod(deleteValue)}/>
                </div>
                :
                <></>
            }
        </>
    )
}

export default TeamEmployeeEditButtons;