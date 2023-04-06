import EmployeeListItem from "./EmployeeListItem";

const EmployeesList = ({values, action, showRequest}) => {

    return <ul>
        {values.map(p => <EmployeeListItem key={p.id} employee={p} action={action} showRequest={showRequest}/>)}
    </ul>
}

export default EmployeesList;