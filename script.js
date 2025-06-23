// script.js (FINAL REFACTORED VERSION WITH STATE MANAGEMENT)

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
let totalTestTimeMinutes = 0;
let currentReviewIndex = 0;

// THE SINGLE SOURCE OF TRUTH FOR THE UI
let appState = {
    currentScreen: null, // e.g., 'login', 'test', 'results'
    isSidebarOpen: false,
    isReviewSidebarOpen: false
};

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
    sidebar: document.querySelector('#test-screen .sidebar'),
    reviewSidebar: document.getElementById('review-sidebar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    questionGrid: document.getElementById('question-grid'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    mobileTimer: document.getElementById('timer-mobile'),
    desktopTimer: document.getElementById('timer-desktop'),
    progressBar: document.getElementById('progress-bar'),
    mobileQuestionInfo: document.getElementById('question-number-category-mobile'),
};


// -----------------------------------------------------------------------------
// 2. INITIALIZATION & CORE UI RENDERING
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Network response was not ok');
        config = await response.json();
        
        applyBranding();
        setupEventListeners();
        
        // Set the initial screen state
        if (config.access?.required) {
            appState.currentScreen = 'login';
        } else {
            appState.currentScreen = 'welcome';
        }
        
        // Perform the first render of the application
        render();

    } catch (error) {
        console.error("Fatal Error: Failed to load configuration.", error);
        document.body.innerHTML = `<div style="padding: 2rem; text-align: center;"><h1>Error</h1><p>Gagal memuat file konfigurasi aplikasi (config.json). Pastikan file ada dan valid.</p></div>`;
    }
}

// The MASTER RENDER function. The only function that should change the UI layout.
function render() {
    // Render Screen Visibility
    for (const screenKey in dom.screens) {
        const screenElement = dom.screens[screenKey];
        if (screenKey === appState.currentScreen) {
            screenElement.classList.add('active');
        } else {
            screenElement.classList.remove('active');
        }
    }

    // Render Test Sidebar Visibility
    if (appState.isSidebarOpen) {
        dom.sidebar.classList.add('open');
    } else {
        dom.sidebar.classList.remove('open');
    }
    
    // Render Review Sidebar Visibility
    if (appState.isReviewSidebarOpen) {
        dom.reviewSidebar.classList.add('open');
    } else {
        dom.reviewSidebar.classList.remove('open');
    }
}

// State-updating function to show a screen.
function showScreen(screenName) {
    appState.currentScreen = screenName;
    // Close sidebars automatically when changing screens for a clean state
    appState.isSidebarOpen = false;
    appState.isReviewSidebarOpen = false;
    render();
}

function setupEventListeners() {
    // Test Screen Drawer
    document.getElementById('menu-toggle-btn').addEventListener('click', () => {
        appState.isSidebarOpen = true;
        render();
    });
    document.getElementById('close-sidebar-btn').addEventListener('click', () => {
        appState.isSidebarOpen = false;
        render();
    });

    // Review Screen Drawer
    document.getElementById('review-menu-toggle-btn').addEventListener('click', () => {
        appState.isReviewSidebarOpen = true;
        render();
    });
    document.getElementById('review-close-sidebar-btn').addEventListener('click', () => {
        appState.isReviewSidebarOpen = false;
        render();
    });
}

// -----------------------------------------------------------------------------
// 3. BRANDING & PRE-TEST SETUP (Functions now call showScreen)
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
        showScreen('welcome'); // Correctly uses the new function
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
    // This function doesn't need to change, it just populates a screen that is already managed by render()
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    document.getElementById('selection-title').textContent = 'Pilih Batch Ujian';
    document.getElementById('selection-description').textContent = 'Setiap batch berisi paket soal yang berbeda.';
    document.getElementById('back-to-welcome-btn').style.display = 'none';
    config.batches.forEach(batch => {
        const btn = document.createElement('button');
        btn.className = 'selection-btn' + (batch.status === 'locked' ? ' locked' : '');
        btn.innerHTML = `<i class="fas fa-layer-group"></i><strong>${batch.title}</strong><span>${batch.description}</span>`;
        if (batch.status !== 'locked') btn.onclick = () => selectBatch(batch);
        else btn.disabled = true;
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
    btn.onclick = () => startTest(mode, time);
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
// (The rest of the file remains largely the same, but with key UI updates delegated to the state system)
// Note: functions that don't directly manipulate layout (like the timer logic) do not need to change.

function startTest(mode, time) {
    totalTestTimeMinutes = time;
    activeQuestions = mode === 'all' ? allQuestions : allQuestions.filter(q => q.main_category === mode);
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
        const label = String.fromCharCode(65 + i);
        const isChecked = userAnswers[q.id] === label.toLowerCase() ? 'checked' : '';
        return `<label for="${optionId}" class="option"><input type="radio" name="q${q.id}" id="${optionId}" value="${label.toLowerCase()}" ${isChecked} style="display:none;"><span class="option-label">${label}</span><span>${option}</span></label>`;
    }).join('');
    dom.optionsContainer.querySelectorAll('.option').forEach(label => {
        label.addEventListener('click', () => {
            const radio = label.querySelector('input[type="radio"]');
            if (radio) selectAnswer(q.id, radio.value);
            updateUI();
        });
    });
    updateUI();
    
    // Update state to close sidebar and re-render
    appState.isSidebarOpen = false;
    render();
}

