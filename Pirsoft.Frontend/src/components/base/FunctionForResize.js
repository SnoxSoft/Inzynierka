
function FunctionForResize(currentComponent, {setWantedHeightForList}){
    function handleResize() {
        // Set window width/height to state
        const elem = document.getElementById("left-menu");

        const elem2 = document.getElementById(currentComponent);
        if(elem != null && elem2 != null){
            const rect = elem.getBoundingClientRect();
            const rect2 = elem2.getBoundingClientRect();

            const wantedHeight = rect.height - (rect2.y - rect.y);
            setWantedHeightForList(wantedHeight)
        }

    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

}

export default FunctionForResize;