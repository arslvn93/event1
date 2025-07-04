// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load content from config first
    loadConfigContent();
    
    // Initialize all functionality
    initializeScrollAnimations();
    initializeFAQ();
    initializeRegistrationForm();
    initializeSmoothScrolling();
    initializeCountdownAnimation();
});

// Load content from config.js
function loadConfigContent() {
    if (typeof config === 'undefined') {
        console.warn('Config not loaded');
        return;
    }
    
    // Update page title and meta
    document.title = config.meta.pageTitle;
    
    // Update header content
    updateElement('.event-date', `<i class="fas fa-calendar-alt"></i> ${config.header.eventDate}`);
    updateElement('.spots-left', `Only <span class="number">${config.event.spotsLeft}</span> <span class="strikethrough">${config.event.totalSpots}</span> Spots Available`);
    updateElements('.cta-button.primary', config.header.ctaText);
    
    // Update hero section
    updateElement('.hero-badge', config.hero.badge);
    updateElement('.hero-title', config.hero.headline);
    updateElement('.hero-subtitle', config.hero.subtitle);
    updateElement('.cta-subtext', config.hero.ctaSubtext);
    updateElement('.urgency', config.hero.urgencyText);
    
    // Update event details
    updateElement('.event-info h2', config.eventDetails.sectionTitle);
    updateElement('.date-time', `<i class="fas fa-calendar"></i> ${config.event.date} at ${config.event.time}`);
    updateElement('.location', `<i class="fas fa-map-marker-alt"></i> ${config.event.location} <small>${config.event.locationNote}</small>`);
    updateElement('.spots-warning', `Only ${config.event.spotsLeft} <span class="strikethrough">${config.event.totalSpots}</span> spots Left`);
    updateElement('.food-included', config.eventDetails.foodIncluded);
    
    // Update problems section
    updateElement('.frustrated-owner h2', config.problems.title);
    updateProblemsSection();
    
    // Update success statement
    updateElement('.success-statement', config.successStatement);
    
    // Update solutions section
    updateSolutionsSection();
    
    // Update target audience
    updateTargetAudienceSection();
    
    // Update comparison section
    updateComparisonSection();
    
    // Update benefits section
    updateBenefitsSection();
    
    // Update speakers section
    updateSpeakersSection();
    
    // Update FAQ section
    updateFAQSection();
    
    // Update contact section
    updateContactSection();
    
    // Update footer
    updateFooterSection();
    
    // Update all CTA buttons
    updateElements('.cta-button:not(.primary)', config.hero.ctaText);
    
    // Update urgency messages
    updateElements('.urgency', `Only ${config.event.spotsLeft} <span class="strikethrough">${config.event.totalSpots}</span> Spots Available`);
}

// Helper function to update a single element
function updateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
    }
}

// Helper function to update multiple elements
function updateElements(selector, content) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.innerHTML = content;
    });
}

// Update problems section
function updateProblemsSection() {
    const problemsContainer = document.querySelector('.problems');
    if (problemsContainer && config.problems.items) {
        problemsContainer.innerHTML = config.problems.items.map(item => `
            <div class="problem">
                <i class="fas fa-times-circle"></i>
                <span class="nowrap">${item.split(' ').slice(0, 2).join(' ')}</span> ${item.split(' ').slice(2).join(' ')}
            </div>
        `).join('');
    }
}

// Update solutions section
function updateSolutionsSection() {
    const solutionsContainer = document.querySelector('.solutions');
    const solutionsTitle = document.querySelector('.solutions').previousElementSibling;
    
    if (solutionsTitle) {
        solutionsTitle.innerHTML = config.solutions.title;
    }
    
    if (solutionsContainer && config.solutions.items) {
        solutionsContainer.innerHTML = config.solutions.items.map(item => `
            <div class="solution">
                <i class="fas fa-check-circle"></i>
                ${item}
            </div>
        `).join('');
    }
}