function updateUI() {
    dom.prevBtn.disabled = currentQuestionIndex === 0;
    dom.nextBtn.disabled = currentQuestionIndex === activeQuestions.length - 1;
    dom.questionGrid.querySelectorAll('.q-btn').forEach((btn, i) => {
        btn.classList.toggle('current', i === currentQuestionIndex);
        btn.classList.toggle('answered', !!userAnswers[activeQuestions[i].id]);
    });
}

function buildNavigationGrid() {
    dom.questionGrid.innerHTML = activeQuestions.map((_, index) => `<button class="q-btn" onclick="loadQuestion(${index})">${index + 1}</button>`).join('');
}

function selectAnswer(questionId, answer) {
    userAnswers[questionId] = answer;
    // (The logic to re-render options is now inside loadQuestion, which would be inefficient.
    // A better approach for a future refactor would be to handle option selection more granularly,
    // but for now, this works by re-rendering the whole question).
    loadQuestion(currentQuestionIndex); 
}

function nextQuestion() { if (currentQuestionIndex < activeQuestions.length - 1) loadQuestion(currentQuestionIndex + 1); }
function prevQuestion() { if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1); }

function confirmFinish() {
    if (confirm("Apakah Anda yakin ingin menyelesaikan sesi ini? Jawaban tidak dapat diubah kembali.")) {
        finishTest();
    }
}

function finishTest() {
    clearInterval(timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}


// -----------------------------------------------------------------------------
// 5. REPORTING & REVIEW
// -----------------------------------------------------------------------------
// The logic within these functions remains the same as they primarily deal with data, not layout state.

function generateReport() {
    document.getElementById('report-name').textContent = participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'SESI-' + Date.now();
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
    const durationMs = new Date() - testStartTime;
    document.getElementById('report-duration').textContent = `${Math.floor(durationMs / 60000)} menit ${Math.floor((durationMs % 60000) / 1000)} detik`;
    let correctAnswers = 0;
    activeQuestions.forEach(q => { if (userAnswers[q.id] === q.correctAnswer) correctAnswers++; });
    const answeredCount = Object.keys(userAnswers).length;
    const score = activeQuestions.length > 0 ? Math.round((correctAnswers / activeQuestions.length) * 100) : 0;
    const scoreDisplay = document.querySelector('#summary-card .score-display');
    scoreDisplay.style.setProperty('--score', score);
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

function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
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
    banner.className = 'review-status-banner';
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
        if (label === q.correctAnswer) optionClass += ' review-correct-answer';
        if (isAnswered && !isCorrect && label === userAnswer) optionClass += ' review-user-incorrect';
        return `<div class="${optionClass}"><span class="option-label">${String.fromCharCode(65 + i)}</span><span>${option}</span></div>`;
    }).join('');
    document.getElementById('review-prev-btn').disabled = index === 0;
    document.getElementById('review-next-btn').disabled = index === activeQuestions.length - 1;

    // Update state to close review sidebar and re-render
    appState.isReviewSidebarOpen = false;
    render();
}

function buildReviewGrid() {
    document.getElementById('review-grid').innerHTML = activeQuestions.map((q, i) => {
        const isAnswered = userAnswers.hasOwnProperty(q.id);
        const isCorrect = isAnswered && userAnswers[q.id] === q.correctAnswer;
        let btnClass = isAnswered ? (isCorrect ? 'review-correct' : 'review-incorrect') : '';
        return `<button class="q-btn ${btnClass}" onclick="loadReviewQuestion(${i})">${i + 1}</button>`;
    }).join('');
}

function reviewPrevQuestion() { if (currentReviewIndex > 0) loadReviewQuestion(currentReviewIndex - 1); }
function reviewNextQuestion() { if (currentReviewIndex < activeQuestions.length - 1) loadReviewQuestion(currentReviewIndex + 1); }

