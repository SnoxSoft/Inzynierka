import {useState} from "react";

const ProfilePicture = ({value}) => {
    return <div className={"mb-2 space-x-4"}>
        {value.avatar ? <img src={"data:image/png;base64," + value.avatar} alt="Card image cap"
                      className={"card-img-top mx-auto text-center h-auto max-h-96 rounded-md"}/> : null}

    </div>

}

export default ProfilePicture;