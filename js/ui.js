
// js/ui.js

import { state } from './state.js';
import { getCategoryIcon, parseMarkdown } from './utils.js';

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
    Object.values(screens).forEach(s => s.classList.remove('screen--active'));
    if(screens[screenName]) {
        screens[screenName].classList.add('screen--active');
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
        btn.innerHTML = `<i class="fas fa-layer-group selection-btn__icon"></i><strong class="selection-btn__title">${batch.title}</strong><span class="selection-btn__description">${batch.description}</span>`;
        if (batch.status === 'locked') {
            btn.classList.add('selection-btn--locked');
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

    const timeForAll = 90; // Hardcoded 90 minutes for the full test
    const allBtn = createModeButton('all', 'Ujian Lengkap', state.allQuestions.length, timeForAll, 'fas fa-star', onSelect);
    grid.appendChild(allBtn);

    for (const catName in categories) {
        const cat = categories[catName];
        const timeForCategory = Math.ceil(cat.count * 0.5); // 30 seconds per question
        const btn = createModeButton(catName, catName, cat.count, timeForCategory, cat.icon, onSelect);
        grid.appendChild(btn);
    }
}

function createModeButton(mode, title, count, time, icon, onSelect) {
    const btn = document.createElement('button');
    btn.className = 'selection-btn';
    btn.innerHTML = `<i class="${icon} selection-btn__icon"></i><strong class="selection-btn__title">${title}</strong><span class="selection-btn__description">${count} Soal - ${time} Menit</span>`;
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
        label.innerHTML = `<input type="radio" name="option" value="${optionLabels[i]}" class="option__radio"><span class="option__label">${optionLabels[i].toUpperCase()}</span><span>${option}</span>`;
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
        if (i === state.currentQuestionIndex) btn.classList.add('q-btn--current');
        if (state.userAnswers[state.activeQuestions[i].id]) btn.classList.add('q-btn--answered');
        if (state.flaggedQuestions.has(state.activeQuestions[i].id)) btn.classList.add('q-btn--flagged');
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

// =============================================================================
// NEW ADVANCED REPORTING FUNCTIONS
// =============================================================================

export function renderAdvancedReport(analysis) {
    renderPerformanceChart(analysis.categoryPerformance);
    renderBehavioralMetrics(analysis.behavioral);
    renderPaceAnalysisTable(analysis.pace);
}

function renderPerformanceChart(categoryData) {
    const container = document.getElementById('performance-chart-container');
    container.innerHTML = ''; // Clear previous chart

    const maxScore = 100; // Use 100 as a stable max score for percentage

    for (const categoryName in categoryData) {
        const category = categoryData[categoryName];
        const barPercentage = category.score;

        const chartBar = document.createElement('div');
        chartBar.className = 'report__chart-bar-item';
        chartBar.innerHTML = `
            <div class="chart-bar__label">${categoryName}</div>
            <div class="chart-bar__wrapper">
                <div class="chart-bar__fill" style="width: ${barPercentage}%; background-color: ${getCategoryColor(categoryName)};"></div>
            </div>
            <div class="chart-bar__value">${category.score.toFixed(0)}%</div>
        `;
        container.appendChild(chartBar);
    }
}

function renderBehavioralMetrics(behavioralData) {
    const container = document.getElementById('behavioral-metrics-grid');
    container.innerHTML = ''; // Clear previous metrics

    const metrics = [
        {
            icon: 'fa-stopwatch',
            label: 'Waktu Rata-rata / Soal',
            value: `${behavioralData.avgTimePerQuestion.toFixed(1)}s`
        },
        {
            icon: 'fa-check-circle',
            label: 'Waktu Rata-rata (Benar)',
            value: `${behavioralData.avgTimeCorrect.toFixed(1)}s`
        },
        {
            icon: 'fa-times-circle',
            label: 'Waktu Rata-rata (Salah)',
            value: `${behavioralData.avgTimeIncorrect.toFixed(1)}s`
        },
        {
            icon: 'fa-exchange-alt',
            label: 'Total Perubahan Jawaban',
            value: `${behavioralData.totalAnswerChanges}`
        }
    ];

    metrics.forEach(metric => {
        const card = document.createElement('div');
        card.className = 'behavior-metric-card';
        card.innerHTML = `
            <div class="metric-card__icon"><i class="fas ${metric.icon}"></i></div>
            <div class="metric-card__body">
                <div class="metric-card__value">${metric.value}</div>
                <div class="metric-card__label">${metric.label}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderPaceAnalysisTable(paceData) {
    const tbody = document.getElementById('pace-analysis-table-body');
    tbody.innerHTML = ''; // Clear previous table

    paceData.forEach((item, index) => {
        const row = document.createElement('tr');
        const resultStatus = item.isCorrect ? 'correct' : 'incorrect';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.category}</td>
            <td><span class="pace-table__status pace-table__status--${resultStatus}">${item.isCorrect ? 'Benar' : 'Salah'}</span></td>
            <td>${item.timeSpent}s</td>
            <td>${item.changes} kali</td>
        `;
        tbody.appendChild(row);
    });
}

// Helper to get a color for the chart based on category name
function getCategoryColor(categoryName) {
    let hash = 0;
    for (let i = 0; i < categoryName.length; i++) {
        hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = ['#2563EB', '#16A34A', '#F59E0B', '#DC2626', '#7C3AED', '#DB2777', '#0891B2'];
    return colors[Math.abs(hash) % colors.length];
}
