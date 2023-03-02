import {useParams} from "react-router-dom";
import TeamWindow from "./TeamWindow";

const TeamView = () => {
    const {id} = useParams()

    return (<TeamWindow id={id} mode={"view"} title={"PIRSOFT: Wyświetlanie danych zespołu"}/>)
}
export default TeamView;