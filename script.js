document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Controle do Menu Mobile & Scroll do Header ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const mainHeader = document.getElementById("mainHeader");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add("scrolled");
        } else {
            mainHeader.classList.remove("scrolled");
        }
        checkScrollAnimation();
        updateActiveMenuLink();
    });

    // Fechar menu mobile ao clicar em links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.classList.remove("active");
        });
    });

    // --- 2. Slider Automático da Seção Hero ---
    const slides = document.querySelectorAll("#heroSlider .slide");
    const nextBtn = document.querySelector(".slide-arrow.next");
    const prevBtn = document.querySelector(".slide-arrow.prev");
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 6000);

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    nextBtn.addEventListener("click", () => { nextSlide(); clearInterval(slideInterval); });
    prevBtn.addEventListener("click", () => { prevSlide(); clearInterval(slideInterval); });

    // --- 3. Sistema de Busca de Serviços ---
    const serviceSearch = document.getElementById("serviceSearch");
    const serviceCards = document.querySelectorAll(".service-card");

    serviceSearch.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase().trim();
        serviceCards.forEach(card => {
            const dataKeywords = card.getAttribute("data-service").toLowerCase();
            const cardTitle = card.querySelector("h4").innerText.toLowerCase();
            if (dataKeywords.includes(term) || cardTitle.includes(term)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // --- 4. Contadores Animados ---
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;

    function startCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const increment = target / 50;
            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + (target === 500 || target === 200 || target === 1000 ? "+" : "");
                }
            };
            updateCount();
        });
    }

    // --- 5. Animações ao Scroll (Fading) ---
    const animElements = document.querySelectorAll(".scroll-anim, .stat-box");
    
    function checkScrollAnimation() {
        const triggerBottom = window.innerHeight * 0.85;
        animElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("appear");
                if (el.classList.contains("stat-box") && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                }
            }
        });
    }
    // Inicialização forçada para elementos no topo
    setTimeout(checkScrollAnimation, 300);

    // --- 6. Galeria de Projetos com Filtro & Lightbox ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectItems = document.querySelectorAll(".project-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.querySelector(".lightbox-close");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");

            projectItems.forEach(item => {
                if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Evento Lightbox
    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const imgUrl = item.querySelector("img").src;
            lightboxImg.src = imgUrl;
            lightbox.style.display = "flex";
        });
    });

    lightboxClose.addEventListener("click", () => lightbox.style.display = "none");
    lightbox.addEventListener("click", (e) => { if(e.target === lightbox) lightbox.style.display = "none"; });

    // --- 7. Carrossel de Depoimentos Automático ---
    const testSlides = document.querySelectorAll(".testimonial-slide");
    const testDots = document.querySelectorAll(".testimonial-container .dot");
    let currentTestimonial = 0;

    function showTestimonial(idx) {
        testSlides.forEach(s => s.classList.remove("active"));
        testDots.forEach(d => d.classList.remove("active"));
        testSlides[idx].classList.add("active");
        testDots[idx].classList.add("active");
    }

    testDots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            currentTestimonial = parseInt(e.target.getAttribute("data-index"));
            showTestimonial(currentTestimonial);
        });
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testSlides.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // --- 8. Modo Claro / Escuro ---
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // --- 9. Botão Voltar ao Topo ---
    const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 10. Chat Inteligente Avançado ---
    const chatWidget = document.getElementById("chatWidget");
    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatHeader = document.getElementById("chatHeader");

    // Abrir chat automaticamente após 4 segundos
    setTimeout(() => { chatWidget.classList.add("open"); }, 4000);

    chatHeader.addEventListener("click", () => {
        chatWidget.classList.toggle("open");
    });

    function handleChatResponse() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Adiciona msg do usuário
        appendChatMsg(text, "user");
        chatInput.value = "";

        // Processa resposta lógica simples
        setTimeout(() => {
            let reply = "Desculpe, não entendi. Digite 1 para Planos Rurais, 2 para Suporte Urbano Corporativo ou 3 para falar de Orçamentos.";
            if (text === "1") reply = "Nossos planos rurais contam com Wi-Fi de longo alcance e suporte prioritário para quedas de link. Deixe seu contato no formulário de chamados abaixo para ligarmos para você!";
            if (text === "2") reply = "Para empresas urbanas oferecemos contratos com SLA de até 4 horas, backup monitorado e gestão completa de firewalls. Use nosso formulário de orçamento para uma proposta formal.";
            if (text === "3") reply = "Os orçamentos da Hyperion são emitidos sem custos em até 2 horas úteis. Preencha os campos da seção de Orçamentos rápidos e garanta sua análise hoje mesmo!";
            
            appendChatMsg(reply, "bot");
        }, 800);
    }

    function appendChatMsg(text, sender) {
        const msg = document.createElement("div");
        msg.classList.add("chat-msg", sender);
        msg.innerHTML = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    chatSend.addEventListener("click", handleChatResponse);
    chatInput.addEventListener("keypress", (e) => { if(e.key === "Enter") handleChatResponse(); });

    // --- 11. Links do Menu Ativos por Scroll Geográfico ---
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function updateActiveMenuLink() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // --- 12. Validações e Feedback nos Formulários ---
    const ticketForm = document.getElementById("ticketForm");
    const quoteForm = document.getElementById("quoteForm");

    ticketForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("🚀 Chamado Registrado com Sucesso! Seu número de OS foi enviado para o e-mail e nosso técnico entrará em contato em instantes.");
        ticketForm.reset();
    });

    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("📊 Solicitação de Orçamento Recebida! Nossa equipe de engenharia comercial irá analisar o escopo e retornará em até 2 horas úteis.");
        quoteForm.reset();
    });
});