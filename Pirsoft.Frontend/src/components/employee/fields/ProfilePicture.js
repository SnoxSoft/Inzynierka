import {BsPersonCircle} from "react-icons/bs";
import React, {useEffect, useState} from "react";

const ProfilePicture = ({id, avatarData , fileToUpload, setFileToUpload}) => {

    const [ picture, setPicture] = useState("")
    const onImageChange = (event) => {
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

                    default:
                        console.log("Incorrect file type provided, please select '.png' or '.jpg' file type");
                        alert("Incorrect file type provided, please select '.png' or '.jpg' file type");
                }
            }
            else console.log("Rozmiar pliku nie moze byc wiekszy niz 2mb");
        }
    }

    function removePathPart(path) {
        var backslashes = path.split("\\");
        var newPath = "\\" + backslashes.slice(-3).join("\\");
        return newPath;
    }

    return (
        <div className={"mb-2 space-x-4"}>
            {avatarData !== undefined && avatarData !== "" || fileToUpload !== undefined ?
                <img
                    id={id}
                    src={fileToUpload !== undefined ? picture : process.env.PUBLIC_URL + removePathPart(avatarData)}
                    alt="Image"
                    className="card-img-top mx-auto text-center h-auto max-h-80 rounded-md"/>
                :
                <BsPersonCircle fontSize={300} className={"hover:cursor-pointer"}/>
            }
            {/*<div>*/}
            {/*    <form name="uploadAvatar" method="POST"*/}
            {/*          onSubmit={(e) =>*/}
            {/*              imageUpload(e, TEMPORARY_EMPLOYEE_ID)} enctype="multipart/form-data">*/}
            <input name="" type="file" accept="image/png, image/jpeg"
                   className={"rounded-md"}
                   onChange={onImageChange}
            />

            {/*<button type="submit">Upload file</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    )
}

export default ProfilePicture;