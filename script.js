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

          // Add the text overlay for each slide
          ctx.fillStyle = "#ffffff";
          ctx.font = "18px Arial";
          ctx.textAlign = "left";
          ctx.fillText(content, 50, 250, 400); // Left-aligned text with max width for wrapping

          previewContainer.appendChild(canvas);
      }

      // Slide 7: Image-only preview
      const slide7Canvas = document.createElement("canvas");
      slide7Canvas.width = 500;
      slide7Canvas.height = 500;
      slide7Canvas.classList.add("previewPage");

      const slide7Img = await loadImage('assets/lightblue-page7.png');
      slide7Canvas.getContext("2d").drawImage(slide7Img, 0, 0, slide7Canvas.width, slide7Canvas.height);

      previewContainer.appendChild(slide7Canvas);

  } catch (error) {
      console.error("Error generating preview:", error);
  }
}

// Generate PDF function (unchanged)
async function generatePDF() {
  // Existing PDF generation code
}

// Initialize preview generation on input
document.getElementById("titleContent").addEventListener("input", generatePreview);
document.getElementById("introContent").addEventListener("input", generatePreview);
document.getElementById("slide3Content").addEventListener("input", generatePreview);
document.getElementById("slide4Content").addEventListener("input", generatePreview);
document.getElementById("slide5Content").addEventListener("input", generatePreview);
document.getElementById("slide6Content").addEventListener("input", generatePreview);
window.onload = generatePreview;
