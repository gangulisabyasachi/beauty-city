const eventSelect = document.getElementById('event-select');
const gallery = document.getElementById('gallery');
const noEventMsg = document.getElementById('no-event');
const noImagesMsg = document.getElementById('no-images');

// Simple lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img src="">';
lightbox.onclick = () => lightbox.classList.remove('active');
document.body.appendChild(lightbox);

// List of common image extensions to try
const extensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

eventSelect.addEventListener('change', function () {
  const eventFolder = this.value.trim();

  // Reset
  gallery.innerHTML = '';
  noEventMsg.classList.add('hidden');
  noImagesMsg.classList.add('hidden');

  if (!eventFolder) {
    noEventMsg.classList.remove('hidden');
    return;
  }

  // We'll generate possible image names (common patterns people use)
  const possibleNames = [
    // Common camera patterns
    'DSC_', 'IMG_', 'PXL_', 'MVIMG_', 'VID_', 
    // Date-based
    '202', // e.g., 20250123_123456
    // Generic
    'photo', 'image', 'pic', 'picture', 'snap', 'event'
  ];

  let imagesFound = 0;
  const checked = new Set();

  // Try up to 200 possible combinations
  for (let base of possibleNames) {
    for (let num = 1; num <= 200; num++) {
      for (let ext of extensions) {
        let filename = `${base}${num.toString().padStart(4, '0')}.${ext.toLowerCase()}`;
        let url = `events/${eventFolder}/${filename}`;

        if (checked.has(url)) continue;
        checked.add(url);

        const img = new Image();
        img.src = url;

        img.onload = () => {
          imagesFound++;
          createGalleryImage(url);
        };
      }
    }
  }

  // Also try completely generic names like "1.jpg", "photo1.png", etc.
  for (let i = 1; i <= 100; i++) {
    for (let ext of extensions) {
      let url1 = `events/${eventFolder}/${i}.${ext}`;
      let url2 = `events/${eventFolder}/photo${i}.${ext}`;
      let url3 = `events/${eventFolder}/image${i}.${ext}`;
      let url4 = `events/${eventFolder}/pic${i}.${ext}`;

      [url1, url2, url3, url4].forEach(url => {
        if (checked.has(url)) return;
        checked.add(url);

        const img = new Image();
        img.src = url;
        img.onload = () => {
          imagesFound++;
          createGalleryImage(url);
        };
      });
    }
  }

  // Fallback message after delay
  setTimeout(() => {
    if (imagesFound === 0) {
      noImagesMsg.classList.remove('hidden');
    }
  }, 3000);
});

function createGalleryImage(src) {
  const galleryImg = document.createElement('img');
  galleryImg.src = src;
  galleryImg.alt = 'Event photo';
  galleryImg.loading = 'lazy'; // Better performance

  galleryImg.onclick = (e) => {
    e.stopPropagation();
    lightbox.querySelector('img').src = src;
    lightbox.classList.add('active');
  };

  gallery.appendChild(galleryImg);
}