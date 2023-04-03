import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";
import {pageNameTeamEdit} from "../../GlobalAppConfig";

const TeamEdit = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"edit"} title={pageNameTeamEdit}/>)
}
export default TeamEdit;