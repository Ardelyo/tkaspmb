// script.js

// --- GLOBAL STATE & CONFIGURATION ---
let config = {};
let allQuestions = [];
let activeQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let flaggedQuestions = new Set();
let timerInterval;
let participantName = '';
let totalTestTimeMinutes;
let testStartTime;

// --- DOM ELEMENTS ---
const screens = {
    login: document.getElementById('login-screen'),
    welcome: document.getElementById('welcome-screen'),
    selection: document.getElementById('selection-screen'),
    instruction: document.getElementById('instruction-screen'),
    test: document.getElementById('test-screen'),
    results: document.getElementById('results-screen'),
    review: document.getElementById('review-screen')
};

// --- ANTI-CHEAT TRACKER ---
let violationTracker = {
    tabChanges: 0,
    copyAttempts: 0,
    devToolsOpened: false,
    sessionActive: false,
    monitoringInterval: null
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Network response was not ok');
        config = await response.json();
        applyBranding();
        
        if (config.access && config.access.required) {
            showScreen('login');
        } else {
            showScreen('welcome');
        }
    } catch (error) {
        console.error("Failed to load configuration:", error);
        document.body.innerHTML = "<h1>Error: Gagal memuat konfigurasi aplikasi. Pastikan file `config.json` ada dan valid.</h1>";
    }
}

function applyBranding() {
    document.title = config.branding.title;
    document.getElementById('login-title').textContent = config.branding.title;
    document.getElementById('login-subtitle').textContent = config.branding.subtitle;
    document.getElementById('welcome-title').textContent = config.branding.title;
    document.getElementById('welcome-subtitle').textContent = config.branding.subtitle;
    document.getElementById('welcome-disclaimer').innerHTML = config.branding.disclaimer;
    document.getElementById('report-main-title').textContent = `LAPORAN HASIL UJIAN MANDIRI TOPINTAR`;
    document.getElementById('report-subtitle').textContent = config.branding.subtitle;
    document.getElementById('report-developer').textContent = config.branding.developer;
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if(screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

// --- UTILITY FUNCTIONS ---
function parseMarkdown(text) {
    // Simple parser for **bold** text
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// --- AUTH & SELECTION ---
function handleLogin() {
    const codeInput = document.getElementById('access-code');
    const errorEl = document.getElementById('login-error');
    const enteredCode = codeInput.value.trim();

    if (config.access.validCodes.includes(enteredCode)) {
        showScreen('welcome');
        errorEl.style.display = 'none';
    } else {
        errorEl.textContent = 'Kode Akses tidak valid. Silakan coba lagi.';
        errorEl.style.display = 'block';
    }
}

function prepareTest() {
    participantName = document.getElementById('participant-name').value.trim();
    if (participantName === "") {
        alert("Nama tidak boleh kosong.");
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
        btn.className = 'selection-btn';
        btn.innerHTML = `<i class="fas fa-layer-group"></i><strong>${batch.title}</strong><span>${batch.description}</span>`;
        if (batch.status === 'locked') {
            btn.classList.add('locked');
            btn.disabled = true;
        } else {
            btn.onclick = () => selectBatch(batch);
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
        alert('Gagal memuat data soal. Silakan periksa path file di config.json.');
    }
}

function analyzeAndBuildModeScreen() {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    
    document.getElementById('selection-title').textContent = 'Pilih Mode Ujian';
    document.getElementById('selection-description').textContent = 'Ujian Lengkap akan dimonitor oleh sistem anti-kecurangan.';
    document.getElementById('back-to-welcome-btn').style.display = 'inline-flex';

    const categories = {};
    allQuestions.forEach(q => {
        if (!categories[q.main_category]) {
            categories[q.main_category] = { count: 0, icon: getCategoryIcon(q.main_category) };
        }
        categories[q.main_category].count++;
    });

    const allBtn = createModeButton('all', 'Ujian Lengkap', allQuestions.length, 30, 'fas fa-star');
    grid.appendChild(allBtn);

    for (const catName in categories) {
        const cat = categories[catName];
        const btn = createModeButton(catName, catName, cat.count, 15, cat.icon);
        grid.appendChild(btn);
    }
}

function createModeButton(mode, title, count, time, icon) {
    const btn = document.createElement('button');
    btn.className = 'selection-btn';
    btn.innerHTML = `<i class="${icon}"></i><strong>${title}</strong><span>${count} Soal - ${time} Menit</span>`;
    btn.onclick = () => startTest(mode);
    return btn;
}

function getCategoryIcon(cat) {
    const map = { literasi: 'fas fa-book-open', numerasi: 'fas fa-calculator', sains: 'fas fa-flask' };
    return map[cat.toLowerCase()] || 'fas fa-question-circle';
}

function goBackToWelcome() {
    showScreen('welcome');
}

// --- TEST LOGIC ---
function startTest(mode) {
    if (mode === 'all') {
        activeQuestions = allQuestions;
        totalTestTimeMinutes = 30;
    } else {
        activeQuestions = allQuestions.filter(q => q.main_category === mode);
        totalTestTimeMinutes = 15;
    }

    if (config.security.antiCheatEnabled && mode === config.security.applyToMode) {
        alert("PERHATIAN: Sesi Ujian Lengkap ini dipantau oleh sistem. Aktivitas seperti meninggalkan tab atau menyalin teks akan tercatat pada laporan akhir. Tetap fokus pada jendela ujian.");
        initializeAntiCheatListeners();
    }

    document.getElementById('instruction-title').textContent = `Petunjuk Pengerjaan Ujian`;
    document.getElementById('instruction-list').innerHTML = `
        <li>Anda akan mengerjakan <strong>${activeQuestions.length} soal</strong>.</li>
        <li>Waktu pengerjaan Anda adalah <strong>${totalTestTimeMinutes} menit</strong>.</li>
        <li>Waktu akan berjalan otomatis saat tes dimulai.</li>
    `;
    showScreen('instruction');
}

function beginActualTest() {
    currentQuestionIndex = 0;
    userAnswers = {};
    flaggedQuestions.clear();
    clearInterval(timerInterval);
    buildNavigationGrid();
    loadQuestion(0);
    startTimer();
    testStartTime = new Date();
    showScreen('test');
}

function startTimer() {
    let time = totalTestTimeMinutes * 60;
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        progressBar.style.width = `${((totalTestTimeMinutes * 60 - time) / (totalTestTimeMinutes * 60)) * 100}%`;

        if (--time < 0) {
            clearInterval(timerInterval);
            finishTest();
        }
    }, 1000);
}

function loadQuestion(index) {
    currentQuestionIndex = index;
    const q = activeQuestions[index];
    document.getElementById('question-number-category').textContent = `Soal ${index + 1} dari ${activeQuestions.length} - ${q.category}`;
    // FIX: Use the markdown parser
    document.getElementById('question-text').innerHTML = parseMarkdown(q.question);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd', 'e'];
    q.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.innerHTML = `<input type="radio" name="option" value="${optionLabels[i]}"><span class="option-label">${optionLabels[i].toUpperCase()}</span><span>${option}</span>`;
        label.onclick = () => selectAnswer(q.id, optionLabels[i]);
        optionsContainer.appendChild(label);
    });
    
    if (userAnswers[q.id]) {
        const radio = optionsContainer.querySelector(`input[value="${userAnswers[q.id]}"]`);
        if(radio) radio.checked = true;
    }
    updateUI();
}

