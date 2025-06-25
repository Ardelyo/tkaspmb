
// js/report.js

import { state } from './state.js';
import { getViolationTracker } from './antiCheat.js';
import { getCategoryIcon } from './utils.js';

export function generateReport() {
    // Basic Info
    document.getElementById('report-name').textContent = state.participantName.toUpperCase();
    document.getElementById('report-session-id').textContent = 'TKA-' + Date.now();
    document.getElementById('report-date').textContent = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

    // Duration
    const durationMs = new Date() - state.testStartTime;
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    document.getElementById('report-duration').textContent = `${minutes} menit ${seconds} detik`;
    
    // Overall Scoring
    let correctAnswers = 0;
    state.activeQuestions.forEach(q => {
        if (state.userAnswers[q.id] === q.correctAnswer) correctAnswers++;
    });
    const score = state.activeQuestions.length > 0 ? Math.round((correctAnswers / state.activeQuestions.length) * 100) : 0;
    const answeredCount = Object.keys(state.userAnswers).length;

    document.getElementById('final-score').textContent = score;
    document.getElementById('score-predicate').textContent = score >= 80 ? 'SANGAT BAIK' : score >= 60 ? 'BAIK' : 'PERLU DITINGKATKAN';
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = answeredCount - correctAnswers;
    document.getElementById('unanswered-count').textContent = state.activeQuestions.length - answeredCount;

    // Generate Violation Report
    generateViolationReport();

    // Generate Category Analysis and get the stats for recommendations
    const categoryStats = generateCategoryAnalysis();

    // Generate Personalized Recommendations based on the analysis
    generatePersonalizedRecommendations(categoryStats);
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

function generateCategoryAnalysis() {
    const categoryStats = {};

    state.activeQuestions.forEach(q => {
        const category = q.main_category;
        if (!categoryStats[category]) {
            categoryStats[category] = { total: 0, correct: 0, icon: getCategoryIcon(category) };
        }
        categoryStats[category].total++;
        if (state.userAnswers[q.id] === q.correctAnswer) {
            categoryStats[category].correct++;
        }
    });

    const tableBody = document.getElementById('analysis-table-body');
    tableBody.innerHTML = ''; 
    let hasAnalysisData = false;

    for (const categoryName in categoryStats) {
        hasAnalysisData = true;
        const stats = categoryStats[categoryName];
        const score = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
        stats.score = score; // Add score to the stats object for later use

        const incorrectOrEmpty = stats.total - stats.correct;
        const scoreBarColor = score >= 60 ? '#4CAF50' : (score >= 40 ? '#FFC107' : '#F44336');

        const row = `
            <tr>
                <td><i class="${stats.icon} category-icon"></i> ${categoryName.toUpperCase()}</td>
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
    
    return categoryStats; // Return data for use in recommendations
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

export function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const report = document.getElementById('report-container');
    html2canvas(report, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); 
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
        pdf.save(`Laporan-TOPintar-${state.participantName.replace(/\s/g, '_')}.pdf`);
    });
}
