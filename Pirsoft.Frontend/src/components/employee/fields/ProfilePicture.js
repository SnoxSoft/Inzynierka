import {BsPersonCircle} from "react-icons/bs";
import React, {useState} from "react";
import {
    accountHR,
    alertProfilePicture,
    labelCreate
} from "../../../GlobalAppConfig";
import ReusableButton from "../../base/ReusableButton";
import axios from "axios";
import {getLocalStorageKeyWithExpiry} from "../../jwt/LocalStorage";

const ProfilePicture = ({id, avatarData , fileToUpload, setFileToUpload, employeeId, mode}) => {

    const [picture, setPicture] = useState("")
    const [pictureName, setPictureName] = useState("")

    const [showPopupWithProblems, setShowPopupWithProblems] = useState(false);
    const [alerts, setAlerts] = useState(<></>)

    const hiddenFileInput = React.useRef(null);

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
                        setPictureName(event.target.files[0].name)
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
        try {
            var backslashes = path.split("\\");
            var newPath = "\\" + backslashes.slice(-3).join("\\");
            return newPath;
        } catch (e) {
            
        }
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
            {getLocalStorageKeyWithExpiry("loggedEmployee") !== null &&
            (getLocalStorageKeyWithExpiry("loggedEmployee").UserId === employeeId ||
                getLocalStorageKeyWithExpiry("loggedEmployee").Role_name === accountHR) ?
                <>
                <div className={"flex flex-row"}>
                    <ReusableButton value={"Wybierz plik"} color={"bg-workday text-black"}
                    hover={"hover:cursor-default hover:bg-gray-200"} formatting={"w-24 h-7"}
                    onClick={() =>hiddenFileInput.current.click()}/>
                    <p className={"pl-2"}> {fileToUpload ? pictureName.length > 20 ? pictureName.slice(0, 20) + ".." : pictureName : mode === 'create' ? 'Nie wybrano pliku' : ''}</p>


                </div>
                    <input name="" type="file" accept="image/png, image/jpeg" style={{display:'none'}}
                           className={"rounded-md"}
                           ref={hiddenFileInput}
                           onChange={onImageChange}
                    />
                </>
            :
                <></>
            }

        </div>
    )
}

export default ProfilePicture;