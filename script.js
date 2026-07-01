document.addEventListener('DOMContentLoaded', () => {

    // 1. LOADER INICIAL
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500); // Pequena folga para suavidade visual
    });

    // 2. MENU HAMBÚRGUER RESPONSIVO
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. NAVBAR MUDANDO DE COR AO ROLAR & BOTÃO VOLTAR AO TOPO
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Atualizar link ativo no menu dinamicamente
        spyNavigation();
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Funçao Scroll Spy básica
    function spyNavigation() {
        const sections = document.querySelectorAll('section, header');
        let scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        
        sections.forEach(section => {
            if (section.id && (section.offsetTop - 100) <= scrollPos && (section.offsetTop + section.offsetHeight - 100) > scrollPos) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. BOTÕES COM EFEITO RIPPLE (ONDA CONTINUA)
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 5. SLIDER AUTOMÁTICO DE DEPOIMENTOS
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    if(slides.length > 0) {
        setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    // 6. ACCORDION DO FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const body = this.nextElementSibling;
            
            if (item.classList.contains('active')) {
                body.style.maxHeight = null;
                item.classList.remove('active');
            } else {
                // Opcional: Fecha outros itens abertos
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-body').style.maxHeight = null;
                });

                body.style.maxHeight = body.scrollHeight + "px";
                item.classList.add('active');
            }
        });
    });

    // 7. CONTADORES ANIMADOS + SCROLL REVEAL (INTERSECTION OBSERVER)
    const counters = document.querySelectorAll('.counter');
    const speed = 150; // Menor = Mais rápido

    const runCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // Intersection Observer para efeitos de fade in/up na rolagem e disparo do contador
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-reveal');
                
                // Se o elemento contiver contadores, inicia a animação numérica
                if(entry.target.classList.contains('estatistica-item')) {
                    const counterElem = entry.target.querySelector('.counter');
                    if(counterElem) runCounter(counterElem);
                }
                
                observer.unobserve(entry.target); // Executa apenas uma vez
            }
        });
    }, revealOptions);

    const elementsToReveal = document.querySelectorAll('.hidden-reveal, .estatistica-item');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // 8. VALIDAÇÃO E ENVIO DO FORMULÁRIO DO WHATSAPP
    const form = document.getElementById('atendimentoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtenção dos campos
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const aparelho = document.getElementById('aparelho').value;
        const problema = document.getElementById('problema').value.trim();

        // Validação simples amigável
        if (!nome || !telefone || !cidade || !aparelho || !problema) {
            alert('Por favor, preencha todos os campos do formulário para podermos lhe ajudar!');
            return;
        }

        // Construção da mensagem estruturada conforme especificado
        const quebraLinha = "%0A";
        let mensagem = `Olá, meu nome é:${quebraLinha}${nome}${quebraLinha}${quebraLinha}`;
        mensagem += `Telefone:${quebraLinha}${telefone}${quebraLinha}${quebraLinha}`;
        mensagem += `Cidade:${quebraLinha}${cidade}${quebraLinha}${quebraLinha}`;
        mensagem += `Meu aparelho é:${quebraLinha}${aparelho}${quebraLinha}${quebraLinha}`;
        mensagem += `Problema apresentado:${quebraLinha}${problema}${quebraLinha}${quebraLinha}`;
        mensagem += `Gostaria de solicitar atendimento da Hyperion Digital.`;

        // URL do WhatsApp do destinatário
        const numWhatsApp = "5533991098620";
        const urlFinal = `https://wa.me/${numWhatsApp}?text=${mensagem}`;

        // Redireciona abrindo em nova aba
        window.open(urlFinal, '_blank');
    });
});