// Update target audience section
function updateTargetAudienceSection() {
    const audienceTitle = document.querySelector('.target-audience h2');
    const audiencePoints = document.querySelector('.audience-points');
    const audienceNote = document.querySelector('.audience-note');
    
    if (audienceTitle) audienceTitle.innerHTML = config.targetAudience.title;
    if (audienceNote) audienceNote.innerHTML = `<em>${config.targetAudience.note}</em>`;
    
    if (audiencePoints && config.targetAudience.items) {
        audiencePoints.innerHTML = config.targetAudience.items.map(item => `
            <div class="audience-point">
                <i class="fas fa-finger-point"></i>
                ${item}
            </div>
        `).join('');
    }
}

// Update comparison section
function updateComparisonSection() {
    const painfulWay = document.querySelector('.painful-way');
    const expressWay = document.querySelector('.express-way');
    
    if (painfulWay) {
        painfulWay.querySelector('h3').innerHTML = config.comparison.painfulWay.title;
        painfulWay.querySelector('h4').innerHTML = config.comparison.painfulWay.subtitle;
        
        const painfulPoints = painfulWay.querySelector('.painful-points');
        if (painfulPoints) {
            painfulPoints.innerHTML = config.comparison.painfulWay.points.map(point => `
                <div class="painful-point">
                    <i class="fas fa-times"></i>
                    ${point}
                </div>
            `).join('');
        }
    }
    
    if (expressWay) {
        expressWay.querySelector('h3').innerHTML = config.comparison.expressWay.title;
        expressWay.querySelector('h4').innerHTML = config.comparison.expressWay.subtitle;
        
        const expressPoints = expressWay.querySelector('.express-points');
        if (expressPoints) {
            expressPoints.innerHTML = config.comparison.expressWay.points.map(point => `
                <div class="express-point">
                    <i class="fas fa-check"></i>
                    ${point}
                </div>
            `).join('');
        }
    }
}

