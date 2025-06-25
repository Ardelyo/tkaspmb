
// js/quiz.js

import { state, setTimerInterval, resetState, setActiveQuestions, setTotalTestTimeMinutes, setCurrentQuestionIndex, setUserAnswers } from './state.js';
import { showInstructionScreen, showScreen, renderQuestion, updateTimer, buildNavigationGrid } from './ui.js';
import { initializeAntiCheatListeners, removeAntiCheatListeners } from './antiCheat.js';
import { generateReport } from './report.js';

export function startTest(mode) {
    if (mode === 'all') {
        setActiveQuestions(state.allQuestions);
    } else {
        setActiveQuestions(state.allQuestions.filter(q => q.main_category === mode));
    }

    setTotalTestTimeMinutes(state.activeQuestions.length * 6);

    if (state.config.security.antiCheatEnabled && mode === state.config.security.applyToMode) {
        alert("PERHATIAN: Sesi Ujian Lengkap ini dipantau oleh sistem. Aktivitas seperti meninggalkan tab, klik kanan, atau mengubah ukuran jendela akan tercatat. Tetap fokus pada jendela ujian.");
        initializeAntiCheatListeners();
    }

    showInstructionScreen();
}

export function beginActualTest() {
    resetState();
    buildNavigationGrid();
    loadQuestion(0);
    startTimer();
    state.testStartTime = new Date();
    showScreen('test');
}

function startTimer() {
    let time = state.totalTestTimeMinutes * 60;
    
    const interval = setInterval(() => {
        updateTimer(time);

        if (--time < 0) {
            clearInterval(interval);
            finishTest();
        }
    }, 1000);
    setTimerInterval(interval);
}

export function loadQuestion(index) {
    setCurrentQuestionIndex(index);
    renderQuestion();
}

export function selectAnswer(questionId, answer) { 
    const newAnswers = { ...state.userAnswers, [questionId]: answer };
    setUserAnswers(newAnswers);
}

export function nextQuestion() { 
    if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
        loadQuestion(state.currentQuestionIndex + 1); 
    }
}

export function prevQuestion() { 
    if (state.currentQuestionIndex > 0) { 
        loadQuestion(state.currentQuestionIndex - 1); 
    }
}

export function toggleFlag() {
    const currentId = state.activeQuestions[state.currentQuestionIndex].id;
    if (state.flaggedQuestions.has(currentId)) {
        state.flaggedQuestions.delete(currentId);
    } else {
        state.flaggedQuestions.add(currentId);
    }
    renderQuestion(); // Re-render to update flag status
}

export function confirmFinish() { 
    if (confirm("Apakah Anda yakin ingin menyelesaikan sesi ini?")) { 
        finishTest(); 
    }
}

function finishTest() {
    clearInterval(state.timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}