// (The remaining functions for reporting, anti-cheat, and utilities are unchanged as they don't manage layout state)
function generateViolationReport(){const section=document.getElementById("violation-report-section"),violationDetails=document.getElementById("violation-details");let hasViolations=!1;violationDetails.innerHTML="",violationTracker.tabChanges>0&&(violationDetails.innerHTML+=`<div class="behavior-item">Keluar dari tab/jendela ujian terdeteksi: <strong>${violationTracker.tabChanges} kali</strong></div>`,hasViolations=!0),violationTracker.devToolsOpened&&(violationDetails.innerHTML+='<div class="behavior-item">Developer Tools (Inspect Element) terdeteksi terbuka.</div>',hasViolations=!0),section.style.display=hasViolations?"block":"none"}
function generateCategoryAnalysis(){const analysisCard=document.getElementById("analysis-card"),analysisContainer=document.getElementById("analysis-container"),categoryStats={};return activeQuestions.forEach(q=>{const cat=q.main_category||"Lainnya";categoryStats[cat]||(categoryStats[cat]={correct:0,total:0}),categoryStats[cat].total++,userAnswers[q.id]===q.correctAnswer&&categoryStats[cat].correct++}),Object.keys(categoryStats).length>1?(analysisContainer.innerHTML=Object.entries(categoryStats).map(([name,stats])=>{const accuracy=stats.total>0?Math.round(stats.correct/stats.total*100):0;return`<div class="category-item"><div class="category-info"><strong>${name}</strong><span>${stats.correct}/${stats.total} Benar (${accuracy}%)</span></div><div class="accuracy-bar-container"><div class="accuracy-bar" style="width: ${accuracy}%;"></div></div></div>`}).join(""),analysisCard.style.display="block"):analysisCard.style.display="none",categoryStats}
function generateRecommendations(){const feedbackEl=document.getElementById("recommendation-feedback"),stats=generateCategoryAnalysis();let recommendations=[];const sortedCats=Object.entries(stats).sort(([,a],[,b])=>a.correct/a.total-b.correct/b.total);if(sortedCats.length>0){const weakest=sortedCats[0];weakest[1].correct/weakest[1].total<.6&&recommendations.push(`Kinerja Anda di kategori <strong>${weakest[0]}</strong> perlu perhatian lebih. Fokus pelajari kembali soal-soal di area ini.`);if(sortedCats.length>1){const strongest=sortedCats[sortedCats.length-1];strongest[1].correct/strongest[1].total>=.8&&strongest[0]!==weakest[0]&&recommendations.push(`Anda menunjukkan penguasaan yang sangat baik pada kategori <strong>${strongest[0]}</strong>. Pertahankan!`)}}0===recommendations.length&&recommendations.push("Performa Anda secara umum sudah cukup baik dan seimbang. Terus berlatih untuk meningkatkan kecepatan dan konsistensi."),feedbackEl.innerHTML=`<p>${recommendations.join("</p><p>")}</p>`}
function initializeAntiCheatListeners(){violationTracker={tabChanges:0,devToolsOpened:!1,sessionActive:!0,monitoringInterval:null},window.addEventListener("blur",()=>{violationTracker.sessionActive&&violationTracker.tabChanges++}),violationTracker.monitoringInterval=setInterval(()=>{window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160?violationTracker.devToolsOpened||(violationTracker.devToolsOpened=!0):""},1e3)}
function removeAntiCheatListeners(){if(!violationTracker.sessionActive)return;window.removeEventListener("blur",()=>{}),clearInterval(violationTracker.monitoringInterval),violationTracker.sessionActive=!1}
function tryAgain(){window.location.reload()}
function downloadPDF(){const{jsPDF:jsPDF}=window.jspdf,report=document.getElementById("report-container"),originalShadow=report.style.boxShadow;report.style.boxShadow="none",html2canvas(report,{scale:2,useCORS:!0,backgroundColor:null}).then(canvas=>{report.style.boxShadow=originalShadow;const imgData=canvas.toDataURL("image/png"),pdf=new jsPDF("p","mm","a4"),pdfWidth=pdf.internal.pageSize.getWidth(),pdfHeight=canvas.height*pdfWidth/canvas.width;pdf.addImage(imgData,"PNG",10,10,pdfWidth-20,pdfHeight-20),pdf.save(`Laporan-Hasil-${participantName.replace(/\s/g,"_")}.pdf`)}).catch(err=>{console.error("Gagal membuat PDF:",err),alert("Maaf, terjadi kesalahan saat membuat file PDF."),report.style.boxShadow=originalShadow})}
