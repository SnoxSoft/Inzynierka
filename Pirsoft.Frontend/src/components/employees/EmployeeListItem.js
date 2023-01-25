import React, { useRef, useEffect } from "react";
import EmployeeListItemDropdown from "./EmployeeListItemDropdown";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {

            console.log(ref);
            if (ref.current && !ref.current.contains(event.target)) {
                //alert("You clicked outside of me!");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const EmployeeListItem = ({employee}) => {
    const wrapperRef = useRef(null);
    //useOutsideAlerter(wrapperRef);

    const onEmployeeClick = (post) => {
        //console.log(post)
        const el = document.getElementById(`li_${employee.id}`);

        //el.addEventListener(onmouseout())
        const menu = document.getElementById(`drop_menu_${employee.id}`);

        if(menu != null){

            console.log(el);
        }
    }

    return <EmployeeListItemDropdown ref={wrapperRef} employee={employee} />

}

export default EmployeeListItem;

//