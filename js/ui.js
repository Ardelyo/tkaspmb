
// js/ui.js

import { state } from './state.js';
import { getCategoryIcon, parseMarkdown } from './utils.js';
import { selectAnswer, loadQuestion } from './quiz.js';

export const screens = {
    login: document.getElementById('login-screen'),
    welcome: document.getElementById('welcome-screen'),
    selection: document.getElementById('selection-screen'),
    instruction: document.getElementById('instruction-screen'),
    test: document.getElementById('test-screen'),
    results: document.getElementById('results-screen'),
    review: document.getElementById('review-screen')
};

export function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if(screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

export function applyBranding() {
    document.title = state.config.branding.title;
    document.getElementById('login-title').textContent = state.config.branding.title;
    document.getElementById('login-subtitle').textContent = state.config.branding.subtitle;
    document.getElementById('welcome-title').textContent = state.config.branding.title;
    document.getElementById('welcome-subtitle').textContent = state.config.branding.subtitle;
    document.getElementById('welcome-disclaimer').innerHTML = state.config.branding.disclaimer;
    document.getElementById('report-main-title').textContent = `LAPORAN HASIL UJIAN MANDIRI TOPINTAR`;
    document.getElementById('report-subtitle').textContent = state.config.branding.subtitle;
    document.getElementById('report-developer').textContent = state.config.branding.developer;
}

export function buildBatchSelectionScreen(onSelect) {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    
    document.getElementById('selection-title').textContent = 'Pilih Batch Ujian';
    document.getElementById('selection-description').textContent = 'Setiap batch berisi paket soal yang berbeda.';
    document.getElementById('back-to-welcome-btn').style.display = 'none';

    state.config.batches.forEach(batch => {
        const btn = document.createElement('button');
        btn.className = 'selection-btn';
        btn.innerHTML = `<i class="fas fa-layer-group"></i><strong>${batch.title}</strong><span>${batch.description}</span>`;
        if (batch.status === 'locked') {
            btn.classList.add('locked');
            btn.disabled = true;
        } else {
            btn.onclick = () => onSelect(batch);
        }
        grid.appendChild(btn);
    });
    showScreen('selection');
}

export function analyzeAndBuildModeScreen(onSelect) {
    const grid = document.getElementById('selection-grid');
    grid.innerHTML = '';
    
    document.getElementById('selection-title').textContent = 'Pilih Mode Ujian';
    document.getElementById('selection-description').textContent = 'Ujian Lengkap akan dimonitor oleh sistem anti-kecurangan.';
    document.getElementById('back-to-welcome-btn').style.display = 'inline-flex';

    const categories = {};
    state.allQuestions.forEach(q => {
        if (!categories[q.main_category]) {
            categories[q.main_category] = { count: 0, icon: getCategoryIcon(q.main_category) };
        }
        categories[q.main_category].count++;
    });

    const timeForAll = state.allQuestions.length * 6;
    const allBtn = createModeButton('all', 'Ujian Lengkap', state.allQuestions.length, timeForAll, 'fas fa-star', onSelect);
    grid.appendChild(allBtn);

    for (const catName in categories) {
        const cat = categories[catName];
        const timeForCategory = cat.count * 6;
        const btn = createModeButton(catName, catName, cat.count, timeForCategory, cat.icon, onSelect);
        grid.appendChild(btn);
    }
}

function createModeButton(mode, title, count, time, icon, onSelect) {
    const btn = document.createElement('button');
    btn.className = 'selection-btn';
    btn.innerHTML = `<i class="${icon}"></i><strong>${title}</strong><span>${count} Soal - ${time} Menit</span>`;
    btn.onclick = () => onSelect(mode);
    return btn;
}

export function showInstructionScreen() {
    document.getElementById('instruction-title').textContent = `Petunjuk Pengerjaan Ujian`;
    document.getElementById('instruction-list').innerHTML = `
        <li>Anda akan mengerjakan <strong>${state.activeQuestions.length} soal</strong>.</li>
        <li>Waktu pengerjaan Anda adalah <strong>${state.totalTestTimeMinutes} menit</strong>.</li>
        <li>Waktu akan berjalan otomatis saat tes dimulai.</li>
    `;
    showScreen('instruction');
}

export function renderQuestion() {
    const q = state.activeQuestions[state.currentQuestionIndex];
    document.getElementById('question-number-category').textContent = `Soal ${state.currentQuestionIndex + 1} dari ${state.activeQuestions.length} - ${q.category}`;
    document.getElementById('question-text').innerHTML = parseMarkdown(q.question);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const optionLabels = ['a', 'b', 'c', 'd', 'e'];
    q.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.innerHTML = `<input type="radio" name="option" value="${optionLabels[i]}"><span class="option-label">${optionLabels[i].toUpperCase()}</span><span>${option}</span>`;
        label.onclick = () => window.selectAnswer(q.id, optionLabels[i]);
        optionsContainer.appendChild(label);
    });
    
    if (state.userAnswers[q.id]) {
        const radio = optionsContainer.querySelector(`input[value="${state.userAnswers[q.id]}"]`);
        if(radio) radio.checked = true;
    }
    updateTestUI();
}

export function updateTestUI() {
    document.querySelectorAll('#question-grid .q-btn').forEach((btn, i) => {
        btn.className = 'q-btn';
        if (i === state.currentQuestionIndex) btn.classList.add('current');
        if (state.userAnswers[state.activeQuestions[i].id]) btn.classList.add('answered');
        if (state.flaggedQuestions.has(state.activeQuestions[i].id)) btn.classList.add('flagged');
    });

    document.getElementById('prev-btn').disabled = state.currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = state.currentQuestionIndex === state.activeQuestions.length - 1;
}

export function buildNavigationGrid() {
    document.getElementById('question-grid').innerHTML = state.activeQuestions.map((_, index) => 
        `<button class="q-btn" onclick="window.loadQuestion(${index})">${index + 1}</button>`
    ).join('');
}

export function updateTimer(time) {
    const timerEl = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    progressBar.style.width = `${((state.totalTestTimeMinutes * 60 - time) / (state.totalTestTimeMinutes * 60)) * 100}%`;
}
