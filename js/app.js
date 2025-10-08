// MG Instalações e Serviços - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Quote Form Handler
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const nome = formData.get('nome').trim();
            const telefone = formData.get('telefone').trim();
            const email = formData.get('email').trim();
            const servico = formData.get('servico');
            const mensagem = formData.get('mensagem').trim();
            
            // Validate required fields
            if (!nome || !telefone || !servico) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Format phone number
            const phoneFormatted = telefone.replace(/\D/g, '');
            
            // Create WhatsApp message
            let whatsappMessage = `*MG INSTALAÇÕES E SERVIÇOS*\n`;
            whatsappMessage += `*SOLICITAÇÃO DE ORÇAMENTO*\n\n`;
            whatsappMessage += `*Nome:* ${nome}\n`;
            whatsappMessage += `*Telefone:* ${telefone}\n`;
            
            if (email) {
                whatsappMessage += `*E-mail:* ${email}\n`;
            }
            
            whatsappMessage += `*Serviço:* ${servico}\n\n`;
            
            if (mensagem) {
                whatsappMessage += `*Mensagem:*\n${mensagem}\n\n`;
            }
            
            whatsappMessage += `---\n`;
            whatsappMessage += `Enviado através do site oficial da MG Instalações e Serviços`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // WhatsApp number (remove any formatting)
            const whatsappNumber = '5592991605925';
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            this.reset();
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Success message function
    function showSuccessMessage() {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #25d366;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                z-index: 10000;
                font-weight: 500;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            ">
                <i class="fas fa-check-circle"></i>
                Redirecionando para o WhatsApp...
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Update active navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});