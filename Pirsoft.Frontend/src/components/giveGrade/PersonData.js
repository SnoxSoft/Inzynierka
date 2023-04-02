import ReusableButton from "../base/ReusableButton";
import {MdOpenInNew} from "react-icons/md";
import React from "react";

const PersonData = ({onChange, value, find = false, setPersonId, setHideFinder}) => {

        return (
        <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row place-content-center"}>Osoba
                        {find ?
                            <ReusableButton value={<MdOpenInNew/>} formatting={""} color={""}
                            onClick={() => setHideFinder(true)}/> :
                            <></>
                        }
                </div>
                <div>
                <input className={"w-96 text-black rounded-sm text-center"} type={"text"}
                       onChange={(e) => onChange(e.target.value)} value={value} disabled={true}></input>
                </div>
        </div>
        )

}
export default PersonData;