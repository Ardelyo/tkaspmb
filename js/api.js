
// js/api.js

export async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Failed to load configuration:", error);
        document.body.innerHTML = "<h1>Error: Gagal memuat konfigurasi aplikasi. Pastikan file `config.json` ada dan valid.</h1>";
        return null;
    }
}

export async function loadBatch(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`File not found: ${filePath}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to load batch file:`, error);
        alert('Gagal memuat data soal. Silakan periksa path file di config.json.');
        return null;
    }
}
