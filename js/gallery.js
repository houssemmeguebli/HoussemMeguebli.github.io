/* ============================================================
   gallery.js – thumbnail slideshow + lightbox
   ============================================================ */

let currentImageIndex = {};

/* ---------- thumbnail prev / next ---------- */
function nextImage(button) {
    const gallery = button.parentElement;
    const img     = gallery.querySelector('.gallery-image');
    const images  = JSON.parse(gallery.dataset.images);
    const id      = gallery.dataset.images;

    if (currentImageIndex[id] == null) currentImageIndex[id] = 0;
    currentImageIndex[id] = (currentImageIndex[id] + 1) % images.length;
    img.src = images[currentImageIndex[id]];
}

function previousImage(button) {
    const gallery = button.parentElement;
    const img     = gallery.querySelector('.gallery-image');
    const images  = JSON.parse(gallery.dataset.images);
    const id      = gallery.dataset.images;

    if (currentImageIndex[id] == null) currentImageIndex[id] = 0;
    currentImageIndex[id] = currentImageIndex[id] === 0
        ? images.length - 1
        : currentImageIndex[id] - 1;
    img.src = images[currentImageIndex[id]];
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
let _lbImages  = [];
let _lbCurrent = 0;

function _buildLightbox() {
    if (document.getElementById('lb-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.innerHTML = `
        <div id="lb-backdrop"></div>
        <div id="lb-dialog">
            <button id="lb-close" aria-label="Close"><i class="bi bi-x-lg"></i></button>
            <button id="lb-prev"  aria-label="Previous"><i class="bi bi-chevron-left"></i></button>
            <div id="lb-img-wrap">
                <img id="lb-main-img" src="" alt="Gallery Image">
                <div id="lb-loader"><span></span></div>
            </div>
            <button id="lb-next" aria-label="Next"><i class="bi bi-chevron-right"></i></button>
            <div id="lb-counter"></div>
            <div id="lb-thumbnails"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    /* events */
    document.getElementById('lb-backdrop').onclick = closeLightbox;
    document.getElementById('lb-close').onclick    = closeLightbox;
    document.getElementById('lb-prev').onclick     = () => lbGo(_lbCurrent - 1);
    document.getElementById('lb-next').onclick     = () => lbGo(_lbCurrent + 1);

    /* keyboard */
    document.addEventListener('keydown', e => {
        if (!overlay.classList.contains('lb-open')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowRight')  lbGo(_lbCurrent + 1);
        if (e.key === 'ArrowLeft')   lbGo(_lbCurrent - 1);
    });

    /* touch swipe */
    let touchX = 0;
    overlay.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) lbGo(dx < 0 ? _lbCurrent + 1 : _lbCurrent - 1);
    });
}

function openLightbox(images, startIndex) {
    _buildLightbox();
    _lbImages  = images;
    _lbCurrent = startIndex;

    const overlay = document.getElementById('lb-overlay');
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';

    _lbRenderThumbs();
    _lbShowImage(_lbCurrent);
}

function closeLightbox() {
    const overlay = document.getElementById('lb-overlay');
    if (overlay) overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
}

function lbGo(idx) {
    _lbCurrent = (idx + _lbImages.length) % _lbImages.length;
    _lbShowImage(_lbCurrent);
}

function _lbShowImage(idx) {
    const img    = document.getElementById('lb-main-img');
    const loader = document.getElementById('lb-loader');
    const ctr    = document.getElementById('lb-counter');

    loader.style.display = 'flex';
    img.style.opacity    = '0';

    img.onload = () => {
        loader.style.display = 'none';
        img.style.opacity    = '1';
    };
    img.onerror = () => { loader.style.display = 'none'; img.style.opacity = '0.3'; };
    img.src     = _lbImages[idx];
    ctr.textContent = `${idx + 1} / ${_lbImages.length}`;

    /* highlight active thumb */
    document.querySelectorAll('#lb-thumbnails .lb-thumb').forEach((t, i) => {
        t.classList.toggle('lb-thumb-active', i === idx);
    });
}

function _lbRenderThumbs() {
    const container = document.getElementById('lb-thumbnails');
    container.innerHTML = '';
    _lbImages.forEach((src, i) => {
        const t  = document.createElement('div');
        t.className = 'lb-thumb' + (i === _lbCurrent ? ' lb-thumb-active' : '');
        t.style.backgroundImage = `url('${src}')`;
        t.addEventListener('click', () => lbGo(i));
        container.appendChild(t);
    });
}

/* ============================================================
   Wire up click on gallery images after DOM ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.image-gallery').forEach(gallery => {
        const images = JSON.parse(gallery.dataset.images);
        const img    = gallery.querySelector('.gallery-image');
        const id     = gallery.dataset.images;

        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const current = currentImageIndex[id] ?? 0;
            openLightbox(images, current);
        });
    });
});