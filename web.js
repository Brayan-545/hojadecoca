// web.js - Archivo principal de funcionalidad para EnergyAce

// 1. Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // 2. Variables globales
    const orderBtn = document.getElementById('orderBtn');
    const contactForm = document.getElementById('contactForm');
    const mobileMenuBtn = document.querySelector('.md\\:hidden.flex.items-center');
    const mobileMenu = document.querySelector('.hidden.md\\:flex.space-x-8');

    // 3. Efecto del botón de ordenar
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            // Animación de pulse más pronunciada
            this.classList.add('animate-ping');
            setTimeout(() => {
                this.classList.remove('animate-ping');
                // Redirigir a una página de pedido o mostrar modal
                showOrderModal();
            }, 500);
        });
    }

    // 4. Manejo del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showAlert('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío (en producción sería una petición AJAX)
            showAlert('Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            contactForm.reset();
        });
    }

    // 5. Menú móvil toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            mobileMenu.classList.toggle('flex-col');
            mobileMenu.classList.toggle('absolute');
            mobileMenu.classList.toggle('top-16');
            mobileMenu.classList.toggle('right-4');
            mobileMenu.classList.toggle('bg-white');
            mobileMenu.classList.toggle('p-4');
            mobileMenu.classList.toggle('rounded-lg');
            mobileMenu.classList.toggle('shadow-md');
        });
    }

    // 6. Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'right-4', 'bg-white', 'p-4', 'rounded-lg', 'shadow-md');
                }
            }
        });
    });

    // 7. Intersection Observer para animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Inicializar animaciones
    animateOnScroll();
});

// 8. Funciones auxiliares
function showOrderModal() {
    // Crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6 animate-scale-in">
            <h3 class="text-2xl font-bold text-energy-green mb-4">¡Ordenar EnergyAce!</h3>
            <p class="mb-6">Próximamente podrás ordenar tu helado de hoja de coca directamente desde aquí.</p>
            <p class="text-sm text-gray-500 mb-6">Por ahora, contáctanos a través del formulario o visítanos en nuestro local.</p>
            <div class="flex justify-end space-x-3">
                <button id="closeModal" class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Cerrar</button>
                <a href="#contacto" class="px-4 py-2 rounded-lg bg-energy-green text-white hover:bg-green-700 transition">Contacto</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.classList.add('animate-scale-out');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
}

function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green15B7E6 text-green-800' : 'bg-red-100 text-red-800'} animate-fade-in`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('animate-fade-out');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 3000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 9. Animaciones CSS (para ser inyectadas si no se usa Tailwind)
function injectCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes scaleOut {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(0.9); opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .animate-scale-in {
            animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-scale-out {
            animation: scaleOut 0.3s ease-out forwards;
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-out {
            animation: fadeOut 0.3s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Inyectar animaciones al cargar
injectCSSAnimations();
