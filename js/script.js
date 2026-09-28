const layouts = document.querySelectorAll(".option")

layouts.forEach((layout) => {
    layout.addEventListener("click", () => {
        console.log(layout.id)
        localStorage.setItem("selectedLayout", layout.id)
        window.location.href = "editorialPage.html"

    })
})
