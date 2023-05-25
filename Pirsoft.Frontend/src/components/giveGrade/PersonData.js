import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import React from "react";
import {gradePersonLabel} from "../../GlobalAppConfig";

const PersonData = ({id, onChange, value, find = false, setHideFinder}) => {

        return (
        <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row place-content-center hover:cursor-default"}>{gradePersonLabel}
                        {find ?
                            <ReusableButton id={id + "-close"} value={<MdOpenInNew/>} formatting={""} color={""}
                            onClick={() => setHideFinder(true)}/> :
                            <></>
                        }
                </div>
                <div>
                <input id={id} className={"w-96 text-black rounded-sm text-center"} type={"text"}
                       onChange={(e) => onChange(e.target.value)} value={value} disabled={true}></input>
                </div>
        </div>
        )

}
export default PersonData;