
// js/utils.js

export function parseMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export function getCategoryIcon(cat) {
    const map = { literasi: 'fas fa-book-open', numerasi: 'fas fa-calculator', sains: 'fas fa-flask' };
    return map[cat.toLowerCase()] || 'fas fa-question-circle';
}
