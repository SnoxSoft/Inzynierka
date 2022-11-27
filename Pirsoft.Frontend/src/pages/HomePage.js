import {FiSmile} from "react-icons/fi";

function HomePage(){

    return(
        <div className={"text-center block"}>
            <div style={{height: "20vh"}} className={"text-center mt-5"}>
                To jest strona główna
                <br/>i tu pojawi się okno logowania/rejestracji
                <br/><FiSmile className={"align-middle text-center inline-flex"}/>

            </div>
        </div>


    );
}

export default HomePage;