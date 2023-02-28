
import React from "react";

const EmptyTeamRow = ({team, day, row, colTeam}) => {

    return <div key={"empty-column-for-team-"+day.dayOfMonth+"-"+team.value}
                className={"row-start-"+row+" col-start-"+colTeam+" text-workday"}>
    </div>
}

export default EmptyTeamRow;