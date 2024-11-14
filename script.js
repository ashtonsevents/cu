// Function to load the background image as a Promise
function loadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => {
          console.error("Error loading image:", src);
          reject(new Error("Image failed to load"));
      };
  });
}

// Generate previews for all slides in a row
async function generatePreview() {
  const previewContainer = document.getElementById("previewSlides");
  previewContainer.innerHTML = ""; // Clear existing previews

  const slidesContent = [
      document.getElementById("titleContent").value,
      document.getElementById("introContent").value,
      document.getElementById("slide3Content").value,
      document.getElementById("slide4Content").value,
      document.getElementById("slide5Content").value,
      document.getElementById("slide6Content").value
  ];

  const imagePaths = [
      'assets/lightblue-page1.png',
      'assets/lightblue-page2.png',
      'assets/lightblue-page3.png',
      'assets/lightblue-page4.png',
      'assets/lightblue-page5.png',
      'assets/lightblue-page6.png'
  ];

  try {
      // Create each slide preview with its unique background image and text content
      for (let i = 0; i < slidesContent.length; i++) {
          const img = await loadImage(imagePaths[i]);
          const content = slidesContent[i];

          const canvas = document.createElement("canvas");
          canvas.width = 500;
          canvas.height = 500;
          canvas.classList.add("previewPage");

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Handle Slide 1 (use Proxima Light font and left-align, with multiline support)
          if (i === 0) {
              ctx.fillStyle = "#ffffff";  // White text for slide 1
              ctx.font = "100 28px 'Proxima Soft', sans-serif"; // Font for slide 1
              ctx.textAlign = "left";

              // Split the content by new lines and render each line
              const lines = breakTextToFit(content, ctx, 370); // Wrap text to fit in the box
              let lineHeight = 30; // Space between lines
              let yPosition = 230; // Start position for text

              // Render each line of text
              lines.forEach((line, index) => {
                  ctx.fillText(line, 50, yPosition + (lineHeight * index));  // Left-align with line spacing
              });
          } else {
              // Handle slides 2-6 with text color #07485B and left-align the text
              ctx.fillStyle = "#07485B";  // Text color for slides 2–6
              ctx.font = "300 18px 'Proxima Soft', sans-serif"; // Font for slides 2-6
              ctx.textAlign = "left";

              // Split the content by new lines for multiple lines of text
              const lines = breakTextToFit(content, ctx, 410); // Wrap text to fit in the box
              let lineHeight = 20; // Space between lines
              let yPosition = 160; // Starting position for text

              // Render each line of text for slides 2-6
              lines.forEach((line, index) => {
                  ctx.fillText(line, 50, yPosition + (lineHeight * index)); // Left-align with line spacing
              });
          }

          previewContainer.appendChild(canvas);
      }

      // Slide 7: Image-only preview (no text)
      const slide7Canvas = document.createElement("canvas");
      slide7Canvas.width = 500;
      slide7Canvas.height = 500;
      slide7Canvas.classList.add("previewPage");

      const slide7Img = await loadImage('assets/lightblue-page7.png');  // Update path for Slide 7
      slide7Canvas.getContext("2d").drawImage(slide7Img, 0, 0, slide7Canvas.width, slide7Canvas.height);

      previewContainer.appendChild(slide7Canvas);

  } catch (error) {
      console.error("Error generating preview:", error);
  }
}

// Function to break text into multiple lines based on max width
function breakTextToFit(text, ctx, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const width = ctx.measureText(testLine).width;

        if (width > maxWidth) {
            lines.push(currentLine.trim()); // Push the line to the lines array
            currentLine = word + ' '; // Start a new line with the current word
        } else {
            currentLine = testLine; // Add the word to the current line
        }
    });

    if (currentLine) {
        lines.push(currentLine.trim()); // Add the last line
    }

    return lines;
}

// Initialize preview generation on input
document.getElementById("titleContent").addEventListener("input", generatePreview);
document.getElementById("introContent").addEventListener("input", generatePreview);
document.getElementById("slide3Content").addEventListener("input", generatePreview);
document.getElementById("slide4Content").addEventListener("input", generatePreview);
document.getElementById("slide5Content").addEventListener("input", generatePreview);
document.getElementById("slide6Content").addEventListener("input", generatePreview);
window.onload = generatePreview;
