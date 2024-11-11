function generatePDF() {
  const { jsPDF } = window.jspdf;  // Access jsPDF from window

  const pdf = new jsPDF();
  const content = document.getElementById("content").value;
  const color = document.getElementById("color").value;

  // Debugging: Log the content and color to ensure they’re being picked up
  console.log("Content:", content);
  console.log("Color:", color);

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

  // Add content to PDF
  pdf.text(content, 10, 20);

  // Debugging: Indicate PDF generation
  console.log("Generating PDF...");

  // Download the PDF
  pdf.save("generated.pdf");
}
