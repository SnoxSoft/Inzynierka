import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";
import {pageNameTeamView} from "../../GlobalAppConfig";

const TeamView = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"view"} title={pageNameTeamView}/>)
}
export default TeamView;