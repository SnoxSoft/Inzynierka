import {useEffect, useState} from "react";
import FunctionForResize from "../components/base/FunctionForResize";

function HomePage(){
    const[wantedHeightsForList, setWantedHeightForList] = useState(0);
    useEffect(() => {
        // Handler to call on window resize
        FunctionForResize("home", {setWantedHeightForList});
    }, []);

    return(
        <div id={"home"}
             className={"bg-green-menu rounded-md border-2 border-b-workday"}
             style={{ height: wantedHeightsForList } }>
            <div className={"text-workday m-4 text-center"}>
                <p>To jest strona główna</p>
                <br/>
                <p>i tu pojawi się okno logowania/rejestracji</p>
            </div>
        </div>


    );
}

export default HomePage;