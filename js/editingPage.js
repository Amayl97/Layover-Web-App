const editingPanelSection = document.querySelector(".editingPanel");
const downloadPanelSection = document.querySelector(".downloadSection");
const selectedLayoutId = localStorage.getItem("selectedLayout");
const selectedLayout = document.getElementById(selectedLayoutId);
let activePolaroid = selectedLayout;
const imgInpBtn = document.getElementById("imgInpBtn");
const imgInput = document.getElementById("imageInput");
const saveBtn = document.getElementById("save");
const homeBtn = document.querySelectorAll(".home");
const relevantFeatures = document.querySelector(".relevantFeatures");
const colorBtn = document.getElementById("colorBtn");
const designBtn = document.getElementById("designBtn");
const stickerBtn = document.getElementById("stickerBtn");
const downloadBtn = document.getElementById("downloadBtn");


colorBtn.addEventListener("click", () => {

    relevantFeatures.innerHTML = `
        <button class="color" id="red"></button>
        <button class="color" id="pink"></button>
        <button class="color" id="black"></button>
        <button class="color" id="white"></button>
        <button class="color" id="yellow"></button>
        <button class="color" id="orange"></button>
        <button class="color" id="blue"></button>
        <button class="color" id="green"></button>
        <button class="color" id="sky"></button>
        <button class="color" id="purple"></button>
        <button class="color" id="gray"></button>
    `;

    document.querySelectorAll(".color").forEach(color => {

        color.addEventListener("click", () => {

            if (!activePolaroid) return;

            activePolaroid.style.backgroundColor =
                getComputedStyle(color).backgroundColor;

        });

    });

});



designBtn.addEventListener("click", () => {

    relevantFeatures.innerHTML = `
        <button class="design" data-design="none">Plain</button>
        <button class="design" data-design="grid">Grid</button>
        <button class="design" data-design="dots">Dots</button>
        <button class="design" data-design="stripes">Stripes</button>
    `;

    document.querySelectorAll(".design").forEach(design => {

        design.addEventListener("click", () => {

            if (!activePolaroid) return;

            activePolaroid.classList.remove(
                "design-grid",
                "design-dots",
                "design-stripes"
            );

            if (design.dataset.design !== "none") {
                activePolaroid.classList.add(
                    `design-${design.dataset.design}`
                );
            }

        });

    });

});
stickerBtn.addEventListener("click", () => {

    relevantFeatures.innerHTML = `
        <button class="sticker">🌸</button>
        <button class="sticker">⭐</button>
        <button class="sticker">💗</button>
        <button class="sticker">🦋</button>
        <button class="sticker">🎀</button>
        <button class="sticker">✨</button>
        <button class="sticker">☁️</button>
        <button class="sticker">🍓</button>
    `;

    document.querySelectorAll(".sticker").forEach(sticker => {

        sticker.addEventListener("click", () => {

            if (!activePolaroid) return;

            const newSticker = document.createElement("span");

            newSticker.classList.add("placedSticker");
            newSticker.textContent = sticker.textContent;

            // Starting position
            newSticker.style.left = "50%";
            newSticker.style.top = "50%";

            activePolaroid.appendChild(newSticker);

            makeDraggable(newSticker, activePolaroid);
        });

    });

});
function makeDraggable(sticker, container) {

    let isDragging = false;
    let offsetX;
    let offsetY;

    sticker.addEventListener("pointerdown", (event) => {

        isDragging = true;

        const stickerRect = sticker.getBoundingClientRect();

        offsetX = event.clientX - stickerRect.left;
        offsetY = event.clientY - stickerRect.top;

        sticker.setPointerCapture(event.pointerId);

    });

    sticker.addEventListener("pointermove", (event) => {

        if (!isDragging) return;

        const containerRect = container.getBoundingClientRect();

        const x = event.clientX - containerRect.left - offsetX;
        const y = event.clientY - containerRect.top - offsetY;

        sticker.style.left = `${x}px`;
        sticker.style.top = `${y}px`;

    });

    sticker.addEventListener("pointerup", () => {

        isDragging = false;

    });

}


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

downloadBtn.addEventListener("click", async () => {
    const polaroid = document.querySelector(
        ".developedPolaroid > .polaroidLayout"
    );

    const oldAnimation = polaroid.style.animation;
    const oldTransform = polaroid.style.transform;

    polaroid.style.animation = "none";
    polaroid.style.transform = "none";

    await new Promise(resolve => requestAnimationFrame(resolve));

    const rect = polaroid.getBoundingClientRect();

    const canvas = await html2canvas(polaroid, {
        width: rect.width,
        height: rect.height,
        scale: 2,
        backgroundColor: null,
        useCORS: true
    });

    polaroid.style.animation = oldAnimation;
    polaroid.style.transform = oldTransform;

    const link = document.createElement("a");
    link.download = "my-polaroid.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});