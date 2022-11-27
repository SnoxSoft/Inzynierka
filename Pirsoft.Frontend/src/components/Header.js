import {Link} from "react-router-dom";
import {FiMenu, FiPlusCircle} from "react-icons/fi";

const Header = () => {

    return <header>
        <div className={"flex p-5"}>
            <div className={"flex-1 text-center"}>
                <Link to={"/"} className={"h-1"}>PIRSOFT</Link>
            </div>
        </div>
    </header>
}

export default Header;