
const homeSection = document.getElementById("homeSection");
const loadingState = document.getElementById("loadingState");

window.addEventListener("load", () => {

    loadingState.classList.remove("hide");
    homeSection.classList.add("hide");

    setTimeout(() => {
        loadingState.classList.add("hide");
        homeSection.classList.remove("hide");
    }, 1800);

});
const layouts = document.querySelectorAll(".option")

layouts.forEach((layout) => {
    layout.addEventListener("click", () => {
        console.log(layout.id)
        localStorage.setItem("selectedLayout", layout.id)
        window.location.href = "editorialPage.html"

    })
})
