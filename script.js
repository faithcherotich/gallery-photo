const gallery = document.getElementById('gallery');
const form = document.getElementById('image-form');
const imageUrlInput = document.getElementById('image-url');
const imageCaptionInput = document.getElementById('image-caption');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const deleteBtn = document.getElementById('delete-image');
const editBtn = document.getElementById('edit-image');

let currentImageIndex = null; // Store the index of the currently viewed image

// Function to retrieve images from localStorage
function loadGalleryImages() {
    const storedImages = localStorage.getItem('galleryImages');
    return storedImages ? JSON.parse(storedImages) : [];
}

// Function to save images to localStorage
function saveGalleryImages() {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
}

// Load initial images from localStorage
let galleryImages = loadGalleryImages();

// Function to render the gallery
function renderGallery() {
    gallery.innerHTML = ''; // Clear existing gallery

    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.caption}" data-index="${index}" loading="lazy">
        `;
        
        gallery.appendChild(galleryItem);
    });

    // Add click event to each image to open modal
    document.querySelectorAll('.gallery-item img').forEach(item => {
        item.addEventListener('click', function() {
            currentImageIndex = this.getAttribute('data-index'); // Get index from data attribute
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });
}

// Handle form submission to add a new image
form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const newImageUrl = imageUrlInput.value;
    const newImageCaption = imageCaptionInput.value;

    // Add the new image to the galleryImages array
    galleryImages.push({ url: newImageUrl, caption: newImageCaption });

    // Save the updated galleryImages to localStorage
    saveGalleryImages();

    // Clear the input fields
    imageUrlInput.value = '';
    imageCaptionInput.value = '';

    // Re-render the gallery
    renderGallery();
});

// Close modal on clicking the 'X' button
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

// Close the modal when the user clicks outside the modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


deleteBtn.addEventListener('click', function() {
    if (currentImageIndex !== null) {
       
        galleryImages.splice(currentImageIndex, 1);

       
        saveGalleryImages();

        // Close the modal
        modal.style.display = "none";

        // Re-render the gallery
        renderGallery();
        currentImageIndex = null; 
    }
});

// Edit an image
editBtn.addEventListener('click', function() {
    if (currentImageIndex !== null) {
        
        const newUrl = prompt("Enter new image URL", galleryImages[currentImageIndex].url);
        const newCaption = prompt("Enter new caption", galleryImages[currentImageIndex].caption);

        // Update the image in the array
        if (newUrl && newCaption) {
            galleryImages[currentImageIndex].url = newUrl;
            galleryImages[currentImageIndex].caption = newCaption;

            // Save the updated galleryImages to localStorage
            saveGalleryImages();

            
            modal.style.display = "none";

            
            
            renderGallery();
        }
    }
});


renderGallery();