import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js";

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

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

    // Add content to PDF
    pdf.text(content, 10, 20);

    // Download the PDF
    pdf.save("generated.pdf");
}
