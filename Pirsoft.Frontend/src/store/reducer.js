import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = [{"login": "wanda123","id":"W3IbXluGxG1mnV5c5jzAL","password":"1234"},{"login": "fancia321","id":"zEKNaoCrcNnGvY67w6TeI","password":"333"}]
const saveToSession = (data) => {
    sessionStorage.setItem(`data`, JSON.stringify(data));
}

const loadFromSession = () => {
    let data;

    try{
        data = JSON.parse(sessionStorage.getItem(`data`));
    }catch(e){
        data = null;
    }

    if(!data){
        return initialState;
    }

    return data;
}

const postSlice = createSlice({
    name: 'userData',
    initialState: loadFromSession()
});

const selectAll = () => (state) => state.userData;
const selectId = (id) => (state) => state.userData.find(p => p.id.toString() === id?.toString());

export {selectAll, selectId};

export default postSlice.reducer;