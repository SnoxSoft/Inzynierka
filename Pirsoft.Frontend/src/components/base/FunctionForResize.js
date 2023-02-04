
function FunctionForResize(currentComponentId, {setWantedHeightForList}){
    function handleResize() {
        // Set window width/height to state
        const leftMenuComponent = document.getElementById("left-menu");

        const currentComponent = document.getElementById(currentComponentId);
        if(leftMenuComponent != null && currentComponent != null){
            const leftMenuPosition = leftMenuComponent.getBoundingClientRect();
            const currentComponentPosition = currentComponent.getBoundingClientRect();

            const wantedHeight = leftMenuPosition.height - (currentComponentPosition.y - leftMenuPosition.y);
            setWantedHeightForList(wantedHeight)
        }

    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

}

export default FunctionForResize;