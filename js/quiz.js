
// js/quiz.js

import { state, setTimerInterval, resetQuizProgress, setActiveQuestions, setTotalTestTimeMinutes, setCurrentQuestionIndex, setUserAnswers } from './state.js';
import { showInstructionScreen, showScreen, renderQuestion, updateTimer, buildNavigationGrid } from './ui.js';
import { initializeAntiCheatListeners, removeAntiCheatListeners } from './antiCheat.js';
import { generateReport } from './report.js';

let lastQuestionChangeTime = null;

export function startTest(mode) {
    resetQuizProgress(); // Reset progress here

    if (mode === 'all') {
        setActiveQuestions(state.allQuestions);
        setTotalTestTimeMinutes(90);
    } else {
        const filteredQuestions = state.allQuestions.filter(q => q.main_category === mode);
        setActiveQuestions(filteredQuestions);
        
        if (mode === 'Literasi' || mode === 'Numerasi') {
            setTotalTestTimeMinutes(60);
        } else {
            setTotalTestTimeMinutes(filteredQuestions.length * 0.5); // 30 seconds per question for others
        }
    }

    if (state.config.security.antiCheatEnabled && mode === state.config.security.applyToMode) {
        alert("PERHATIAN: Sesi Ujian Lengkap ini dipantau oleh sistem. Aktivitas seperti meninggalkan tab, klik kanan, atau mengubah ukuran jendela akan tercatat. Tetap fokus pada jendela ujian.");
        initializeAntiCheatListeners();
    }

    showInstructionScreen();
}

export function beginActualTest() {
    buildNavigationGrid();
    loadQuestion(0);
    startTimer();
    state.testStartTime = new Date();
    lastQuestionChangeTime = Date.now(); // Initialize the timer here
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
    const now = Date.now();
    // If we are not on the first question, calculate time spent on the previous one
    if (lastQuestionChangeTime && state.currentQuestionIndex !== null) {
        const previousQuestionId = state.activeQuestions[state.currentQuestionIndex].id;
        const timeSpent = Math.round((now - lastQuestionChangeTime) / 1000);

        if (!state.timeSpentPerQuestion[previousQuestionId]) {
            state.timeSpentPerQuestion[previousQuestionId] = 0;
        }
        state.timeSpentPerQuestion[previousQuestionId] += timeSpent;
    }

    // Update the timestamp for the new question
    lastQuestionChangeTime = now;

    setCurrentQuestionIndex(index);

    // Record the first visit timestamp if it doesn't exist
    const newQuestionId = state.activeQuestions[index].id;
    if (!state.questionTimestamps[newQuestionId]) {
        state.questionTimestamps[newQuestionId] = now;
    }

    renderQuestion();
}

export function selectAnswer(questionId, answer) { 
    // Track answer changes
    if (state.userAnswers[questionId] && state.userAnswers[questionId] !== answer) {
        if (!state.answerChanges[questionId]) {
            state.answerChanges[questionId] = 0;
        }
        state.answerChanges[questionId]++;
    }
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
    // Record time spent on the very last question
    const now = Date.now();
    if (lastQuestionChangeTime && state.currentQuestionIndex !== null) {
        const lastQuestionId = state.activeQuestions[state.currentQuestionIndex].id;
        const timeSpent = Math.round((now - lastQuestionChangeTime) / 1000);

        if (!state.timeSpentPerQuestion[lastQuestionId]) {
            state.timeSpentPerQuestion[lastQuestionId] = 0;
        }
        state.timeSpentPerQuestion[lastQuestionId] += timeSpent;
    }

    clearInterval(state.timerInterval);
    removeAntiCheatListeners();
    generateReport();
    showScreen('results');
}
