import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";

function AutoCloseDropdown({employee}) {
    return (
        <>
            <Dropdown className="d-inline mx-2" autoClose={"outside"} drop={"end"}>

                <Dropdown.Toggle>
                    <p id={"employee-menu"} className={"flex flex-row bg-red-700 w- w-max hover:bg-fuchsia-600"}>
                        {employee.avatar ? <img src={"data:image/png;base64," + employee.avatar} alt="Avatar image cap" className={"h-auto w-9"}/> : null}
                        {employee.firstname} {employee.lastname}, {employee.team}, {employee.position}</p>
                </Dropdown.Toggle>

                <Dropdown.Menu show={false} rootCloseEvent={"click"}>
                    <Dropdown.Item id={"employee-menu"} className={"border-solid border-2  border-gray-600 hover:bg-gray-400 text-center"}>WYSTAW WNIOSEK URLOPOWY</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item id={"employee-menu"} className={"border-solid border-2  border-gray-600 hover:bg-gray-400 text-center"} ><Link to={`/employee/${employee.id}`}>POKAŻ PROFIL</Link></Dropdown.Item>

                </Dropdown.Menu>


            </Dropdown>
        </>
    );
}
export default AutoCloseDropdown;