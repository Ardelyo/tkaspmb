
// js/main.js

import { state, setConfig, setAllQuestions, setParticipantName } from './state.js';
import { loadConfig, loadBatch } from './api.js';
import { showScreen, applyBranding, buildBatchSelectionScreen, analyzeAndBuildModeScreen } from './ui.js';
import { startTest, beginActualTest, nextQuestion, prevQuestion, toggleFlag, confirmFinish } from './quiz.js';
import { showReview, reviewPrevQuestion, reviewNextQuestion, loadReviewQuestion } from './review.js';
import { downloadPDF } from './report.js';

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
    const config = await loadConfig();
    if (config) {
        setConfig(config);
        applyBranding();
        
        if (config.access && config.access.required) {
            showScreen('login');
        } else {
            showScreen('welcome');
        }
        setupGlobalEventHandlers();
    }
}

function handleLogin() {
    const codeInput = document.getElementById('access-code');
    const errorEl = document.getElementById('login-error');
    const enteredCode = codeInput.value.trim();

    if (state.config.access.validCodes.includes(enteredCode)) {
        showScreen('welcome');
        errorEl.style.display = 'none';
    } else {
        errorEl.textContent = 'Kode Akses tidak valid. Silakan coba lagi.';
        errorEl.style.display = 'block';
    }
}

function prepareTest() {
    const name = document.getElementById('participant-name').value.trim();
    if (name === "") {
        alert("Nama tidak boleh kosong.");
        return;
    }
    setParticipantName(name);
    buildBatchSelectionScreen(selectBatch);
}

async function selectBatch(batch) {
    const questions = await loadBatch(batch.filePath);
    if (questions) {
        setAllQuestions(questions);
        analyzeAndBuildModeScreen(startTest);
    }
}

function goBackToWelcome() {
    showScreen('welcome');
}

function tryAgain() {
    window.location.reload();
}

function setupGlobalEventHandlers() {
    window.handleLogin = handleLogin;
    window.prepareTest = prepareTest;
    window.beginActualTest = beginActualTest;
    window.goBackToWelcome = goBackToWelcome;
    window.nextQuestion = nextQuestion;
    window.prevQuestion = prevQuestion;
    window.toggleFlag = toggleFlag;
    window.confirmFinish = confirmFinish;
    window.showReview = showReview;
    window.reviewPrevQuestion = reviewPrevQuestion;
    window.reviewNextQuestion = reviewNextQuestion;
    window.tryAgain = tryAgain;
    window.downloadPDF = downloadPDF;
    window.selectAnswer = selectAnswer;
    window.loadQuestion = loadQuestion; // from quiz.js
    window.loadReviewQuestion = loadReviewQuestion; // from review.js
}
