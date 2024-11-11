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

// Generate the preview carousel
async function generatePreview() {
  const previewContainer = document.getElementById("previewSlides");
  previewContainer.innerHTML = ""; // Clear existing previews in the carousel

  const slidesContent = [
      document.getElementById("titleContent").value,
      document.getElementById("introContent").value,
      document.getElementById("slide3Content").value,
      document.getElementById("slide4Content").value,
      document.getElementById("slide5Content").value,
      document.getElementById("slide6Content").value
  ];

  try {
      // Load the background image for each slide that requires it
      const img = await loadImage('assets/lightblue-page1.png'); // Make sure this path is correct

      // Create each slide preview
      slidesContent.forEach((content, index) => {
          const canvas = document.createElement("canvas");
          canvas.width = 500;
          canvas.height = 500;
          canvas.classList.add("previewPage");
          if (index === 0) canvas.classList.add("active");

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Add the text overlay
          ctx.fillStyle = "#ffffff";
          ctx.font = "18px Arial"; // Using Arial for preview
          ctx.textAlign = "left";
          ctx.fillText(content, 50, 250, 400); // Left-aligned text with max width for wrapping

          previewContainer.appendChild(canvas);
      });

      // Slide 7: Image-only preview
      const slide7Canvas = document.createElement("canvas");
      slide7Canvas.width = 500;
      slide7Canvas.height = 500;
      slide7Canvas.classList.add("previewPage");

      const slide7Img = await loadImage('assets/slide7-image.png'); // Make sure this path is correct
      slide7Canvas.getContext("2d").drawImage(slide7Img, 0, 0, slide7Canvas.width, slide7Canvas.height);

      previewContainer.appendChild(slide7Canvas);

  } catch (error) {
      console.error("Error generating preview:", error);
  }
}

// Generate PDF function (keeping it as is for now)
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
