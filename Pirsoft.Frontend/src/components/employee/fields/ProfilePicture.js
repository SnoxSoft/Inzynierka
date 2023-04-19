
const ProfilePicture = ({id, picture}) => {

    let image = "";

    if(picture !== undefined) {
        try {
            const img = picture
            image = img;
        } catch (e) {
            image = "";
        }
    }
    else image = localStorage.getItem('default_avatar');

    return <div className={"mb-2 space-x-4"}>
        {image !== "" ?
        <img id={id} src={"data:image/png;base64," + image} alt="Card image cap"
                      className={"card-img-top mx-auto text-center h-auto max-h-96 rounded-md"}/> : null }
    </div>

}

export default ProfilePicture;