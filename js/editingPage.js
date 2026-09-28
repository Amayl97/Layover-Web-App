const selectedLayout = localStorage.getItem("selectedLayout");
const imgInpBtn = document.getElementById("imgInpBtn");
const imgInput = document.getElementById("imageInput")
const imageRequirements = {
    onePic: 1,
    threePics: 3,
    fourPics: 4
};

const requiredImages = imageRequirements[selectedLayout];

const layouts = document.querySelectorAll(".polaroidLayout");

layouts.forEach(layout => {
    if (layout.id === selectedLayout) {

        layout.classList.remove("hide");

        if (layout.id === "fourPics") {
            layout.style.display = "grid";
        } else {
            layout.style.display = "flex";
        }

    }

});

// For clicking input button
imgInpBtn.addEventListener("click", () => {
    imgInput.click()
})

// For selecting the specific number of images and displaying them
imgInput.addEventListener("change", () => {
    // store files in files variable
    const files = imgInput.files;
    // Check if the number of selected images is equal to the number of required images
    if (files.length !== requiredImages) {
        alert(`Please select exactly ${requiredImages} image(s).`);
        imgInput.value = "";
        return;
    }


    // Accessing the images from the layout so that we can replace them with selected images
    const images = document.querySelectorAll(`#${selectedLayout} img`);

     Array.from(files).forEach((file, index) => {
    images[index].src = URL.createObjectURL(file);
});
});