import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";

const TeamEdit = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"edit"} title={"PIRSOFT: Edycja danych zespołu"}/>)
}
export default TeamEdit;