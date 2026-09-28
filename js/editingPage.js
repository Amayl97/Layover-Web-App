const selectedLayout = localStorage.getItem("selectedLayout");

const layouts = document.querySelectorAll(".polaroidLayout");

layouts.forEach(layout => {
     console.log("hello")
    if (layout.id === selectedLayout) {

        layout.classList.remove("hide");

        if (layout.id === "fourPics") {
            layout.style.display = "grid";
        } else {
            layout.style.display = "flex";
        }

    }

});