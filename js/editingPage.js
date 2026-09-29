const editingPanelSection = document.querySelector(".editingPanel");
const downloadPanelSection = document.querySelector(".downloadSection");
const selectedLayoutId = localStorage.getItem("selectedLayout");
const selectedLayout = document.getElementById(selectedLayoutId);
const imgInpBtn = document.getElementById("imgInpBtn");
const imgInput = document.getElementById("imageInput");
const saveBtn = document.getElementById("save");
const homeBtn = document.querySelectorAll(".home");

homeBtn.forEach((home) => {
  home.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
const imageRequirements = {
  onePic: 1,
  threePics: 3,
  fourPics: 4,
};

const requiredImages = imageRequirements[selectedLayoutId];

const layouts = document.querySelectorAll(".polaroidLayout");

layouts.forEach((layout) => {
  if (layout.id === selectedLayoutId) {
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
  imgInput.click();
});

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
  const images = document.querySelectorAll(`#${selectedLayoutId} img`);

  Array.from(files).forEach((file, index) => {
    images[index].src = URL.createObjectURL(file);
  });

  saveBtn.classList.remove("disable")
});

saveBtn.addEventListener("click", () => {
     
    editingPanelSection.classList.add("hide");
    downloadPanelSection.classList.remove("hide");

    const developedPolaroid = document.querySelector(".developedPolaroid");
    const copy = selectedLayout.cloneNode(true);
    developedPolaroid.append(copy);
    console.log(copy);
 
});
