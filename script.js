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

eventSelect.addEventListener('change', async function () {
  const eventFolder = this.value;

  // Reset
  gallery.innerHTML = '';
  noEventMsg.classList.add('hidden');
  noImagesMsg.classList.add('hidden');

  if (!eventFolder) {
    noEventMsg.classList.remove('hidden');
    return;
  }

  // Try to load images from 1 to 100 (adjust if needed)
  let imagesFound = false;

  for (let i = 1; i <= 100; i++) {
    const imgSrc = `events/${eventFolder}/photo${i}.jpg`; // change extension if needed (.png etc)

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      imagesFound = true;

      const galleryImg = document.createElement('img');
      galleryImg.src = imgSrc;
      galleryImg.alt = `Photo ${i}`;

      // Click to enlarge
      galleryImg.onclick = (e) => {
        e.stopPropagation();
        lightbox.querySelector('img').src = imgSrc;
        lightbox.classList.add('active');
      };

      gallery.appendChild(galleryImg);
    };

    // Wait a tiny bit to avoid too many simultaneous requests
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  // After checking all, show message if no images
  setTimeout(() => {
    if (!imagesFound) {
      noImagesMsg.classList.remove('hidden');
    }
  }, 2000);
});