function updateUI() {
    document.querySelectorAll('#question-grid .q-btn').forEach((btn, i) => {
        btn.className = 'q-btn';
        if (i === currentQuestionIndex) btn.classList.add('current');
        if (userAnswers[activeQuestions[i].id]) btn.classList.add('answered');
        if (flaggedQuestions.has(activeQuestions[i].id)) btn.classList.add('flagged');
    });

    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = currentQuestionIndex === activeQuestions.length - 1;
}

function buildNavigationGrid() {
    document.getElementById('question-grid').innerHTML = activeQuestions.map((_, index) => 
        `<button class="q-btn" onclick="loadQuestion(${index})">${index + 1}</button>`
    ).join('');
}

function selectAnswer(questionId, answer) { userAnswers[questionId] = answer; }
function nextQuestion() { if (currentQuestionIndex < activeQuestions.length - 1) loadQuestion(currentQuestionIndex + 1); }
function prevQuestion() { if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1); }
function toggleFlag() {
    const currentId = activeQuestions[currentQuestionIndex].id;
    flaggedQuestions.has(currentId) ? flaggedQuestions.delete(currentId) : flaggedQuestions.add(currentId);
    updateUI();
}
function confirmFinish() { if (confirm("Apakah Anda yakin ingin menyelesaikan sesi ini?")) finishTest(); }

