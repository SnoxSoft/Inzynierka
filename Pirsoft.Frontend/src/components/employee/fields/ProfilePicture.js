import {BsPersonCircle} from "react-icons/bs";
import React, {useState} from "react";
import { serverIpProd } from "../../../GlobalAppConfig"

const ProfilePicture = ({id}) => {
    const TEMPORARY_EMPLOYEE_ID = 1;
    let image = ""; //localStorage.getItem('default_avatar');
    const [picture, setPicture] = useState("")

    async function postAllowedFile(fileToUpload, employeeId) {
        const formData = new FormData();
        formData.append("employee_id", employeeId)
        formData.append("employee_avatar", fileToUpload, fileToUpload.name);

        setPicture(URL.createObjectURL(fileToUpload))

        // fetch(serverIpProd + "/save/avatar", { method: "POST", body: formData })
        //     .then(res => res.json())
        //     .then(data => { this.setState({ avatarFileName: data }) });
    }

    async function imageUpload(e, employeeId) {
        e.preventDefault();

        const uploadedFile = e.target.selectedAvatarFile.files[0];

        const uploadedFileExtension = uploadedFile.name
            .slice((uploadedFile.name.lastIndexOf(".") - 1 >>> 0) + 2)
            .toLowerCase();

        if(uploadedFile.size <= 2097152) {
            switch (uploadedFileExtension) {
                case "png":
                case "jpg":
                    await postAllowedFile(uploadedFile, employeeId);
                    break;

                default:
                    // tu trzeba wyświetlić użytkownikowi komunikat o błędzie, że wybrał plik w złym formacie
                    // nie ogarniałem, jak to u Ciebie wygląda z wyświetlaniem komunikatów o błędach
                    console.log("Incorrect file type provided, please select '.png' or '.jpg' file type");
                    alert("Incorrect file type provided, please select '.png' or '.jpg' file type");
            }
        }
        else console.log("Rozmiar pliku nie moze byc wiekszy niz 2mb");
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPicture(event.target.files[0]);
        }
    }

    return (
        <div className={"mb-2 space-x-4"}>
            { picture !== ""
                ? <img
                    id={id}
                    src={URL.createObjectURL(picture)}
                    alt="Card image cap"
                    className="card-img-top mx-auto text-center h-auto max-h-80 rounded-md hover:cursor-pointer"/>
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