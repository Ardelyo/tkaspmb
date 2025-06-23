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
        config = await response.json();
        applyBranding();
        
        if (config.access.required) {
            showScreen('login');
        } else {
            showScreen('welcome');
        }
    } catch (error) {
        console.error("Failed to load configuration:", error);
        document.body.innerHTML = "<h1>Error: Gagal memuat konfigurasi aplikasi.</h1>";
    }
}

function applyBranding() {
    document.title = config.branding.title;
    // Login Screen
    document.getElementById('login-title').textContent = config.branding.title;
    document.getElementById('login-subtitle').textContent = config.branding.subtitle;
    // Welcome Screen
    document.getElementById('welcome-title').textContent = config.branding.title;
    document.getElementById('welcome-subtitle').textContent = config.branding.subtitle;
    document.getElementById('welcome-disclaimer').textContent = config.branding.disclaimer;
    // Report Screen
    document.getElementById('report-main-title').textContent = `LAPORAN HASIL ${config.branding.title.toUpperCase()}`;
    document.getElementById('report-subtitle').textContent = config.branding.subtitle;
    document.getElementById('report-developer').textContent = config.branding.developer;
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
}


// --- AUTHENTICATION & SELECTION FLOW ---
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
        codeInput.focus();
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
        btn.innerHTML = `
            <i class="fas fa-layer-group"></i>
            <strong>${batch.title}</strong>
            <span>${batch.description}</span>
        `;
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
        allQuestions = await response.json();
        analyzeAndBuildModeScreen();
    } catch (error) {
        console.error(`Failed to load batch file ${batch.filePath}:`, error);
        alert('Gagal memuat data soal. Silakan coba lagi.');
    }
}

function analyzeAndBuildModeScreen() {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    
    document.getElementById('selection-title').textContent = 'Pilih Mode Ujian';
    document.getElementById('selection-description').textContent = 'Silakan pilih jenis tes yang ingin Anda kerjakan.';
    document.getElementById('back-to-welcome-btn').style.display = 'inline-flex';

    const categories = {};
    allQuestions.forEach(q => {
        if (!categories[q.main_category]) {
            categories[q.main_category] = { count: 0, icon: getCategoryIcon(q.main_category) };
        }
        categories[q.main_category].count++;
    });

    // Button for All Questions
    const allBtn = document.createElement('button');
    allBtn.className = 'selection-btn';
    allBtn.innerHTML = `
        <i class="fas fa-star"></i>
        <strong>Ujian Lengkap</strong>
        <span>${allQuestions.length} Soal - 30 Menit</span>
    `;
    allBtn.onclick = () => startTest('all');
    grid.appendChild(allBtn);

    // Buttons for each category
    for (const catName in categories) {
        const cat = categories[catName];
        const btn = document.createElement('button');
        btn.className = 'selection-btn';
        btn.innerHTML = `
            <i class="${cat.icon}"></i>
            <strong>${catName}</strong>
            <span>${cat.count} Soal - 15 Menit</span>
        `;
        btn.onclick = () => startTest(catName);
        grid.appendChild(btn);
    }
}

function getCategoryIcon(categoryName) {
    switch(categoryName.toLowerCase()) {
        case 'literasi': return 'fas fa-book-open';
        case 'numerasi': return 'fas fa-calculator';
        case 'sains': return 'fas fa-flask';
        default: return 'fas fa-question-circle';
    }
}

function goBackToWelcome() {
    showScreen('welcome');
}

