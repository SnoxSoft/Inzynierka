import {BsPersonCircle} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {alertProblemOccured, alertProfilePicture, labelCreate} from "../../../GlobalAppConfig";
import ReusableButton from "../../base/ReusableButton";
import {Popup} from "semantic-ui-react";
import axios from "axios";

const ProfilePicture = ({id, avatarData , fileToUpload, setFileToUpload}) => {

    const [ picture, setPicture] = useState("")

    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const onImageChange = (event) => {
        setAlerts(<></>)
        if (event.target.files && event.target.files[0]) {
            const uploadedFile = event.target.files[0];

            const uploadedFileExtension = uploadedFile.name
                .slice((uploadedFile.name.lastIndexOf(".") - 1 >>> 0) + 2)
                .toLowerCase();

            if(uploadedFile.size <= 2097152) {
                switch (uploadedFileExtension) {
                    case "png":
                    case "jpg":
                        {setFileToUpload(event.target.files[0])
                        setPicture(URL.createObjectURL(event.target.files[0]))}
                        break;

                    default: {
                        setAlerts(<><p>{alertProfilePicture}</p>
                            <p>Akceptowalne rozszerzenia pliku to: '.png' lub '.jpg'</p></>)
                        setShowPopupWithProblems(true);
                        setTimeout(() => {setShowPopupWithProblems(false)}, 2000);
                    }
                }
            }
            else {
                setAlerts(<><p>{alertProfilePicture}</p>
                            <p>Rozmiar pliku nie moze byc wiekszy niz 2mb</p></>)
                setShowPopupWithProblems(true);
                setTimeout(() => {setShowPopupWithProblems(false)}, 2000);
            }
        }
    }

    function removePathPart(path) {
        var backslashes = path.split("\\");
        var newPath = "\\" + backslashes.slice(-3).join("\\");
        return newPath;
    }

    const [couldFindPicture, setCouldFindPicture] = useState(true)

    axios
        .get(process.env.PUBLIC_URL + removePathPart(avatarData))
        .then(() => {
        })
        .catch(() => {
            setCouldFindPicture(false);
        });

    return (
        <div className={"mb-2 space-x-4"}>
            {showPopupWithProblems ?
                <div className={"flex flex-col text-center text-workday gap-2 p-2 bg-red-700 rounded-md font-bold"}>
                    {alerts}
                </div> :
                <>
                    {avatarData !== undefined && avatarData !== "" && couldFindPicture || fileToUpload !== undefined ?
                        <img
                            style={{ width: 300, height: 300 }}
                            id={id}
                            src={fileToUpload !== undefined ? picture : process.env.PUBLIC_URL + removePathPart(avatarData)}
                            alt="Image"
                            className="card-img-top mx-auto text-center h-auto max-h-80 rounded-md"/>
                        :
                        <BsPersonCircle fontSize={300} className={"hover:cursor-pointer"}/>
                    }
                </>
            }
            <input name="" type="file" accept="image/png, image/jpeg"
                className={"rounded-md"}
                onChange={onImageChange}
            />

        </div>
    )
}

export default ProfilePicture;