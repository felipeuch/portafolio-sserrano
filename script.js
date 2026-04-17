document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Nav ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animaciones al hacer scroll (Removidas por optimización) ---
    // Las tarjetas y elementos ahora cargan dinámicamente y de forma nativa por CSS, liberando a Javascript del cálculo continuo de Intersecciones.

    // --- Filtrado del Portafolio ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && items.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                items.forEach(item => {
                    if(filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'flex'; // Usamos flex por la estructura CSS
                        setTimeout(() => { 
                            item.style.opacity = '1'; 
                            item.style.transform = ''; // Reset transform para que Hover/Tilt funcione
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => { 
                            item.style.display = 'none'; 
                        }, 300);
                    }
                });
            });
        });
    }

    // --- Configurar año automático en footer ---
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Simulación de envío del formulario ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Enviando...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = "0.7";
            
            // Simular espera de red y éxito
            setTimeout(() => {
                btn.innerHTML = '<span>Mensaje Enviado</span> <i class="fa-solid fa-check"></i>';
                btn.style.background = "linear-gradient(135deg, #10b981, #059669)"; // Verde éxito
                btn.style.color = "white";
                btn.style.opacity = "1";
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                }, 3500);
            }, 1500);
        });
    }

    // --- Resaltado de enlaces en el Menú principal según el Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Un pequeño offset para detectar antes de llegar exacto
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Video Modal Logic ---
    const videoBtns = document.querySelectorAll('.open-video');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.querySelector('.close-btn');

    if (videoModal && modalVideo) {
        // Abrir Modal
        videoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = btn.getAttribute('data-video-src');
                if(videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.classList.add('fade-in');
                    // El video se abre pausado, esperando que el usuario ponga play
                }
            });
        });

        const closeModal = () => {
            videoModal.classList.remove('fade-in');
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = "";
        };

        // Cerrar al click en "x"
        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        
        // Cerrar al click click fuera del video
        videoModal.addEventListener('click', (e) => {
            if(e.target === videoModal) {
                closeModal();
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && videoModal.classList.contains('fade-in')) {
                closeModal();
            }
        });
    }

});
