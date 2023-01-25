import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values}) => {


    return <ul>
        {values.map(p => <EmployeeListItem key={p.id} employee={p}/>)}
    </ul>
}

export default EmployeesList;