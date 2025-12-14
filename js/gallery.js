let currentImageIndex = {};

function nextImage(button) {
    const gallery = button.parentElement;
    const img = gallery.querySelector('.gallery-image');
    const images = JSON.parse(gallery.dataset.images);
    const galleryId = gallery.dataset.images;
    
    if (!currentImageIndex[galleryId]) currentImageIndex[galleryId] = 0;
    
    currentImageIndex[galleryId] = (currentImageIndex[galleryId] + 1) % images.length;
    img.src = images[currentImageIndex[galleryId]];
}

function previousImage(button) {
    const gallery = button.parentElement;
    const img = gallery.querySelector('.gallery-image');
    const images = JSON.parse(gallery.dataset.images);
    const galleryId = gallery.dataset.images;
    
    if (!currentImageIndex[galleryId]) currentImageIndex[galleryId] = 0;
    
    currentImageIndex[galleryId] = currentImageIndex[galleryId] === 0 ? images.length - 1 : currentImageIndex[galleryId] - 1;
    img.src = images[currentImageIndex[galleryId]];
}