// Update benefits section
function updateBenefitsSection() {
    const benefitsTitle = document.querySelector('.benefits h2');
    const benefitsIntro = document.querySelector('.benefits-intro');
    const benefitsGrid = document.querySelector('.benefits-grid');
    
    if (benefitsTitle) benefitsTitle.innerHTML = config.benefits.title;
    if (benefitsIntro) benefitsIntro.innerHTML = config.benefits.subtitle;
    
    if (benefitsGrid && config.benefits.items) {
        benefitsGrid.innerHTML = config.benefits.items.map(item => `
            <div class="benefit">
                <div class="benefit-icon">
                    <i class="fas fa-lightbulb"></i>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }
}

// Update speakers section
function updateSpeakersSection() {
    const speakersTitle = document.querySelector('.speakers h2');
    const speakersIntro = document.querySelector('.speakers-intro');
    const speakersGrid = document.querySelector('.speakers-grid');
    
    if (speakersTitle) speakersTitle.innerHTML = config.speakers.title;
    if (speakersIntro) speakersIntro.innerHTML = config.speakers.subtitle;
    
    if (speakersGrid && config.speakers.experts) {
        speakersGrid.innerHTML = config.speakers.experts.map((expert, index) => `
            <div class="speaker">
                <div class="speaker-image">
                    ${index === 0 ? 
                        '<img src="https://pixabay.com/get/g3c430faff86c8a8431d7feb26602345ba094c008e589b838ae4daea4683a3862389a610b3c52142e02f79894225725168eace7b197216488b76ba3f13319bee1_1280.jpg" alt="' + expert.name + '">' :
                        '<div class="coming-soon-placeholder"><i class="fas fa-user"></i><span>Coming Soon</span></div>'
                    }
                </div>
                <div class="speaker-info">
                    <h3>${expert.name}</h3>
                    <h4>${expert.title}</h4>
                    <p class="speaker-description">${expert.description}</p>
                    <ul class="speaker-points">
                        ${expert.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }
}

// Update FAQ section
function updateFAQSection() {
    const faqTitle = document.querySelector('.faq h2');
    const faqIntro = document.querySelector('.faq-intro');
    const faqList = document.querySelector('.faq-list');
    
    if (faqTitle) faqTitle.innerHTML = config.faq.title;
    if (faqIntro) faqIntro.innerHTML = config.faq.subtitle;
    
    if (faqList && config.faq.questions) {
        faqList.innerHTML = config.faq.questions.map(faq => `
            <div class="faq-item">
                <div class="faq-question">
                    <h3>${faq.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    }
}

// Update contact section
function updateContactSection() {
    const contactInfo = document.querySelector('.contact-info');
    
    if (contactInfo && config.contact.agents) {
        contactInfo.innerHTML = config.contact.agents.map(agent => `
            <div class="contact-person">
                <div class="contact-image">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="contact-details">
                    <h3>${agent.name}</h3>
                    <p><i class="fas fa-briefcase"></i> ${agent.title}</p>
                    <p><i class="fas fa-phone"></i> ${agent.phone}</p>
                    <p><i class="fas fa-envelope"></i> ${agent.email}</p>
                </div>
            </div>
        `).join('');
    }
}

// Update footer section
function updateFooterSection() {
    const companyInfo = document.querySelector('.company-info');
    const footerLinks = document.querySelector('.footer-links');
    
    if (companyInfo) {
        companyInfo.innerHTML = `
            <h4>${config.footer.brokerage}</h4>
            <p>${config.footer.address}</p>
        `;
    }
    
    if (footerLinks) {
        footerLinks.innerHTML = `
            <p>${config.footer.copyright}</p>
            <a href="${config.footer.privacyPolicy}">Privacy Policy</a>
        `;
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100; // Account for sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Registration form handling
function initializeRegistrationForm() {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeBtn = modal.querySelector('.close');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            submitRegistration();
        }
    });
    
    // Close modal functionality
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
        emailField.style.borderColor = '#dc2626';
        isValid = false;
    }
    
    // Phone validation (basic)
    const phoneField = document.getElementById('phone');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phoneField.value)) {
        phoneField.style.borderColor = '#dc2626';
        isValid = false;
    }
    
    // Consent checkbox
    const consentField = document.getElementById('consent');
    if (!consentField.checked) {
        consentField.style.outline = '2px solid #dc2626';
        isValid = false;
    } else {
        consentField.style.outline = 'none';
    }
    
    if (!isValid) {
        // Scroll to first error field
        const firstError = document.querySelector('input[style*="border-color: rgb(220, 38, 38)"], select[style*="border-color: rgb(220, 38, 38)"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return isValid;
}

function submitRegistration() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const submitButton = document.querySelector('.registration-form button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Store form data for later submission
    const firstName = formData.get('firstName') || '';
    const lastName = formData.get('lastName') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    window.storedFormData = {
        name: fullName,
        firstName: firstName,
        lastName: lastName,
        email: formData.get('email'),
        phone: formData.get('phone'),
        submittedAt: new Date().toISOString()
    };
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitButton.disabled = true;
    
    // Brief loading, then show modal questions
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show question modal instead of success modal
        showQuestionModal();
        
    }, 1000);
}

// Question Modal Functionality
let currentQuestionIndex = 0;
let collectedAnswers = {};

function showQuestionModal() {
    if (!config || !config.modalQuestions || !config.modalQuestions.length) {
        console.warn("No modal questions configured, proceeding with direct submission");
        submitFinalData();
        return;
    }
    
    currentQuestionIndex = 0;
    collectedAnswers = {};
    
    const questionModalOverlay = document.getElementById('questionModalOverlay');
    const questionModalStepsContainer = document.getElementById('question-modal-steps-container');
    
    if (questionModalOverlay && questionModalStepsContainer) {
        questionModalStepsContainer.innerHTML = '';
        questionModalOverlay.classList.add('visible');
        displayQuestionStep(currentQuestionIndex);
    }
}

function hideQuestionModal() {
    const questionModalOverlay = document.getElementById('questionModalOverlay');
    if (questionModalOverlay) {
        questionModalOverlay.classList.remove('visible');
    }
}

function displayQuestionStep(stepIndex) {
    const questionModalStepsContainer = document.getElementById('question-modal-steps-container');
    
    if (!questionModalStepsContainer || !config || !config.modalQuestions) {
        console.error("Question modal structure or config missing!");
        hideQuestionModal();
        return;
    }
    
    questionModalStepsContainer.innerHTML = '';
    
    if (stepIndex >= 0 && stepIndex < config.modalQuestions.length) {
        const questionData = config.modalQuestions[stepIndex];
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('modal-step');
        stepDiv.id = `modal-step-${questionData.id}`;
        
        stepDiv.innerHTML = `
            <p class="question-text">${questionData.questionText}</p>
            <div class="modal-options">
                ${questionData.options.map(option => `
                    <button type="button" class="modal-option-btn"
                            data-step="${stepIndex}" 
                            data-question-id="${questionData.id}" 
                            data-answer="${option.value}">
                        ${option.text}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Add event listeners to option buttons
        stepDiv.querySelectorAll('.modal-option-btn').forEach(button => {
            button.addEventListener('click', handleAnswerClick);
        });
        
        questionModalStepsContainer.appendChild(stepDiv);
        
        // Trigger animation
        setTimeout(() => {
            stepDiv.classList.add('active');
        }, 10);
    } else {
        // All questions answered, proceed with submission
        console.log("All questions answered. Submitting data...");
        submitFinalData();
        hideQuestionModal();
    }
}

function handleAnswerClick(event) {
    const button = event.currentTarget;
    const stepIndex = parseInt(button.dataset.step, 10);
    const questionId = button.dataset.questionId;
    const answerValue = button.dataset.answer;
    
    // Store the answer
    collectedAnswers[questionId] = answerValue;
    
    console.log(`Question ${questionId} answered: ${answerValue}`);
    
    // Move to next question
    currentQuestionIndex = stepIndex + 1;
    displayQuestionStep(currentQuestionIndex);
}

function submitFinalData() {
    // Combine form data with question answers
    const finalPayload = {
        timestamp: new Date().toISOString(),
        source: "landing-page",
        ...window.storedFormData,
        eventName: config.event?.title || "Toronto Home Sellers Workshop",
        questions: [],
        // Deployment info fields for form submissions
        tag: config.deploymentInfo?.tag || "",
        ghlWebhookUrl: config.deploymentInfo?.ghlWebhookUrl || "",
        webhookUrl: config.deploymentInfo?.webhookUrl || "",
        facebookPixelId: config.deploymentInfo?.facebookPixelId || "",
        followUpBossEmail: config.deploymentInfo?.followUpBossEmail || ""
    };
    
    // Add question answers to payload
    for (const questionId in collectedAnswers) {
        if (collectedAnswers.hasOwnProperty(questionId)) {
            const answerValue = collectedAnswers[questionId];
            const questionObj = config.modalQuestions.find(q => q.id === questionId);
            if (questionObj) {
                const optionObj = questionObj.options.find(opt => opt.value === answerValue);
                finalPayload.questions.push({
                    question: questionObj.questionText,
                    answer: optionObj ? optionObj.text : answerValue
                });
            }
        }
    }
    
    console.log("Final submission data:", finalPayload);
    
    // Submit to webhook if configured
    if (config.webhook && config.webhook.enabled && config.webhook.url && config.webhook.url !== "https://hook.us1.make.com/your-webhook-url") {
        submitToWebhook(finalPayload);
    } else {
        console.log("Webhook not configured, showing success modal");
        showSuccessModal();
    }
}

async function submitToWebhook(data) {
    try {
        const response = await fetch(config.webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });
        
        if (response.ok) {
            console.log("Data successfully submitted to webhook");
            showSuccessModal();
        } else {
            console.error("Webhook submission failed:", response.status);
            showSuccessModal(); // Still show success to user
        }
    } catch (error) {
        console.error("Webhook submission error:", error);
        showSuccessModal(); // Still show success to user
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Reset form
    const form = document.getElementById('registrationForm');
    form.reset();
    
    // Update spots counter
    updateSpotsCounter();
    
    // Track conversion
    console.log('Registration successful - conversion tracked');
}

function updateSpotsCounter() {
    if (typeof config !== 'undefined' && config.event.spotsLeft > 1) {
        config.event.spotsLeft--;
        
        // Update all spot counters
        const spotNumbers = document.querySelectorAll('.spots-left .number');
        spotNumbers.forEach(element => {
            element.textContent = config.event.spotsLeft;
        });
        
        // Update all urgency messages
        updateElements('.urgency', `Only ${config.event.spotsLeft} <span class="strikethrough">${config.event.totalSpots}</span> Spots Available`);
        updateElements('.spots-warning', `Only ${config.event.spotsLeft} <span class="strikethrough">${config.event.totalSpots}</span> spots Left`);
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section, .benefit, .speaker, .faq-item');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Countdown animation for spots
function initializeCountdownAnimation() {
    const spotNumbers = document.querySelectorAll('.spots-left .number');
    
    // Add urgency with periodic pulse
    setInterval(() => {
        spotNumbers.forEach(number => {
            number.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                number.style.animation = 'pulse 2s infinite';
            }, 1000);
        });
    }, 30000); // Every 30 seconds
}

// Form field improvements
document.addEventListener('DOMContentLoaded', function() {
    // Auto-format phone number
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
            } else if (value.length >= 3) {
                value = `${value.slice(0, 3)}-${value.slice(3)}`;
            }
            e.target.value = value;
        });
    }
    
    // Remove error styling on focus
    const formFields = document.querySelectorAll('input, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.style.borderColor = '#dc2626'; // Red focus
        });
        
        field.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10b981'; // Green when filled
            } else {
                this.style.borderColor = '#e5e7eb'; // Default
            }
        });
    });
    
    // Question modal close functionality
    const questionModalCloseBtn = document.getElementById('questionModalCloseBtn');
    const questionModalOverlay = document.getElementById('questionModalOverlay');
    
    if (questionModalCloseBtn) {
        questionModalCloseBtn.addEventListener('click', hideQuestionModal);
    }
    
    if (questionModalOverlay) {
        questionModalOverlay.addEventListener('click', (event) => {
            if (event.target === questionModalOverlay) {
                hideQuestionModal();
            }
        });
    }
});

// Sticky header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.6)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.4)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Track scroll depth for analytics
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (maxScrollDepth >= 25 && !window.scrollTracked25) {
            console.log('25% scroll depth reached');
            window.scrollTracked25 = true;
        }
        if (maxScrollDepth >= 50 && !window.scrollTracked50) {
            console.log('50% scroll depth reached');
            window.scrollTracked50 = true;
        }
        if (maxScrollDepth >= 75 && !window.scrollTracked75) {
            console.log('75% scroll depth reached');
            window.scrollTracked75 = true;
        }
        if (maxScrollDepth >= 90 && !window.scrollTracked90) {
            console.log('90% scroll depth reached');
            window.scrollTracked90 = true;
        }
    }
});

// CTA button click tracking
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.closest('.cta-button')) {
        const buttonText = e.target.textContent || e.target.closest('.cta-button').textContent;
        console.log('CTA clicked:', buttonText.trim());
    }
});

// Exit intent detection (for desktop)
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !window.exitIntentShown) {
        window.exitIntentShown = true;
        console.log('Exit intent detected');
        // Could show a popup or highlight urgency elements
        
        // Pulse the spots counter
        const spotsCounters = document.querySelectorAll('.spots-counter');
        spotsCounters.forEach(counter => {
            counter.style.animation = 'pulse 0.5s ease-in-out 3';
        });
    }
});

// Mobile touch improvements
if ('ontouchstart' in window) {
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    
    // Improve button tap feedback
    const buttons = document.querySelectorAll('.cta-button, .faq-question');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        const questionModal = document.getElementById('questionModalOverlay');
        
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        
        if (questionModal && questionModal.classList.contains('visible')) {
            hideQuestionModal();
        }
    }
    
    // FAQ navigation with keyboard
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('faq-question') || e.target.closest('.faq-question')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Add loading states and user feedback
function showLoading(element) {
    const spinner = '<i class="fas fa-spinner fa-spin"></i>';
    element.innerHTML = spinner + ' ' + element.textContent;
    element.disabled = true;
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
    element.disabled = false;
}

// Form validation with real-time feedback
function setupRealTimeValidation() {
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#dc2626';
                showFieldError(this, 'Please enter a valid email address');
            } else if (this.value) {
                this.style.borderColor = '#10b981';
                hideFieldError(this);
            }
        });
    }
    
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (this.value && !phoneRegex.test(this.value)) {
                this.style.borderColor = '#dc2626';
                showFieldError(this, 'Please enter a valid phone number');
            } else if (this.value) {
                this.style.borderColor = '#10b981';
                hideFieldError(this);
            }
        });
    }
}

function showFieldError(field, message) {
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#dc2626';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '5px';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function hideFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Initialize real-time validation when DOM is ready
document.addEventListener('DOMContentLoaded', setupRealTimeValidation);
