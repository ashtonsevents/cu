let currentSlide = 0; // Track the current slide index
const totalSlides = 7; // Number of pages to preview

function generatePreview() {
    const content = document.getElementById("content").value;
    const previewContainer = document.getElementById("previewSlides");
    previewContainer.innerHTML = ""; // Clear existing previews in the carousel

    for (let i = 0; i < totalSlides; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        canvas.classList.add("previewPage");
        if (i === 0) canvas.classList.add("active"); // Show the first page by default

        const ctx = canvas.getContext("2d");

        if (i === 0) {
            // Load background image for the first page only
            const img = new Image();
            img.src = 'assets/lightblue-page1.png'; // Replace with the correct path to the background image

            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Overlay text within the pill shape
                ctx.fillStyle = "#ffffff";
                ctx.font = "18px Arial";
                ctx.textAlign = "center";
                ctx.fillText(content, canvas.width / 2, 250); // Position text within the pill shape

                // Append the canvas to the carousel preview container
                previewContainer.appendChild(canvas);
            };
        } else {
            // Simple layout for other pages
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#333";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`Page ${i + 1}`, canvas.width / 2, 250);
            previewContainer.appendChild(canvas);
        }
    }
}

function updateSlides() {
    const slides = document.querySelectorAll(".previewPage");
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
}

function generatePDF() {
    const { jsPDF } = window.jspdf;

    const pdfWidth = 1000;
    const pdfHeight = 1000;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
    });

    const content = document.getElementById("content").value;

    for (let i = 0; i < totalSlides; i++) {
        if (i > 0) pdf.addPage([pdfWidth, pdfHeight]);

        if (i === 0) {
            const img = new Image();
            img.src = 'assets/lightblue-page1.png';

            img.onload = function() {
                pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.setTextColor(255, 255, 255);
                pdf.setFontSize(18);
                pdf.text(content, pdfWidth / 2, 500, { align: "center" }); // Center text in the pill shape

                if (i === totalSlides - 1) {
                    pdf.save("multi-page-1000px.pdf");
                }
            };
        } else {
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(16);
            pdf.text(`Page ${i + 1}\n\n${content}`, 50, 50);
        }
    }
}

// Add event listeners to generate previews on changes
document.getElementById("content").addEventListener("input", generatePreview);
document.getElementById("color").addEventListener("change", generatePreview);
window.onload = generatePreview;