function finishTest() {
    clearInterval(timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}

// --- ANTI-CHEAT ---
function initializeAntiCheatListeners() {
    violationTracker = { tabChanges: 0, copyAttempts: 0, devToolsOpened: false, sessionActive: true, monitoringInterval: null };
    window.addEventListener('blur', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    violationTracker.monitoringInterval = setInterval(() => {
        if ((window.outerWidth - window.innerWidth > 160) || (window.outerHeight - window.innerHeight > 160)) {
            violationTracker.devToolsOpened = true;
        }
    }, 1000);
}

function removeAntiCheatListeners() {
    if (!violationTracker.sessionActive) return;
    window.removeEventListener('blur', handleVisibilityChange);
    document.removeEventListener('copy', handleCopy);
    clearInterval(violationTracker.monitoringInterval);
    violationTracker.sessionActive = false;
}

const handleVisibilityChange = () => { if (violationTracker.sessionActive) violationTracker.tabChanges++; };
const handleCopy = e => { if (violationTracker.sessionActive) { e.preventDefault(); violationTracker.copyAttempts++; } };

// --- REPORTING & REVIEW ---
function generateReport() {
    // Basic Info
    document.getElementById('report-name').textContent = participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'TKA-' + Date.now();
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

    // Duration
    const durationMs = new Date() - testStartTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    document.getElementById('report-duration').textContent = `${minutes} menit ${seconds} detik`;
    
    // Scoring
    let correctAnswers = 0;
    activeQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) correctAnswers++;
    });
    const score = activeQuestions.length > 0 ? Math.round((correctAnswers / activeQuestions.length) * 100) : 0;
    const answeredCount = Object.keys(userAnswers).length;

    document.getElementById('final-score').textContent = score;
    document.getElementById('score-predicate').textContent = score >= 80 ? 'SANGAT BAIK' : score >= 60 ? 'BAIK' : 'PERLU DITINGKATKAN';
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = answeredCount - correctAnswers;
    document.getElementById('unanswered-count').textContent = activeQuestions.length - answeredCount;

    // Violation Report
    const violationSection = document.getElementById('violation-report-section');
    const violationDetails = document.getElementById('violation-details');
    violationDetails.innerHTML = '';
    let hasViolations = false;
    
    if (violationTracker.tabChanges > 0) {
        violationDetails.innerHTML += `<div class="behavior-item">Keluar dari tab/jendela ujian terdeteksi: <strong>${violationTracker.tabChanges} kali</strong></div>`;
        hasViolations = true;
    }
    if (violationTracker.devToolsOpened) {
        violationDetails.innerHTML += `<div class="behavior-item">Developer Tools (Inspect Element) terdeteksi terbuka selama ujian.</div>`;
        hasViolations = true;
    }
    violationSection.style.display = hasViolations ? 'block' : 'none';
    
    // Category Analysis
    // ... Implement category analysis logic if needed, this part is complex and can be added later.
    // For now, we'll hide the table if it's empty.
    document.getElementById('analysis-table').style.display = 'none';

    // Recommendations (Placeholder)
    document.getElementById('recommendation-feedback').innerHTML = `<p>Terus berlatih untuk meningkatkan kecepatan dan ketepatan Anda. Fokus pada soal-soal yang Anda jawab salah saat melakukan review.</p>`;
}


function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
}

function buildReviewGrid() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = activeQuestions.map((q, index) => {
        const isCorrect = userAnswers[q.id] === q.correctAnswer;
        const isAnswered = userAnswers.hasOwnProperty(q.id);
        const btnClass = isAnswered ? (isCorrect ? 'review-correct' : 'review-incorrect') : '';
        return `<button class="q-btn ${btnClass}" onclick="loadReviewQuestion(${index})">${index + 1}</button>`;
    }).join('');
}

function loadReviewQuestion(index) {
    currentReviewIndex = index;
    const q = activeQuestions[index];
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;

    document.getElementById('review-question-number-category').textContent = `Soal ${index + 1} - ${q.category}`;
    document.getElementById('review-question-text').innerHTML = parseMarkdown(q.question);
    document.getElementById('review-explanation-text').textContent = q.pembahasan || "Pembahasan untuk soal ini belum tersedia.";
    
    const banner = document.getElementById('review-status-banner');
    if (userAnswer) {
        banner.className = 'review-status-banner ' + (isCorrect ? 'correct' : 'incorrect');
        banner.innerHTML = `<i class="fas fa-check-circle"></i> Jawaban Anda ${isCorrect ? 'Benar' : 'Salah'}`;
    } else {
        banner.className = 'review-status-banner'; // Neutral
        banner.innerHTML = `Soal ini tidak dijawab`;
    }

    const optionsContainer = document.getElementById('review-options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd', 'e'];
    q.options.forEach((optionText, i) => {
        const optionValue = optionLabels[i];
        const div = document.createElement('div');
        div.className = 'review-option';
        if (optionValue === q.correctAnswer) div.classList.add('correct-answer');
        else if (optionValue === userAnswer) div.classList.add('user-incorrect');
        div.innerHTML = `<span>${optionText}</span>`;
        optionsContainer.appendChild(div);
    });
    updateReviewUI();
}

function updateReviewUI() {
    document.getElementById('review-prev-btn').disabled = currentReviewIndex === 0;
    document.getElementById('review-next-btn').disabled = currentReviewIndex === activeQuestions.length - 1;
    document.querySelectorAll('#review-grid .q-btn').forEach((btn, i) => {
        btn.classList.toggle('current-review', i === currentReviewIndex);
    });
}

function reviewPrevQuestion() { if (currentReviewIndex > 0) loadReviewQuestion(currentReviewIndex - 1); }
function reviewNextQuestion() { if (currentReviewIndex < activeQuestions.length - 1) loadReviewQuestion(currentReviewIndex + 1); }

function tryAgain() { window.location.reload(); }

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    html2canvas(report, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.save(`Laporan-TOPintar-${participantName.replace(/\s/g, '_')}.pdf`);
    });
}