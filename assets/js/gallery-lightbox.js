// assets/js/gallery-lightbox.js
let currentIndex = 0;
let imageItems = [];

// 初始化函数
function initGallery() {
    imageItems = Array.from(document.querySelectorAll('.photo-item'));
    const lightboxEl = document.getElementById('lightbox');
    const imgContainer = document.getElementById('image-container');

    if (imgContainer) {
        imgContainer.onclick = function(e) {
            if (e.target.closest('.caption-trigger')) return;
            const rect = this.getBoundingClientRect();
            if ((e.clientX - rect.left) < rect.width / 2) prevPhoto();
            else nextPhoto();
        };
    }

    // 手机滑动
    let touchStartX = 0;
    if (lightboxEl) {
        lightboxEl.ontouchstart = e => { touchStartX = e.changedTouches[0].screenX; };
        lightboxEl.ontouchend = e => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextPhoto();
            if (touchEndX - touchStartX > 50) prevPhoto();
        };
    }
}

function openLightbox(el) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    document.body.appendChild(lightbox); // 核心：移动到 body 根部
    currentIndex = imageItems.indexOf(el);
    updateLightboxContent();
    document.body.style.overflow = 'hidden';
    lightbox.style.display = 'flex';
    setTimeout(() => { lightbox.classList.add('active'); }, 10);
}

function updateLightboxContent() {
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('caption-text');
    const currentItem = imageItems[currentIndex];
    if (lbImg && currentItem) {
        lbImg.src = currentItem.querySelector('img').src;
        lbCaption.innerHTML = currentItem.querySelector('.hidden-caption').innerHTML;
    }
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % imageItems.length;
    updateLightboxContent();
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + imageItems.length) % imageItems.length;
    updateLightboxContent();
}

function toggleCaption(e) {
    if(e) e.stopPropagation();
    const lightbox = document.getElementById('lightbox');
    const isShowing = lightbox.getAttribute('data-has-caption') === 'true';
    lightbox.setAttribute('data-has-caption', !isShowing);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// 确保页面加载后初始化
window.onload = initGallery;