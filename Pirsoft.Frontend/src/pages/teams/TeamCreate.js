import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";

const TeamCreate = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"create"} title={"PIRSOFT: Tworzenie zespołu"}/>)
}
export default TeamCreate;