// --- TEST LOGIC ---
function startTest(mode) {
    let testTitle;
    if (mode === 'all') {
        activeQuestions = allQuestions;
        totalTestTimeMinutes = 30;
        testTitle = `Ujian Lengkap`;
    } else {
        activeQuestions = allQuestions.filter(q => q.main_category === mode);
        totalTestTimeMinutes = 15;
        testTitle = `Ujian Kategori ${mode}`;
    }

    if (config.security.antiCheatEnabled && config.security.applyToMode === mode) {
        alert("PERHATIAN: Sesi Ujian Lengkap ini dipantau oleh sistem. Aktivitas seperti meninggalkan tab atau menyalin teks akan tercatat pada laporan akhir. Tetap fokus pada jendela ujian.");
        initializeAntiCheatListeners();
    }

    document.getElementById('instruction-title').textContent = `Petunjuk Pengerjaan ${testTitle}`;
    document.getElementById('instruction-list').innerHTML = `
        <li>Anda akan mengerjakan <strong>${activeQuestions.length} soal</strong> dalam waktu <strong>${totalTestTimeMinutes} menit</strong>.</li>
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
    showScreen('test');
}

function startTimer() {
    let time = totalTestTimeMinutes * 60;
    const totalTimeSeconds = time;
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        const timeElapsed = totalTimeSeconds - time;
        progressBar.style.width = `${(timeElapsed / totalTimeSeconds) * 100}%`;

        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            finishTest();
        }
    }, 1000);
}

function loadQuestion(index) {
    currentQuestionIndex = index;
    const q = activeQuestions[index];
    document.getElementById('question-number-category').textContent = `Soal ${index + 1} dari ${activeQuestions.length} - ${q.category}`;
    document.getElementById('question-text').innerHTML = `<pre>${q.question}</pre>`;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd'];
    q.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.innerHTML = `
            <input type="radio" name="option" value="${optionLabels[i]}">
            <span class="option-label">${optionLabels[i].toUpperCase()}</span>
            <span>${option}</span>
        `;
        label.onclick = () => selectAnswer(q.id, optionLabels[i]);
        optionsContainer.appendChild(label);
    });
    
    if (userAnswers[q.id]) {
        optionsContainer.querySelector(`input[value="${userAnswers[q.id]}"]`).checked = true;
    }
    updateUI();
}

function updateUI() {
    // Update navigation grid buttons
    document.querySelectorAll('#question-grid .q-btn').forEach((btn, i) => {
        const qId = activeQuestions[i].id;
        btn.className = 'q-btn';
        if (i === currentQuestionIndex) btn.classList.add('current');
        if (userAnswers[qId]) btn.classList.add('answered');
        if (flaggedQuestions.has(qId)) btn.classList.add('flagged');
    });

    // Update nav buttons
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = currentQuestionIndex === activeQuestions.length - 1;

    // Update flag button
    const flagBtn = document.getElementById('flag-btn');
    const currentId = activeQuestions[currentQuestionIndex].id;
    if(flaggedQuestions.has(currentId)) {
        flagBtn.classList.add('flagged');
        flagBtn.innerHTML = '<i class="fa-solid fa-flag"></i> Hapus Tanda';
    } else {
        flagBtn.classList.remove('flagged');
        flagBtn.innerHTML = '<i class="fa-solid fa-flag"></i> Tandai Soal';
    }
}

function buildNavigationGrid() {
    const grid = document.getElementById('question-grid');
    grid.innerHTML = '';
    activeQuestions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'q-btn';
        btn.textContent = index + 1;
        btn.onclick = () => loadQuestion(index);
        grid.appendChild(btn);
    });
}

function selectAnswer(questionId, answer) { userAnswers[questionId] = answer; updateUI(); }
function nextQuestion() { if (currentQuestionIndex < activeQuestions.length - 1) loadQuestion(currentQuestionIndex + 1); }
function prevQuestion() { if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1); }
function toggleFlag() {
    const currentId = activeQuestions[currentQuestionIndex].id;
    if (flaggedQuestions.has(currentId)) flaggedQuestions.delete(currentId);
    else flaggedQuestions.add(currentId);
    updateUI();
}

function confirmFinish() {
    if (confirm("Apakah Anda yakin ingin menyelesaikan sesi ini?")) {
        finishTest();
    }
}

function finishTest() {
    clearInterval(timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}

// --- ANTI-CHEAT MECHANISMS ---
function initializeAntiCheatListeners() {
    violationTracker = { tabChanges: 0, copyAttempts: 0, devToolsOpened: false, sessionActive: true, monitoringInterval: null };
    window.addEventListener('blur', handleVisibilityChange);
    document.addEventListener('copy', handleCopy);
    
    violationTracker.monitoringInterval = setInterval(() => {
        if ((window.outerWidth - window.innerWidth > 150) || (window.outerHeight - window.innerHeight > 150)) {
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
const handleCopy = (e) => { if (violationTracker.sessionActive) { e.preventDefault(); violationTracker.copyAttempts++; } };


// --- REPORTING & REVIEW ---
function generateReport() {
    let correctAnswers = 0;
    activeQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctAnswer) correctAnswers++;
    });
    
    const score = activeQuestions.length > 0 ? Math.round((correctAnswers / activeQuestions.length) * 100) : 0;
    document.getElementById('report-name').textContent = participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'TKA-' + Date.now();
    document.getElementById('final-score').textContent = score;
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = Object.keys(userAnswers).length - correctAnswers;
    document.getElementById('unanswered-count').textContent = activeQuestions.length - Object.keys(userAnswers).length;

    // Violation Report
    const violationSection = document.getElementById('violation-report-section');
    const violationDetails = document.getElementById('violation-details');
    violationDetails.innerHTML = '';
    let hasViolations = false;
    
    if (violationTracker.tabChanges > 0) {
        violationDetails.innerHTML += `<div class="behavior-item"><p>Keluar dari tab/jendela ujian terdeteksi: <strong>${violationTracker.tabChanges} kali</strong></p></div>`;
        hasViolations = true;
    }
    if (violationTracker.copyAttempts > 0) {
        violationDetails.innerHTML += `<div class="behavior-item"><p>Upaya menyalin teks soal terdeteksi: <strong>${violationTracker.copyAttempts} kali</strong></p></div>`;
        hasViolations = true;
    }
    if (violationTracker.devToolsOpened) {
        violationDetails.innerHTML += `<div class="behavior-item"><p>Developer Tools (Inspect Element) terdeteksi terbuka selama ujian.</p></div>`;
        hasViolations = true;
    }

    if (hasViolations) {
        violationSection.style.display = 'block';
    } else {
        violationSection.style.display = 'none';
    }
}

function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
}

function buildReviewGrid() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = '';
    activeQuestions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'q-btn';
        btn.textContent = index + 1;
        btn.onclick = () => loadReviewQuestion(index);
        const userAnswer = userAnswers[q.id];
        if (userAnswer === q.correctAnswer) btn.classList.add('review-correct');
        else if (userAnswer) btn.classList.add('review-incorrect');
        grid.appendChild(btn);
    });
}

function loadReviewQuestion(index) {
    currentReviewIndex = index;
    const q = activeQuestions[index];
    const userAnswer = userAnswers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;

    document.getElementById('review-question-number-category').textContent = `Soal ${index + 1} - ${q.category}`;
    document.getElementById('review-question-text').innerHTML = `<pre>${q.question}</pre>`;
    document.getElementById('review-explanation-text').textContent = q.pembahasan || "Pembahasan untuk soal ini belum tersedia.";
    
    const banner = document.getElementById('review-status-banner');
    if (userAnswer) {
        banner.className = isCorrect ? 'correct' : 'incorrect';
        banner.innerHTML = isCorrect ? `<i class="fas fa-check-circle"></i> Jawaban Anda Benar` : `<i class="fas fa-times-circle"></i> Jawaban Anda Salah`;
    } else {
        banner.className = 'unanswered'; banner.innerHTML = 'Soal ini tidak dijawab';
    }

    const optionsContainer = document.getElementById('review-options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd'];
    q.options.forEach((optionText, i) => {
        const optionValue = optionLabels[i];
        const div = document.createElement('div');
        div.className = 'review-option';
        if (optionValue === q.correctAnswer) div.classList.add('correct-answer');
        else if (optionValue === userAnswer) div.classList.add('user-incorrect');
        div.innerHTML = `<span class="option-label">${optionValue.toUpperCase()}</span><span>${optionText}</span>`;
        optionsContainer.appendChild(div);
    });

    updateReviewUI();
}

function updateReviewUI() {
    document.getElementById('review-prev-btn').disabled = currentReviewIndex === 0;
    document.getElementById('review-next-btn').disabled = currentReviewIndex === activeQuestions.length - 1;
    document.querySelectorAll('#review-grid .q-btn').forEach((btn, i) => {
        btn.classList.remove('current-review');
        if (i === currentReviewIndex) btn.classList.add('current-review');
    });
}

function reviewPrevQuestion() { if (currentReviewIndex > 0) loadReviewQuestion(currentReviewIndex - 1); }
function reviewNextQuestion() { if (currentReviewIndex < activeQuestions.length - 1) loadReviewQuestion(currentReviewIndex + 1); }

function tryAgain() {
    window.location.reload();
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    html2canvas(report, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Laporan-TOPintar-${participantName.replace(/\s/g, '_')}.pdf`);
    });
}