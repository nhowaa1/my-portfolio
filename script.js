let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*="' + id + '"]');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });
};

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar) {
            navbar.classList.remove('active');
        }
        if (menuIcon) {
            menuIcon.classList.remove('bx-x');
        }
    });
});

document.addEventListener('click', (event) => {
    if (!navbar || !menuIcon) return;

    const clickedInsideNav = navbar.contains(event.target);
    const clickedMenu = menuIcon.contains(event.target);

    if (!clickedInsideNav && !clickedMenu && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

const contactForm = document.querySelector('#contactForm');
const formAlert = document.querySelector('#formAlert');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formAlert.className = 'form-alert error';
            formAlert.textContent = 'Please fill in all the required fields before submitting.';
            return;
        }

        const name = document.querySelector('#fullName').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const subject = document.querySelector('#subject').value.trim();
        const message = document.querySelector('#message').value.trim();

        const mailtoLink = `mailto:nhowaargallon8@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`)}`;

        try {
            window.location.href = mailtoLink;
            contactForm.reset();
            formAlert.className = 'form-alert success';
            formAlert.textContent = 'Success! Your message has been prepared for nhowaargallon8@gmail.com.';
        } catch (error) {
            formAlert.className = 'form-alert error';
            formAlert.textContent = 'Failed to submit. Please try again.';
        }
    });
}

const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalImage = document.querySelector('#modalImage');
const modalDescription = document.querySelector('#modalDescription');
const modalClose = document.querySelector('.project-modal-close');

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
    }
}

if (projectModal && modalClose && modalTitle && modalImage && modalDescription) {
    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) return;

            modalTitle.textContent = card.dataset.title;
            modalImage.src = card.dataset.image;
            modalImage.alt = card.dataset.title;
            modalDescription.textContent = card.dataset.description;
            projectModal.classList.add('active');
        });
    });

    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProjectModal();
        closeImageLightbox();
    }
});

const imageLightbox = document.querySelector('#imageLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxClose = document.querySelector('.image-lightbox-close');

function openImageLightbox(src, alt) {
    if (lightboxImage && imageLightbox) {
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        imageLightbox.classList.add('active');
    }
}

function closeImageLightbox() {
    if (imageLightbox && lightboxImage) {
        imageLightbox.classList.remove('active');
        lightboxImage.src = '';
    }
}

document.querySelectorAll('.lightbox-image').forEach(img => {
    img.addEventListener('click', () => {
        if (img.src) {
            openImageLightbox(img.src, img.alt || 'Portfolio image');
        }
    });
});

if (lightboxClose && imageLightbox) {
    lightboxClose.addEventListener('click', closeImageLightbox);
    imageLightbox.addEventListener('click', (event) => {
        if (event.target === imageLightbox) {
            closeImageLightbox();
        }
    });
}