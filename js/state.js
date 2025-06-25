
// js/state.js

export const state = {
    config: {},
    allQuestions: [],
    activeQuestions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    flaggedQuestions: new Set(),
    timerInterval: null,
    participantName: '',
    totalTestTimeMinutes: 0,
    testStartTime: null,
    currentReviewIndex: 0
};

export function setConfig(newConfig) {
    state.config = newConfig;
}

export function setAllQuestions(questions) {
    state.allQuestions = questions;
}

export function setActiveQuestions(questions) {
    state.activeQuestions = questions;
}

export function setCurrentQuestionIndex(index) {
    state.currentQuestionIndex = index;
}

export function setUserAnswers(answers) {
    state.userAnswers = answers;
}

export function setFlaggedQuestions(flags) {
    state.flaggedQuestions = flags;
}

export function setTimerInterval(interval) {
    state.timerInterval = interval;
}

export function setParticipantName(name) {
    state.participantName = name;
}

export function setTotalTestTimeMinutes(minutes) {
    state.totalTestTimeMinutes = minutes;
}

export function setTestStartTime(time) {
    state.testStartTime = time;
}

export function setCurrentReviewIndex(index) {
    state.currentReviewIndex = index;
}

export function resetQuizProgress() {
    state.currentQuestionIndex = 0;
    state.userAnswers = {};
    state.flaggedQuestions.clear();
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    state.testStartTime = null;
}
