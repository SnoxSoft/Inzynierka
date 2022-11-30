
const ProfilePicture = ({value}) => {

    return <div className={"mb-2 space-x-4"}>
        {value ? <img src={"data:image/png;base64," + value} alt="Card image cap" className={"card-img-top mx-auto text-center  h-auto"}/> : null}

    </div>

}

export default ProfilePicture;