function generatePDF() {
  const { jsPDF } = window.jspdf;
  
  // Define custom PDF dimensions
  const pdfWidth = 2000;
  const pdfHeight = 2000;

  // Create PDF with custom dimensions in points (px / 0.75 to convert to points)
  const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [pdfWidth, pdfHeight]
  });

  const content = document.getElementById("content").value;
  const color = document.getElementById("color").value;

  // Set text color based on selection
  switch (color) {
      case "blue":
          pdf.setTextColor(0, 0, 255);
          break;
      case "green":
          pdf.setTextColor(0, 128, 0);
          break;
      case "teal":
          pdf.setTextColor(0, 128, 128);
          break;
      default:
          pdf.setTextColor(0, 0, 0);
  }

  // Loop to create 7 pages
  for (let i = 0; i < 7; i++) {
      if (i > 0) pdf.addPage([pdfWidth, pdfHeight]);  // Add new page from 2nd page onward
      pdf.text(`Page ${i + 1}\n\n${content}`, 20, 50);  // Example content on each page
  }

  // Save the PDF
  pdf.save("multi-page-2000px.pdf");
}
