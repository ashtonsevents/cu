// Function to load the background image as a Promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
  });
}

// Generate PDF with custom fonts and background image
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdfWidth = 1000;
  const pdfHeight = 1000;
  const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight]
  });

  const content = document.getElementById("content").value;

  try {
      // Load the background image for the first page
      const img = await loadImage('assets/lightblue-page1.png'); // Ensure the path is correct

      for (let i = 0; i < totalSlides; i++) {
          if (i > 0) pdf.addPage([pdfWidth, pdfHeight]);

          if (i === 0) {
              pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);

              pdf.setFont("ProximaSoftMedium", "bold");
              pdf.setTextColor(0, 0, 0); // Black color for title
              pdf.setFontSize(24);
              pdf.text("Clinical Update", pdfWidth / 2, 100, { align: "center" });

              pdf.setFont("ProximaSoftLight", "normal");
              pdf.setFontSize(18);
              pdf.setTextColor(0, 153, 153); // Teal color for subtitle
              pdf.text("Article Overview", pdfWidth / 2, 130, { align: "center" });

              pdf.setFont("ProximaSoftMedium", "bold");
              pdf.setTextColor(255, 255, 255);
              pdf.setFontSize(18);
              pdf.text(content, pdfWidth / 2, 500, { align: "center" }); // Center text in the pill shape
          } else {
              pdf.setFont("ProximaSoftLight", "normal");
              pdf.setTextColor(0, 0, 0);
              pdf.setFontSize(16);
              pdf.text(`Page ${i + 1}\n\n${content}`, 50, 50);
          }
      }

      // Save the PDF after all pages are processed
      pdf.save("multi-page-1000px.pdf");

  } catch (error) {
      console.error("Error generating PDF:", error);
  }
}

// Generate the carousel preview
function generatePreview() {
  const content = document.getElementById("content").value;
  const previewContainer = document.getElementById("previewSlides");
  previewContainer.innerHTML = ""; // Clear existing previews in the carousel

  for (let i = 0; i < totalSlides; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 500;
      canvas.height = 500;
      canvas.classList.add("previewPage");
      if (i === 0) canvas.classList.add("active");

      const ctx = canvas.getContext("2d");

      if (i === 0) {
          // Load the background image for the first page only
          const img = new Image();
          img.src = 'assets/lightblue-page1.png';

          img.onload = function () {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Overlay text in the pill shape
              ctx.fillStyle = "#ffffff";
              ctx.font = "18px Arial"; // Canvas doesn't support custom fonts, using Arial for preview
              ctx.textAlign = "center";
              ctx.fillText(content, canvas.width / 2, 250);

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

document.getElementById("content").addEventListener("input", generatePreview);
window.onload = generatePreview;
