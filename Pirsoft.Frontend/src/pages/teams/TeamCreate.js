import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";
import {pageNameTeamCreate} from "../../GlobalAppConfig";

const TeamCreate = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"create"} title={pageNameTeamCreate}/>)
}
export default TeamCreate;