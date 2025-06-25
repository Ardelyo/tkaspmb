
// js/review.js

import { state, setCurrentReviewIndex } from './state.js';
import { showScreen } from './ui.js';
import { parseMarkdown } from './utils.js';

export function showReview() {
    buildReviewGrid();
    loadReviewQuestion(0);
    showScreen('review');
}

function buildReviewGrid() {
    const grid = document.getElementById('review-grid');
    grid.innerHTML = state.activeQuestions.map((q, index) => {
        const isCorrect = state.userAnswers[q.id] === q.correctAnswer;
        const isAnswered = state.userAnswers.hasOwnProperty(q.id);
        const btnClass = isAnswered ? (isCorrect ? 'review-correct' : 'review-incorrect') : '';
        return `<button class="q-btn ${btnClass}" onclick="window.loadReviewQuestion(${index})">${index + 1}</button>`;
    }).join('');
}

export function loadReviewQuestion(index) {
    setCurrentReviewIndex(index);
    const q = state.activeQuestions[index];
    const userAnswer = state.userAnswers[q.id];
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
        banner.innerHTML = `<i class="fas fa-minus-circle"></i> Soal ini tidak dijawab`;
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
    document.getElementById('review-prev-btn').disabled = state.currentReviewIndex === 0;
    document.getElementById('review-next-btn').disabled = state.currentReviewIndex === state.activeQuestions.length - 1;
    document.querySelectorAll('#review-grid .q-btn').forEach((btn, i) => {
        btn.classList.toggle('current-review', i === state.currentReviewIndex);
    });
}

export function reviewPrevQuestion() { 
    if (state.currentReviewIndex > 0) { 
        loadReviewQuestion(state.currentReviewIndex - 1); 
    }
}

export function reviewNextQuestion() { 
    if (state.currentReviewIndex < state.activeQuestions.length - 1) { 
        loadReviewQuestion(state.currentReviewIndex + 1); 
    }
}
