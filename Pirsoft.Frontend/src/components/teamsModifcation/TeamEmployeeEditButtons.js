import ReusableButton from "../base/ReusableButton";

const TeamEmployeeEditButtons = ({showOptions, changeMethod, changeValue, deleteMethod, deleteValue}) => {

    return (
        <>
            {showOptions ?
                <div className={"flex flex-row gap-4 place-content-center"}>
                    <ReusableButton value={"ZMIEŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}
                                    onClick={() => changeMethod(changeValue)}/>
                    <ReusableButton value={"USUŃ"} formatting={"h-6 w-16 border-2 border-gray-400"}
                                    onClick={() => deleteMethod(deleteValue)}/>
                </div>
                :
                <></>
            }
        </>
    )
}

export default TeamEmployeeEditButtons;