document.addEventListener("DOMContentLoaded", function() {
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const resetButton = document.querySelector(".reset-button");
    const eraseButton = document.querySelector(".erase-button");
    const mainContainer = document.querySelector(".main-container");
    const acceptButton = document.getElementById("acceptButton");
    const darkBackground = document.getElementById("darkBackground");

    acceptButton.addEventListener("click", function() {
        hideModal();
    });

    darkBackground.addEventListener("click", function(event) {
        if (event.target === darkBackground) {
            hideModal();
        }
    });

    eraseButton.addEventListener("click", function() {
        mainContainer.classList.add("erase-active");
        
        setTimeout(function() {
            mainContainer.classList.remove("erase-active");
        }, 500);
    });

    eraseButton.addEventListener("click", function() {
        resetToInitialState();
    });

    resetButton.addEventListener("click", function() {
        resetFilters();
    });

    uploadArea.addEventListener("click", function() {
        fileInput.click();
    });

    fileInput.addEventListener("change", function() {
        previewImage();
    });

    const grayscaleRange = document.getElementById("grayscaleRange");
    const brightnessRange = document.getElementById("brightnessRange");
    const contrastRange = document.getElementById("contrastRange");
    const saturateRange = document.getElementById("saturateRange");

    grayscaleRange.addEventListener("input", function() {
        applyFilter();
    });

    brightnessRange.addEventListener("input", function() {
        applyFilter();
    });

    contrastRange.addEventListener("input", function() {
        applyFilter();
    });

    saturateRange.addEventListener("input", function() {
        applyFilter();
    });

    const downloadButton = document.getElementById("downloadButton");

    downloadButton.addEventListener("click", function() {
        downloadImage();
        showModal();
    });

    disableDownloadButton();

    disableControls([grayscaleRange, brightnessRange, contrastRange, saturateRange]);
    downloadButton.setAttribute("disabled", true);
});

function previewImage() {
    const uploadedImage = document.getElementById("uploadedImage");
    const fileInput = document.getElementById("fileInput");
    const divImage = document.querySelector(".div-image");
    const eraseButton = document.querySelector(".erase-button");
    const resetButton = document.querySelector(".reset-button");

    const grayscaleRange = document.getElementById("grayscaleRange");
    const brightnessRange = document.getElementById("brightnessRange");
    const contrastRange = document.getElementById("contrastRange");
    const saturateRange = document.getElementById("saturateRange");

    eraseButton.style.display = "block";
    resetButton.style.display = "block";

    const controls = [grayscaleRange, brightnessRange, contrastRange, saturateRange];

    const selectedImage = fileInput.files[0];

    if (selectedImage) {
        const reader = new FileReader();

        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = "block";
            uploadArea.style.display = "none";
            divImage.style.display = "block";
            enableControls(controls);
            enableDownloadButton();
            applyFilter();
        };

        reader.readAsDataURL(selectedImage);
    } else {
        uploadedImage.style.display = "none";
        uploadArea.style.display = "block";
        divImage.style.display = "none";
        disableControls(controls);
        disableDownloadButton();
    }
}

function resetToInitialState() {
    const uploadedImage = document.getElementById("uploadedImage");
    const uploadArea = document.getElementById("uploadArea");
    const divImage = document.querySelector(".div-image");
    const fileInput = document.getElementById("fileInput");
    const eraseButton = document.querySelector(".erase-button");
    const resetButton = document.querySelector(".reset-button");

    const grayscaleRange = document.getElementById("grayscaleRange");
    const brightnessRange = document.getElementById("brightnessRange");
    const contrastRange = document.getElementById("contrastRange");
    const saturateRange = document.getElementById("saturateRange");

    const controls = [grayscaleRange, brightnessRange, contrastRange, saturateRange];

    eraseButton.style.display = "none";
    resetButton.style.display = "none";
    uploadedImage.style.display = "none";
    uploadArea.style.display = "flex";
    divImage.style.display = "none";
    fileInput.value = "";
    disableControls(controls);
    disableDownloadButton();
    resetFilters();
}

function applyFilter() {
    const uploadedImage = document.getElementById("uploadedImage");

    const grayscaleRange = document.getElementById("grayscaleRange");
    const brightnessRange = document.getElementById("brightnessRange");
    const contrastRange = document.getElementById("contrastRange");
    const saturateRange = document.getElementById("saturateRange");

    const grayscaleValueLabel = document.getElementById("grayscaleValue");
    const brightnessValueLabel = document.getElementById("brightnessValue");
    const contrastValueLabel = document.getElementById("contrastValue");
    const saturateValueLabel = document.getElementById("saturateValue");

    const grayscaleValue = grayscaleRange.value * 10;
    const brightnessValue = brightnessRange.value * 20;
    const contrastValue = contrastRange.value * 20;
    const saturateValue = saturateRange.value * 20;

    grayscaleValueLabel.textContent = `${grayscaleValue}%`;
    brightnessValueLabel.textContent = `${brightnessValue}%`;
    contrastValueLabel.textContent = `${contrastValue}%`;
    saturateValueLabel.textContent = `${saturateValue}%`;

    uploadedImage.style.filter = `grayscale(${grayscaleValue / 100}) brightness(${brightnessValue / 100}) contrast(${contrastValue / 100}) saturate(${saturateValue / 100})`;
}

function downloadImage() {
    const uploadedImage = document.getElementById("uploadedImage");

    applyFilter();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = uploadedImage.naturalWidth;
    canvas.height = uploadedImage.naturalHeight;

    context.filter = uploadedImage.style.filter;
    context.drawImage(uploadedImage, 0, 0);

    const editedImageBase64 = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");

    downloadLink.href = editedImageBase64;
    downloadLink.download = "edited_image.png";
    downloadLink.click();
}

function resetFilters() {
    const grayscaleRange = document.getElementById("grayscaleRange");
    const brightnessRange = document.getElementById("brightnessRange");
    const contrastRange = document.getElementById("contrastRange");
    const saturateRange = document.getElementById("saturateRange");

    grayscaleRange.value = 0;
    brightnessRange.value = 5;
    contrastRange.value = 5;
    saturateRange.value = 5;

    applyFilter();
}

function hideModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
    darkBackground.style.display = "none";
}

function showModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
    darkBackground.style.display = "block";
}

function enableControls(controls) {
    controls.forEach(control => {
        control.removeAttribute("disabled");
    });
}

function disableControls(controls) {
    controls.forEach(control => {
        control.setAttribute("disabled", true);
    });
}

function enableDownloadButton() {
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.removeAttribute("disabled");
}

function disableDownloadButton() {
    const downloadButton = document.getElementById("downloadButton");
    downloadButton.setAttribute("disabled", true);
}
