/**
 * Qingdao Summer Language Camp Website Application Logic
 * Implements smooth interactive UI elements, dynamic 14-day schedule switcher, 
 * slider gallery, FAQ accordions, form handling, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER ON SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            const activeNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (activeNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeNavLink.classList.add('active');
                } else {
                    activeNavLink.classList.remove('active');
                }
            }
        });
    });

    /* ==========================================================================
       WHY QINGDAO GALLERY SLIDER
       ========================================================================== */
    const galleryWrapper = document.getElementById('gallery-wrapper');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (galleryWrapper && prevBtn && nextBtn) {
        let currentTranslate = 0;
        const gap = 24; // matches styles.css gap
        
        function getSlideWidth() {
            const firstSlide = galleryWrapper.querySelector('.gallery-slide');
            return firstSlide ? firstSlide.getBoundingClientRect().width : 0;
        }

        function getVisibleSlidesCount() {
            const width = window.innerWidth;
            if (width > 992) return 3;
            if (width > 576) return 2;
            return 1;
        }

        nextBtn.addEventListener('click', () => {
            const slideWidth = getSlideWidth();
            const visibleCount = getVisibleSlidesCount();
            const totalSlides = galleryWrapper.querySelectorAll('.gallery-slide').length;
            const maxScrollIndex = totalSlides - visibleCount;
            
            const maxTranslate = -((slideWidth + gap) * maxScrollIndex);
            
            currentTranslate -= (slideWidth + gap);
            
            if (currentTranslate < maxTranslate) {
                currentTranslate = maxTranslate; // limit scroll
            }
            
            galleryWrapper.style.transform = `translateX(${currentTranslate}px)`;
        });

        prevBtn.addEventListener('click', () => {
            const slideWidth = getSlideWidth();
            
            currentTranslate += (slideWidth + gap);
            
            if (currentTranslate > 0) {
                currentTranslate = 0; // limit scroll
            }
            
            galleryWrapper.style.transform = `translateX(${currentTranslate}px)`;
        });

        // Reset slide position on resize to prevent layout breaking
        window.addEventListener('resize', () => {
            currentTranslate = 0;
            galleryWrapper.style.transform = `translateX(0px)`;
        });
    }

    /* ==========================================================================
       14-DAY DETAILED SCHEDULE DATA MODEL
       ========================================================================== */
    const scheduleData = {
        1: {
            title: "День 1: Встреча и знакомство",
            headline: "Прибытие в Циндао и первый вечер в лагере",
            desc: "Первый день посвящен встрече наших участников, трансферу и мягкой адаптации к совершенно новому климату и культуре.",
            image: "Telegram Desktop/photo_1_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "10:00 - 16:00", text: "Встреча участников в аэропорту Циндао Литин, комфортабельный трансфер в университетский кампус." },
                { time: "16:30 - 18:00", text: "Заселение в комнаты кампуса, разгрузка вещей, знакомство со структурой территории кампуса." },
                { time: "19:00 - 21:00", text: "Приветственный ужин с Миленой, первая уютная свечка-знакомство, обсуждение планов на 14 дней." }
            ]
        },
        2: {
            title: "День 2: Обзор города",
            headline: "Изучение морской столицы и подъем на смотровую",
            desc: "Мы отправляемся знакомиться со знаменитым обликом Циндао — немецкая архитектура, горы, парки и море.",
            image: "Telegram Desktop/photo_2_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Обзорная экскурсия по историческому немецкому кварталу Циндао и посещение знаменитого пирса Чжаньцяо." },
                { time: "13:00 - 16:30", text: "Прогулка по живописному парку Сигнал-Хилл, подъем на вершину для панорамного обзора всего побережья." },
                { time: "18:00 - 21:00", text: "Прогулка по вечерней набережной, первый разбор китайских обиходных фраз с Миленой." }
            ]
        },
        3: {
            title: "День 3: Первый интенсив",
            headline: "Старт занятий и языковой квест на рынке",
            desc: "Учеба начинается! Переходим от теории сразу к практике в реальной городской среде.",
            image: "Telegram Desktop/photo_2_2026-05-28_19-31-11.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Первое интерактивное занятие: основы коммуникации, произношение, числительные и покупки." },
                { time: "13:30 - 16:30", text: "Языковой квест на местном фермерском рынке: задание купить экзотические фрукты, общаясь исключительно на китайском!" },
                { time: "18:00 - 20:30", text: "Разговорный клуб с китайскими студентами-волонтерами, первые шаги преодоления барьера." }
            ]
        },
        4: {
            title: "День 4: Каллиграфия",
            headline: "Искусство каллиграфии и китайский старый город",
            desc: "День эстетического погружения в древние китайские традиции, каллиграфию и чайное искусство.",
            image: "Telegram Desktop/photo_4_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Мастер-класс по китайской традиционной каллиграфии от приглашенного университетского каллиграфа." },
                { time: "13:30 - 17:00", text: "Прогулка по колоритным старым кварталам города Даюань, традиционная чайная церемония в чайном домике." },
                { time: "19:00 - 21:00", text: "Ламповый разбор дня у свечки: делимся эмоциями от соприкосновения с древним искусством." }
            ]
        },
        5: {
            title: "День 5: Челлендж в супермаркете",
            headline: "Утренний интенсив и языковое выживание",
            desc: "Продолжаем повышать сложность. Практикуем лексику продуктов, рецептов и цен в гигантском китайском супермаркете.",
            image: "Telegram Desktop/photo_5_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Интенсив китайского языка: еда, рестораны, вкусы, вежливые просьбы в общественных местах." },
                { time: "13:30 - 16:30", text: "Челлендж в торговом центре: найти и купить необычные китайские сладости по списку подсказок от Милены." },
                { time: "18:00 - 21:00", text: "Пляжные посиделки у моря: обсуждаем результаты челленджа и провожаем потрясающий закат." }
            ]
        },
        6: {
            title: "День 6: Культура и танцы",
            headline: "Мастер-класс традиционного танца и музей Циндао",
            desc: "Знакомство с пластикой китайского танца и посещение ультрасовременного городского музея.",
            image: "Telegram Desktop/photo_6_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Занятие китайским + эксклюзивный мастер-класс по основам традиционного китайского танца." },
                { time: "13:30 - 17:00", text: "Экскурсия в грандиозный Музей Циндао, знакомство с историей Желтого моря и провинции Шаньдун." },
                { time: "18:30 - 21:00", text: "Разговорные игры и викторины в кампусе, закрепление лексики." }
            ]
        },
        7: {
            title: "День 7: Экватор лагеря",
            headline: "Масштабная поездка и день отдыха",
            desc: "Середина смены! Отдыхаем от классических уроков и совершаем увлекательную выездную прогулку.",
            image: "Telegram Desktop/photo_9_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "10:00 - 15:00", text: "Свободное время или поездка в колоритный пригородный поселок у подножия гор Лаошань." },
                { time: "15:30 - 18:00", text: "Пикник на пляже, пляжный волейбол, игры на сплочение всей команды." },
                { time: "19:00 - 21:00", text: "Душевная свечка экватора: обсуждаем, как изменилось наше восприятие Китая за неделю." }
            ]
        },
        8: {
            title: "День 8: Университеты",
            headline: "Учеба и погружение в кампус другого вуза",
            desc: "Сравниваем студенческую жизнь. Посещаем кампус партнерского университета с экскурсией.",
            image: "Telegram Desktop/photo_10_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Занятие китайским: тема 'Образование, университеты, будущая карьера'." },
                { time: "13:30 - 16:30", text: "Экскурсия по гигантскому современному кампусу Университета Циндао, общение с иностранными студентами." },
                { time: "18:00 - 20:30", text: "Киновечер: смотрим культовое китайское кино с русскими субтитрами, разбираем сленг с Миленой." }
            ]
        },
        9: {
            title: "День 9: Лепка пельменей",
            headline: "Исторический квест и мастер-класс по цзяоцзы",
            desc: "Кулинарный шедевр дня! Учимся лепить настоящие китайские пельмени (цзяоцзы) и исследуем город.",
            image: "Telegram Desktop/photo_13_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Занятие китайским, изучение кулинарной лексики и названий китайских специй." },
                { time: "13:30 - 17:00", text: "Мастер-класс по лепке традиционных пельменей цзяоцзы под руководством шеф-повара и ужин." },
                { time: "18:30 - 21:00", text: "Квест по вечернему Циндао: разгадываем загадки истории города прямо на его старинных улицах." }
            ]
        },
        10: {
            title: "День 10: Парк и бабушки",
            headline: "Урок китайского в парке и общение с местными",
            desc: "Самый живой день лагеря! Отправляемся в городской парк для интерактива с легендарными китайскими бабушками.",
            image: "Telegram Desktop/photo_14_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Урок на открытом воздухе в центральном парке Чжуншань." },
                { time: "13:00 - 16:30", text: "Совместные активности с китайскими бабушками и дедушками: учимся танцевать веерами, играть в пинг-понг и маджонг." },
                { time: "18:00 - 21:00", text: "Вечерние прогулки у музыкального фонтана, обсуждение преодоления барьера при общении с пожилыми жителями." }
            ]
        },
        11: {
            title: "День 11: Фестиваль пива",
            headline: "Главное событие года: Пивной фестиваль Циндао",
            desc: "День грандиозного праздника! Взрослые участники отправляются на знаменитый пивной фестиваль, младшие — на гастрономический праздник.",
            image: "Telegram Desktop/photo_12_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Утреннее занятие, разбор разговорных фраз для фестивалей и праздников." },
                { time: "13:30 - 17:00", text: "Посещение площадок Международного пивного фестиваля Циндао: уличная еда, шоу-программы, парады." },
                { time: "18:00 - 22:00", text: "Живые концерты, международная молодежная тусовка, дегустация блюд и невероятная праздничная атмосфера." }
            ]
        },
        12: {
            title: "День 12: Морская прогулка",
            headline: "Экскурсия на лодке по заливу и галерея искусств",
            desc: "Наслаждаемся Циндао со стороны Желтого моря, совершая круиз, и посещаем современную галерею.",
            image: "Telegram Desktop/photo_15_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Финальный интенсив китайского: подведение итогов, подготовка презентаций языковых проектов." },
                { time: "13:00 - 15:30", text: "Морская прогулка на комфортабельном катере по заливу Циндао, потрясающие фото скайлайна." },
                { time: "16:00 - 18:30", text: "Посещение музея современного искусства Циндао, знакомство с молодым поколением художников Китая." }
            ]
        },
        13: {
            title: "День 13: Выпускной",
            headline: "Защита проектов, сертификаты и прощальный костер",
            desc: "Предпоследний день смены: подводим итоги нашего невероятного языкового и культурного роста.",
            image: "Telegram Desktop/photo_16_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "10:00 - 13:00", text: "Защита языковых мини-проектов, вручение официальных сертификатов о прохождении курса." },
                { time: "15:00 - 18:00", text: "Сборы сувениров, прощальный шоппинг с поддержкой Милены." },
                { time: "19:00 - 22:00", text: "Финальная прощальная свечка на пляже под звездами, запуск китайских фонариков желаний в небо над морем." }
            ]
        },
        14: {
            title: "День 14: Возвращение",
            headline: "Прощание с Китаем и вылет домой",
            desc: "Наше приключение подходит к завершению. Собираем чемоданы воспоминаний и летим домой.",
            image: "Telegram Desktop/photo_11_2026-05-28_18-41-00.jpg",
            timeline: [
                { time: "09:00 - 12:00", text: "Сборы вещей, финальный завтрак в кампусе, обмен контактами и теплыми пожеланиями." },
                { time: "13:00 - 15:30", text: "Групповой трансфер участников в международный аэропорт Циндао Литин." },
                { time: "16:00 - 20:00", text: "Прохождение контроля, вылет домой с огромным багажом опыта, уверенности и вдохновения!" }
            ]
        }
    };

    /* ==========================================================================
       DYNAMIC SCHEDULE TAB GENERATOR (USER REQUESTED MIX TRANSITIONS)
       ========================================================================== */
    const daysSwitcher = document.getElementById('days-switcher');
    const schedulePanel = document.getElementById('schedule-content-panel');
    const prevDaysBtn = document.getElementById('prev-days');
    const nextDaysBtn = document.getElementById('next-days');
    
    if (daysSwitcher && schedulePanel) {
        let activeDay = 1;

        // Generate day tabs
        for (let i = 1; i <= 14; i++) {
            const tab = document.createElement('button');
            tab.className = `day-tab ${i === 1 ? 'active' : ''}`;
            tab.dataset.day = i;
            tab.innerText = `День ${i}`;
            tab.addEventListener('click', () => switchDay(i));
            daysSwitcher.appendChild(tab);
        }

        // Render Day content programmatically
        function renderDayContent(dayNum) {
            const data = scheduleData[dayNum];
            if (!data) return;

            let timelineHtml = '';
            data.timeline.forEach(item => {
                timelineHtml += `
                    <div class="timeline-item">
                        <div class="timeline-item-time">${item.time}</div>
                        <div class="timeline-item-text">${item.text}</div>
                    </div>
                `;
            });

            schedulePanel.innerHTML = `
                <div class="schedule-day-panel">
                    <div class="panel-image hover-zoom-effect">
                        <img src="${data.image}" alt="${data.headline}" loading="lazy">
                    </div>
                    <div class="panel-info">
                        <span class="day-title-badge">${data.title}</span>
                        <h3 class="day-headline">${data.headline}</h3>
                        <p class="day-text">${data.desc}</p>
                        
                        <div class="day-timeline-list">
                            ${timelineHtml}
                        </div>
                    </div>
                </div>
            `;
        }

        // Switch day function with smooth fade-mix transition
        function switchDay(dayNum) {
            if (dayNum < 1 || dayNum > 14 || dayNum === activeDay) return;
            
            // Highlight active tab
            document.querySelectorAll('.day-tab').forEach(tab => {
                if (parseInt(tab.dataset.day) === dayNum) {
                    tab.classList.add('active');
                    // Scroll tab into view inside switcher
                    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    tab.classList.remove('active');
                }
            });

            // USER REQUESTED: fade transition (fade out, swap content, fade in)
            schedulePanel.classList.add('fade-out');
            
            setTimeout(() => {
                activeDay = dayNum;
                renderDayContent(dayNum);
                schedulePanel.classList.remove('fade-out');
            }, 400); // matches CSS opacity transition timing
        }

        // Horizontal navigation buttons for tabs
        if (prevDaysBtn && nextDaysBtn) {
            prevDaysBtn.addEventListener('click', () => {
                daysSwitcher.scrollBy({ left: -150, behavior: 'smooth' });
            });
            nextDaysBtn.addEventListener('click', () => {
                daysSwitcher.scrollBy({ left: 150, behavior: 'smooth' });
            });
        }

        // Initial render
        renderDayContent(1);
    }

    /* ==========================================================================
       FAQ ACCORDION TRIGGERS
       ========================================================================== */
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const faqContent = trigger.nextElementSibling;
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all other accordion items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const content = item.querySelector('.faq-content');
                    if (content) content.style.maxHeight = null;
                    const trig = item.querySelector('.faq-trigger');
                    if (trig) trig.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                faqItem.classList.remove('active');
                faqContent.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                faqItem.classList.add('active');
                // Set height to scrollHeight for smooth vertical slide animation
                faqContent.style.maxHeight = faqContent.scrollHeight + "px";
            }
        });
    });

    /* ==========================================================================
       FORM VALIDATION & MODAL HANDLING
       ========================================================================== */
    const applyForm = document.getElementById('apply-form');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBtnOk = document.getElementById('modal-btn-ok');

    if (applyForm && successModal && modalClose && modalBtnOk) {
        
        // Custom interactive validation
        applyForm.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.parentElement;
                if (input.value.trim() !== '') {
                    group.classList.remove('invalid');
                }
            });
        });

        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validate Name
            const nameInput = document.getElementById('form-name');
            if (!nameInput || nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('invalid');
                isFormValid = false;
            }

            // Validate Age
            const ageInput = document.getElementById('form-age');
            const ageValue = parseInt(ageInput.value);
            if (!ageInput || isNaN(ageValue) || ageValue < 12 || ageValue > 99) {
                ageInput.parentElement.classList.add('invalid');
                isFormValid = false;
            }

            // Validate Contact/Telegram
            const contactInput = document.getElementById('form-contact');
            if (!contactInput || contactInput.value.trim() === '') {
                contactInput.parentElement.classList.add('invalid');
                isFormValid = false;
            }

            if (isFormValid) {
                // Submit Form and open successful modal popup
                successModal.classList.add('open');
                applyForm.reset();
            }
        });

        // Close Modal events
        function closeModal() {
            successModal.classList.remove('open');
        }

        modalClose.addEventListener('click', closeModal);
        modalBtnOk.addEventListener('click', closeModal);
        
        // Close modal clicking outside the card
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    // Add fade-in-up classes programmatically to main block contents for elegance
    const revealElements = [
        '.section-header', 
        '.about-section .section-left', 
        '.about-section .section-right',
        '.program-card', 
        '.advantage-item', 
        '.timeline-step',
        '.price-box', 
        '.safety-image', 
        '.safety-content',
        '.adults-content', 
        '.adults-image',
        '.target-box', 
        '.organizer-left', 
        '.organizer-right',
        '.gallery-live-item', 
        '.faq-item',
        '.apply-left', 
        '.apply-right'
    ];

    revealElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in-up');
        });
    });

    // Observer setup
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // trigger animation only once
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.classList.add('active');
        });
    }
});
