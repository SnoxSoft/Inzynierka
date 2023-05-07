import {BsPersonCircle} from "react-icons/bs";
import React from "react";
import { serverIpProd } from "../../../GlobalAppConfig"

async function postAllowedFile(fileToUpload, employeeId) {
    const formData = new FormData();
    formData.append("employee_id", employeeId)
    formData.append("employee_avatar", fileToUpload, fileToUpload.name);

    fetch(serverIpProd + "/save/avatar", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => { this.setState({ avatarFileName: data }) });
}

async function imageUpload(e, employeeId) {
    e.preventDefault();

    const uploadedFile = e.target.selectedAvatarFile.files[0];
    const uploadedFileExtension = uploadedFile.name
            .slice((uploadedFile.name.lastIndexOf(".") - 1 >>> 0) + 2)
            .toLowerCase();

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

const ProfilePicture = ({id, picture}) => {
    const TEMPORARY_EMPLOYEE_ID = 1;
    let image = ""; //localStorage.getItem('default_avatar');

    if (picture !== undefined)
    {
        try
        {
            const img = picture
            image = img;
        }
        catch (e)
        {
            image = "";
        }
    }

    return (
        <div className={"mb-2 space-x-4"}>
            { image !== ""
                ? <img
                    id={id}
                    src={"data:image/png;base64," + image}
                    alt="Card image cap"
                    className="card-img-top mx-auto text-center h-auto max-h-80 rounded-md"/>
                : <BsPersonCircle fontSize={300}/>
            }
            <div>
                <form name="uploadAvatar" method="POST" onSubmit={(e) => imageUpload(e, TEMPORARY_EMPLOYEE_ID)} enctype="multipart/form-data">
                    <p>SelectFile</p>
                    <div>
                        <label>Browse File</label><input name="selectedAvatarFile" type="file" accept="image/png, image/jpeg" /> 
                    </div>
                    <div>
                        <button type="submit">Upload file</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfilePicture;