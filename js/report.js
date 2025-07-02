
// js/report.js

import { state } from './state.js';
import { getViolationTracker } from './antiCheat.js';
import { getCategoryIcon } from './utils.js';

import { renderAdvancedReport } from './ui.js';

export function generateReport() {
    // ... (existing basic info and duration calculation)

    // --- CALCULATIONS ---
    const analysis = performAdvancedAnalysis();

    // --- RENDER BASIC REPORT ---
    document.getElementById('report-name').textContent = state.participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'TKA-' + Date.now();
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });
    const durationMs = new Date() - state.testStartTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    document.getElementById('report-duration').textContent = `${minutes} menit ${seconds} detik`;

    document.getElementById('final-score').textContent = analysis.overall.score;
    document.getElementById('score-predicate').textContent = analysis.overall.predicate;
    document.getElementById('correct-count').textContent = analysis.overall.correctCount;
    document.getElementById('incorrect-count').textContent = analysis.overall.incorrectCount;
    document.getElementById('unanswered-count').textContent = analysis.overall.unansweredCount;

    // --- RENDER ADVANCED & OTHER SECTIONS ---
    generateViolationReport();
    generateCategoryAnalysis(analysis.categoryPerformance);
    generatePersonalizedRecommendations(analysis.categoryPerformance);
    renderAdvancedReport(analysis); // New function call
}

function performAdvancedAnalysis() {
    const { activeQuestions, userAnswers, timeSpentPerQuestion, answerChanges } = state;
    let correctCount = 0;
    let answeredCount = Object.keys(userAnswers).length;
    let totalTimeCorrect = 0;
    let totalTimeIncorrect = 0;
    let correctAnswersCount = 0;
    let incorrectAnswersCount = 0;
    let totalAnswerChanges = 0;

    const categoryPerformance = {};
    const pace = [];

    activeQuestions.forEach(q => {
        const isCorrect = userAnswers[q.id] === q.correctAnswer;
        const timeSpent = timeSpentPerQuestion[q.id] || 0;
        const changes = answerChanges[q.id] || 0;

        // Overall stats
        if (isCorrect) {
            correctCount++;
            totalTimeCorrect += timeSpent;
            correctAnswersCount++;
        } else if (userAnswers[q.id]) { // Answered but incorrect
            totalTimeIncorrect += timeSpent;
            incorrectAnswersCount++;
        }

        // Category stats
        const category = q.main_category;
        if (!categoryPerformance[category]) {
            categoryPerformance[category] = { total: 0, correct: 0, time: 0 };
        }
        categoryPerformance[category].total++;
        categoryPerformance[category].time += timeSpent;
        if (isCorrect) {
            categoryPerformance[category].correct++;
        }

        // Pace analysis
        pace.push({ 
            category: q.category, 
            isCorrect, 
            timeSpent, 
            changes 
        });

        totalAnswerChanges += changes;
    });

    const isFullTest = state.activeQuestions.length === state.allQuestions.length;

    // Finalize category scores
    for (const cat in categoryPerformance) {
        const { total, correct } = categoryPerformance[cat];
        categoryPerformance[cat].score = total > 0 ? Math.round((correct / total) * 100) : 0;
    }

    const score = isFullTest 
        ? correctCount * 10 
        : (activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0);

    return {
        overall: {
            score,
            predicate: score >= 80 ? 'SANGAT BAIK' : score >= 60 ? 'BAIK' : 'PERLU DITINGKATKAN',
            correctCount,
            incorrectCount: answeredCount - correctCount,
            unansweredCount: activeQuestions.length - answeredCount
        },
        behavioral: {
            avgTimePerQuestion: answeredCount > 0 ? (totalTimeCorrect + totalTimeIncorrect) / answeredCount : 0,
            avgTimeCorrect: correctAnswersCount > 0 ? totalTimeCorrect / correctAnswersCount : 0,
            avgTimeIncorrect: incorrectAnswersCount > 0 ? totalTimeIncorrect / incorrectAnswersCount : 0,
            totalAnswerChanges
        },
        categoryPerformance,
        pace
    };
}

function generateViolationReport() {
    const violationTracker = getViolationTracker();
    const violationSection = document.getElementById('violation-report-section');
    const violationDetails = document.getElementById('violation-details');
    violationDetails.innerHTML = '';
    let hasViolations = false;
    
    if (violationTracker.tabChanges > 0) {
        violationDetails.innerHTML += `<div class="behavior-item">Keluar dari tab/jendela ujian terdeteksi: <strong>${violationTracker.tabChanges} kali</strong></div>`;
        hasViolations = true;
    }
    if (violationTracker.rightClicks > 0) {
        violationDetails.innerHTML += `<div class="behavior-item">Mencoba membuka menu klik-kanan: <strong>${violationTracker.rightClicks} kali</strong></div>`;
        hasViolations = true;
    }
    // We check > 1 to allow for an initial automatic resize by the browser
    if (violationTracker.resizes > 1) { 
        violationDetails.innerHTML += `<div class="behavior-item">Mengubah ukuran jendela ujian terdeteksi: <strong>${violationTracker.resizes - 1} kali</strong></div>`;
        hasViolations = true;
    }
    if (violationTracker.devToolsOpened) {
        violationDetails.innerHTML += `<div class="behavior-item">Developer Tools (Inspect Element) terdeteksi terbuka selama ujian.</div>`;
        hasViolations = true;
    }
    violationSection.style.display = hasViolations ? 'block' : 'none';
}

function generateCategoryAnalysis(categoryStats) {
    const tableBody = document.getElementById('analysis-table-body');
    tableBody.innerHTML = ''; 
    let hasAnalysisData = false;

    for (const categoryName in categoryStats) {
        hasAnalysisData = true;
        const stats = categoryStats[categoryName];
        const score = stats.score;
        const incorrectOrEmpty = stats.total - stats.correct;
        const scoreBarColor = score >= 60 ? '#4CAF50' : (score >= 40 ? '#FFC107' : '#F44336');

        const row = `
            <tr>
                <td><i class="${getCategoryIcon(categoryName)} category-icon"></i> ${categoryName.toUpperCase()}</td>
                <td>${stats.total}</td>
                <td>${stats.correct}</td>
                <td>${incorrectOrEmpty}</td>
                <td class="score-cell">
                    <div class="score-bar-container">
                        <div class="score-bar" style="width: ${score}%; background-color: ${scoreBarColor};"></div>
                    </div>
                    <span>${score}%</span>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }

    const analysisTable = document.getElementById('analysis-table');
    analysisTable.style.display = hasAnalysisData ? 'table' : 'none';
}

function generatePersonalizedRecommendations(categoryStats) {
    const feedbackEl = document.getElementById('recommendation-feedback');
    let recommendationsHTML = '<ul>';
    let weakestCategory = null;
    let lowestScore = 101;
    let allGood = true;

    for (const categoryName in categoryStats) {
        const stats = categoryStats[categoryName];
        if (stats.score < 60) {
            allGood = false;
            if (stats.score < lowestScore) {
                lowestScore = stats.score;
                weakestCategory = categoryName;
            }
        }
    }

    if (allGood) {
        recommendationsHTML += `<li><strong>Kerja bagus!</strong> Performa Anda sangat baik di semua kategori. Pertahankan dan terus berlatih untuk menjaga konsistensi.</li>`;
    } else {
        recommendationsHTML += `<li>Secara umum, terus berlatih untuk meningkatkan kecepatan dan ketepatan Anda.</li>`;
        if (weakestCategory) {
            recommendationsHTML += `<li>Area utama yang perlu ditingkatkan adalah <strong>${weakestCategory.toUpperCase()}</strong>, di mana skor Anda adalah ${lowestScore}%. Fokuskan latihan Anda pada soal-soal di kategori ini.</li>`;
        }
        recommendationsHTML += `<li>Gunakan fitur "Review Ujian" untuk memahami di mana letak kesalahan Anda dan pelajari pembahasannya.</li>`;
    }

    recommendationsHTML += '</ul>';
    feedbackEl.innerHTML = recommendationsHTML;
}

export async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    const originalBackgroundColor = report.style.backgroundColor;
    report.style.backgroundColor = 'white'; // Ensure background is not transparent

    const canvas = await html2canvas(report, { 
        scale: 2, 
        useCORS: true, 
        logging: false, 
        windowWidth: report.scrollWidth,
        windowHeight: report.scrollHeight
    });

    report.style.backgroundColor = originalBackgroundColor;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / pdfWidth;
    const projectedCanvasHeight = canvasHeight / ratio;

    let yPosition = 0;
    let heightLeft = projectedCanvasHeight;

    pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, projectedCanvasHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
        yPosition -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, projectedCanvasHeight);
        heightLeft -= pdfHeight;
    }

    pdf.save(`Laporan-TOPintar-${state.participantName.replace(/\s/g, '_')}.pdf`);
}
