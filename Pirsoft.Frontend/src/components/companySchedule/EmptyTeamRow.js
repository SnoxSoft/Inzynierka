
import React from "react";

const EmptyTeamRow = ({row, colTeam, id}) => {

    return <div id={id} key={id}
                className={"row-start-"+row+" col-start-"+colTeam+" text-workday"}>
    </div>
}

export default EmptyTeamRow;