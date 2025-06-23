// script.js (FIXED VERSION)

// -----------------------------------------------------------------------------
// 1. GLOBAL STATE & CONFIGURATION
// -----------------------------------------------------------------------------
let config = {};
let allQuestions = [];
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval;
let participantName = '';
let testStartTime;
let totalTestTimeMinutes = 0; // Initialize to 0
let currentReviewIndex = 0;

// Anti-Cheat Tracker
let violationTracker = {
    tabChanges: 0,
    devToolsOpened: false,
    sessionActive: false,
    monitoringInterval: null
};

// DOM Element Cache
const dom = {
    screens: {
        login: document.getElementById('login-screen'),
        welcome: document.getElementById('welcome-screen'),
        selection: document.getElementById('selection-screen'),
        instruction: document.getElementById('instruction-screen'),
        test: document.getElementById('test-screen'),
        results: document.getElementById('results-screen'),
        review: document.getElementById('review-screen')
    },
    // Test Screen Elements
    sidebar: document.querySelector('#test-screen .sidebar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    questionGrid: document.getElementById('question-grid'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    mobileTimer: document.getElementById('timer-mobile'),
    desktopTimer: document.getElementById('timer-desktop'),
    progressBar: document.getElementById('progress-bar'),
    mobileQuestionInfo: document.getElementById('question-number-category-mobile'),
    // Review Screen Elements
    reviewSidebar: document.getElementById('review-sidebar')
};


// -----------------------------------------------------------------------------
// 2. INITIALIZATION & APP FLOW
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Network response was not ok');
        config = await response.json();
        
        applyBranding();
        setupEventListeners();
        
        // CRITICAL FIX: Ensure all screens are hidden initially except the target one.
        Object.values(dom.screens).forEach(s => s.classList.remove('active'));

        if (config.access?.required) {
            showScreen('login');
        } else {
            showScreen('welcome');
        }
    } catch (error) {
        console.error("Fatal Error: Failed to load configuration.", error);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Error</h1><p>Gagal memuat file konfigurasi aplikasi (config.json). Pastikan file ada dan valid.</p></div>`;
    }
}

// CRITICAL FIX: Robust screen visibility function
function showScreen(screenName) {
    // Hide all screens first to prevent overlap
    for (const key in dom.screens) {
        dom.screens[key].classList.remove('active');
        // A more direct approach to fix the bug seen in the screenshot
        dom.screens[key].style.display = 'none';
    }
    // Then show the target screen
    if (dom.screens[screenName]) {
        dom.screens[screenName].classList.add('active');
        // The display style is controlled by the .active class in CSS
        // but setting it explicitly ensures it overrides any other styles.
        if (screenName === 'test' || screenName === 'review') {
            dom.screens[screenName].style.display = 'flex';
        } else {
            dom.screens[screenName].style.display = 'block';
        }
    } else {
        console.error(`Attempted to show a non-existent screen: ${screenName}`);
    }
}


function setupEventListeners() {
    // Test Screen Drawer
    document.getElementById('menu-toggle-btn').addEventListener('click', () => dom.sidebar.classList.add('open'));
    document.getElementById('close-sidebar-btn').addEventListener('click', () => dom.sidebar.classList.remove('open'));

    // Review Screen Drawer
    document.getElementById('review-menu-toggle-btn').addEventListener('click', () => dom.reviewSidebar.classList.add('open'));
    document.getElementById('review-close-sidebar-btn').addEventListener('click', () => dom.reviewSidebar.classList.remove('open'));
}

// -----------------------------------------------------------------------------
// 3. BRANDING & PRE-TEST SETUP
// -----------------------------------------------------------------------------
function applyBranding() {
    document.title = config.branding.title;
    ['login-title', 'welcome-title'].forEach(id => document.getElementById(id).textContent = config.branding.title);
    ['login-subtitle', 'welcome-subtitle'].forEach(id => document.getElementById(id).textContent = config.branding.subtitle);
    document.getElementById('report-main-title').textContent = `Laporan Hasil ${config.branding.title}`;
    document.getElementById('report-subtitle').textContent = config.branding.subtitle;
    document.getElementById('report-developer').textContent = `Hormat kami, ${config.branding.developer}`;
}

function handleLogin() {
    const codeInput = document.getElementById('access-code');
    const errorEl = document.getElementById('login-error');
    if (config.access.validCodes.includes(codeInput.value.trim())) {
        errorEl.style.display = 'none';
        showScreen('welcome');
    } else {
        errorEl.textContent = 'Kode Akses tidak valid.';
        errorEl.style.display = 'block';
    }
}

function prepareTest() {
    participantName = document.getElementById('participant-name').value.trim();
    if (participantName === "") {
        alert("Nama lengkap tidak boleh kosong.");
        return;
    }
    buildBatchSelectionScreen();
}

function buildBatchSelectionScreen() {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    
    document.getElementById('selection-title').textContent = 'Pilih Batch Ujian';
    document.getElementById('selection-description').textContent = 'Setiap batch berisi paket soal yang berbeda.';
    document.getElementById('back-to-welcome-btn').style.display = 'none';

    config.batches.forEach(batch => {
        const btn = document.createElement('button');
        btn.className = 'selection-btn' + (batch.status === 'locked' ? ' locked' : '');
        btn.innerHTML = `<i class="fas fa-layer-group"></i><strong>${batch.title}</strong><span>${batch.description}</span>`;
        if (batch.status !== 'locked') {
            btn.onclick = () => selectBatch(batch);
        } else {
            btn.disabled = true;
        }
        grid.appendChild(btn);
    });
    showScreen('selection');
}

async function selectBatch(batch) {
    try {
        const response = await fetch(batch.filePath);
        if (!response.ok) throw new Error(`File not found: ${batch.filePath}`);
        allQuestions = await response.json();
        analyzeAndBuildModeScreen();
    } catch (error) {
        console.error(`Failed to load batch file:`, error);
        alert('Gagal memuat data soal untuk batch ini.');
    }
}

function analyzeAndBuildModeScreen() {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    document.getElementById('selection-title').textContent = 'Pilih Mode Ujian';
    document.getElementById('selection-description').textContent = 'Mode Ujian Lengkap akan dimonitor oleh sistem.';
    document.getElementById('back-to-welcome-btn').style.display = 'inline-flex';

    const categories = allQuestions.reduce((acc, q) => {
        const cat = q.main_category || 'Lainnya';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    grid.appendChild(createModeButton('all', 'Ujian Lengkap', allQuestions.length, 30, 'fas fa-star'));
    Object.entries(categories).forEach(([name, count]) => {
        grid.appendChild(createModeButton(name, name, count, 15, getCategoryIcon(name)));
    });
    showScreen('selection');
}

function createModeButton(mode, title, count, time, icon) {
    const btn = document.createElement('button');
    btn.className = 'selection-btn';
    btn.innerHTML = `<i class="${icon}"></i><strong>${title}</strong><span>${count} Soal - ${time} Menit</span>`;
    btn.onclick = () => startTest(mode, time); // Pass time to startTest
    return btn;
}

function getCategoryIcon(cat) {
    const map = { literasi: 'fas fa-book-open', numerasi: 'fas fa-calculator' };
    return map[cat.toLowerCase()] || 'fas fa-question-circle';
}

function goBackToWelcome() { showScreen('welcome'); }

// -----------------------------------------------------------------------------
// 4. CORE TEST LOGIC
// -----------------------------------------------------------------------------
function startTest(mode, time) {
    totalTestTimeMinutes = time; // Set the global test time
    if (mode === 'all') {
        activeQuestions = allQuestions;
    } else {
        activeQuestions = allQuestions.filter(q => q.main_category === mode);
    }
    
    if (config.security?.antiCheatEnabled && mode === config.security.applyToMode) {
        alert("PERHATIAN: Sesi Ujian Lengkap ini dipantau oleh sistem. Aktivitas mencurigakan akan tercatat pada laporan akhir.");
        initializeAntiCheatListeners();
    }
    
    document.getElementById('instruction-list').innerHTML = `
        <li>Anda akan mengerjakan <strong>${activeQuestions.length} soal</strong>.</li>
        <li>Waktu pengerjaan Anda adalah <strong>${totalTestTimeMinutes} menit</strong>.</li>
        <li>Waktu akan berjalan otomatis saat tes dimulai.</li>
        <li>Pastikan Anda menekan tombol "Selesaikan Tes" jika sudah selesai sebelum waktu habis.</li>`;
    showScreen('instruction');
}

function beginActualTest() {
    currentQuestionIndex = 0;
    userAnswers = {};
    testStartTime = new Date();
    
    buildNavigationGrid();
    loadQuestion(0);
    startTimer();
    showScreen('test');
}

function startTimer() {
    clearInterval(timerInterval);
    const totalTimeSeconds = totalTestTimeMinutes * 60;
    let timeLeft = totalTimeSeconds;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        dom.mobileTimer.textContent = timeString;
        dom.desktopTimer.textContent = timeString;
        
        const progress = ((totalTimeSeconds - timeLeft) / totalTimeSeconds) * 100;
        dom.progressBar.style.width = `${progress}%`;

        if (--timeLeft < 0) {
            clearInterval(timerInterval);
            alert("Waktu habis!");
            finishTest();
        }
    }, 1000);
}

function loadQuestion(index) {
    if (index < 0 || index >= activeQuestions.length) return;
    currentQuestionIndex = index;
    const q = activeQuestions[index];
    
    dom.mobileQuestionInfo.textContent = `Soal ${index + 1}/${activeQuestions.length}`;
    dom.questionText.innerHTML = q.question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    dom.optionsContainer.innerHTML = q.options.map((option, i) => {
        const optionId = `q${q.id}-o${i}`;
        const label = String.fromCharCode(65 + i); // A, B, C, ...
        const isChecked = userAnswers[q.id] === label.toLowerCase() ? 'checked' : '';
        return `
            <label for="${optionId}" class="option">
                <input type="radio" name="q${q.id}" id="${optionId}" value="${label.toLowerCase()}" ${isChecked}>
                <span class="option-label">${label}</span>
                <span>${option}</span>
            </label>
        `;
    }).join('');
    
    // Attach event listeners
    dom.optionsContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => selectAnswer(q.id, radio.value));
    });

    updateUI();
    dom.sidebar.classList.remove('open'); // Close drawer on question change
}

function updateUI() {
    dom.prevBtn.disabled = currentQuestionIndex === 0;
    dom.nextBtn.disabled = currentQuestionIndex === activeQuestions.length - 1;
    
    dom.questionGrid.querySelectorAll('.q-btn').forEach((btn, i) => {
        btn.classList.remove('current', 'answered');
        if (i === currentQuestionIndex) {
            btn.classList.add('current');
        }
        if (userAnswers[activeQuestions[i].id]) {
            btn.classList.add('answered');
        }
    });
}

function buildNavigationGrid() {
    dom.questionGrid.innerHTML = activeQuestions.map((_, index) => 
        `<button class="q-btn" onclick="loadQuestion(${index})">${index + 1}</button>`
    ).join('');
}

function selectAnswer(questionId, answer) { userAnswers[questionId] = answer; updateUI(); }
function nextQuestion() { if (currentQuestionIndex < activeQuestions.length - 1) loadQuestion(currentQuestionIndex + 1); }
function prevQuestion() { if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1); }
function confirmFinish() { if (confirm("Apakah Anda yakin ingin menyelesaikan sesi ini? Jawaban tidak dapat diubah kembali.")) finishTest(); }

function finishTest() {
    clearInterval(timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}

// -----------------------------------------------------------------------------
// 5. ANTI-CHEAT & REPORTING
// -----------------------------------------------------------------------------
function initializeAntiCheatListeners() {
    violationTracker = { tabChanges: 0, devToolsOpened: false, sessionActive: true, monitoringInterval: null };
    window.addEventListener('blur', handleVisibilityChange);
    violationTracker.monitoringInterval = setInterval(() => {
        if ((window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160)) {
            if (!violationTracker.devToolsOpened) {
                 violationTracker.devToolsOpened = true;
            }
        }
    }, 1000);
}

function removeAntiCheatListeners() {
    if (!violationTracker.sessionActive) return;
    window.removeEventListener('blur', handleVisibilityChange);
    clearInterval(violationTracker.monitoringInterval);
    violationTracker.sessionActive = false;
}

const handleVisibilityChange = () => { if (document.hidden && violationTracker.sessionActive) violationTracker.tabChanges++; };

function generateReport() {
    // Basic Info & Duration
    document.getElementById('report-name').textContent = participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'SESI-' + Date.now();
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const durationMs = new Date() - testStartTime;
    document.getElementById('report-duration').textContent = `${Math.floor(durationMs / 60000)} menit ${Math.floor((durationMs % 60000) / 1000)} detik`;
    
    // Scoring
    let correctAnswers = 0;
    activeQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) correctAnswers++;
    });
    const answeredCount = Object.keys(userAnswers).length;
    const score = activeQuestions.length > 0 ? Math.round((correctAnswers / activeQuestions.length) * 100) : 0;
    
    document.getElementById('final-score').textContent = score;
    const predicate = score >= 85 ? 'LUAR BIASA' : score >= 70 ? 'SANGAT BAIK' : score >= 55 ? 'BAIK' : 'PERLU DITINGKATKAN';
    document.getElementById('score-predicate').textContent = predicate;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = answeredCount - correctAnswers;
    document.getElementById('unanswered-count').textContent = activeQuestions.length - answeredCount;

    if (score >= 85 && typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }

    generateCategoryAnalysis();
    generateViolationReport();
    generateRecommendations();
}

function generateViolationReport() {
    const section = document.getElementById('violation-report-section');
    const violationDetails = document.getElementById('violation-details');
    violationDetails.innerHTML = '';
    let hasViolations = false;
    if (violationTracker.tabChanges > 0) {
        violationDetails.innerHTML += `<div class="behavior-item">Keluar dari tab/jendela ujian terdeteksi: <strong>${violationTracker.tabChanges} kali</strong></div>`;
        hasViolations = true;
    }
    if (violationTracker.devToolsOpened) {
        violationDetails.innerHTML += `<div class="behavior-item">Developer Tools (Inspect Element) terdeteksi terbuka.</div>`;
        hasViolations = true;
    }
    section.style.display = hasViolations ? 'block' : 'none';
}

function generateCategoryAnalysis() {
    const analysisCard = document.getElementById('analysis-card');
    const analysisContainer = document.getElementById('analysis-container');
    const categoryStats = {};

    activeQuestions.forEach(q => {
        const cat = q.main_category || 'Lainnya';
        if (!categoryStats[cat]) {
            categoryStats[cat] = { correct: 0, total: 0 };
        }
        categoryStats[cat].total++;
        if (userAnswers[q.id] === q.correctAnswer) {
            categoryStats[cat].correct++;
        }
    });

    if (Object.keys(categoryStats).length > 1) { // Only show if more than one category
        analysisContainer.innerHTML = Object.entries(categoryStats).map(([name, stats]) => {
            const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return `
                <div class="category-item">
                    <div class="category-info">
                        <strong>${name}</strong>
                        <span>${stats.correct}/${stats.total} Benar (${accuracy}%)</span>
                    </div>
                    <div class="accuracy-bar-container">
                        <div class="accuracy-bar" style="width: ${accuracy}%; background-color: ${accuracy > 70 ? 'var(--color-correct)' : accuracy > 40 ? 'var(--color-primary)' : 'var(--color-warning)'};"></div>
                    </div>
                </div>
            `;
        }).join('');
        analysisCard.style.display = 'block';
    } else {
        analysisCard.style.display = 'none';
    }
    return categoryStats;
}

function generateRecommendations() {
    const feedbackEl = document.getElementById('recommendation-feedback');
    const stats = generateCategoryAnalysis();
    let recommendations = [];
    const sortedCats = Object.entries(stats).sort(([,a], [,b]) => (a.correct/a.total) - (b.correct/b.total));

    if (sortedCats.length > 0) {
        const weakest = sortedCats[0];
        if ((weakest[1].correct / weakest[1].total) < 0.6) {
            recommendations.push(`Kinerja Anda di kategori <strong>${weakest[0]}</strong> perlu perhatian lebih. Fokus pelajari kembali soal-soal di area ini.`);
        }
        if (sortedCats.length > 1) {
            const strongest = sortedCats[sortedCats.length - 1];
            if ((strongest[1].correct / strongest[1].total) >= 0.8 && strongest[0] !== weakest[0]) {
                recommendations.push(`Anda menunjukkan penguasaan yang sangat baik pada kategori <strong>${strongest[0]}</strong>. Pertahankan!`);
            }
        }
    }
    if (recommendations.length === 0) {
        recommendations.push("Performa Anda secara umum sudah cukup baik dan seimbang. Terus berlatih untuk meningkatkan kecepatan dan konsistensi.");
    }
    feedbackEl.innerHTML = `<p>${recommendations.join('</p><p>')}</p>`;
}

// -----------------------------------------------------------------------------
// 6. REVIEW LOGIC
// -----------------------------------------------------------------------------
function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
}

function buildReviewGrid() {
    document.getElementById('review-grid').innerHTML = activeQuestions.map((q, i) => {
        const isAnswered = userAnswers.hasOwnProperty(q.id);
        const isCorrect = isAnswered && userAnswers[q.id] === q.correctAnswer;
        let btnClass = '';
        if (isAnswered) {
            btnClass = isCorrect ? 'review-correct' : 'review-incorrect';
        }
        return `<button class="q-btn ${btnClass}" onclick="loadReviewQuestion(${i})">${i + 1}</button>`;
    }).join('');
}

function loadReviewQuestion(index) {
    if (index < 0 || index >= activeQuestions.length) return;
    currentReviewIndex = index;
    const q = activeQuestions[index];
    const userAnswer = userAnswers[q.id];
    const isAnswered = userAnswers.hasOwnProperty(q.id);
    const isCorrect = isAnswered && userAnswer === q.correctAnswer;

    document.getElementById('review-question-number-category-mobile').textContent = `Pembahasan Soal ${index + 1}`;
    document.getElementById('review-question-text').innerHTML = q.question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    document.getElementById('review-explanation-text').textContent = q.pembahasan || "Pembahasan untuk soal ini belum tersedia.";
    
    const banner = document.getElementById('review-status-banner');
    banner.className = 'review-status-banner'; // Reset
    if (isAnswered) {
        banner.classList.add(isCorrect ? 'correct' : 'incorrect');
        banner.innerHTML = `<i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> Jawaban Anda <strong>${isCorrect ? 'BENAR' : 'SALAH'}</strong>`;
    } else {
        banner.innerHTML = `<i class="fas fa-minus-circle"></i> Soal ini tidak Anda jawab`;
    }

    const reviewOptionsContainer = document.getElementById('review-options-container');
    reviewOptionsContainer.innerHTML = q.options.map((option, i) => {
        const label = String.fromCharCode(65 + i).toLowerCase();
        let optionClass = 'option';
        
        // Style for correct answer
        if (label === q.correctAnswer) {
            optionClass += ' review-correct-answer';
        }
        
        // Style for user's incorrect answer
        if (isAnswered && !isCorrect && label === userAnswer) {
            optionClass += ' review-user-incorrect';
        }

        return `
            <div class="${optionClass}">
                <span class="option-label">${String.fromCharCode(65 + i)}</span>
                <span>${option}</span>
            </div>
        `;
    }).join('');

    // Update nav buttons
    document.getElementById('review-prev-btn').disabled = index === 0;
    document.getElementById('review-next-btn').disabled = index === activeQuestions.length - 1;
    dom.reviewSidebar.classList.remove('open');
}

function reviewPrevQuestion() { if (currentReviewIndex > 0) loadReviewQuestion(currentReviewIndex - 1); }
function reviewNextQuestion() { if (currentReviewIndex < activeQuestions.length - 1) loadReviewQuestion(currentReviewIndex + 1); }

// -----------------------------------------------------------------------------
// 7. UTILITY & MISC
// -----------------------------------------------------------------------------
function tryAgain() { window.location.reload(); }

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    const originalWidth = report.style.width;
    const originalShadow = report.style.boxShadow;
    
    // Prepare for canvas capture
    report.style.width = '800px';
    report.style.boxShadow = 'none'; // Remove shadow for cleaner PDF

    html2canvas(report, { scale: 2, useCORS: true }).then(canvas => {
        // Restore original style
        report.style.width = originalWidth;
        report.style.boxShadow = originalShadow;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Laporan-Hasil-${participantName.replace(/\s/g, '_')}.pdf`);
    }).catch(err => {
        console.error("Gagal membuat PDF:", err);
        alert("Maaf, terjadi kesalahan saat membuat file PDF.");
        // Restore original style even on error
        report.style.width = originalWidth;
        report.style.boxShadow = originalShadow;
    });
}
