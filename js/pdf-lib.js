const url = "https://testmastersolutions.com/pdfs/TestMaster-Brosura-srp.pdf"; // Replace with your PDF URL
const canvas = document.getElementById("pdf-canvas");
const context = canvas.getContext("2d");
const pageInfo = document.getElementById("page-info");
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let pageRendering = false;

// Render the current page
const renderPage = (pageNum) => {
  pageRendering = true;
  // Fetch the page
  pdfDoc.getPage(pageNum).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render the page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    const renderTask = page.render(renderContext);

    // When the page rendering is finished
    renderTask.promise.then(() => {
      pageRendering = false;
      pageInfo.textContent = `Страница ${pageNum} од ${totalPages}`;
    });
  });
};

// Load the PDF
const loadPDF = async (url) => {
  const loadingTask = pdfjsLib.getDocument(url);
  pdfDoc = await loadingTask.promise;
  totalPages = pdfDoc.numPages;
  renderPage(currentPage);
};

// Show Previous Page
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage <= 1 || pageRendering) return;
  currentPage--;
  renderPage(currentPage);
});

// Show Next Page
document.getElementById("next-page").addEventListener("click", () => {
  if (currentPage >= totalPages || pageRendering) return;
  currentPage++;
  renderPage(currentPage);
});

// Load the PDF file
loadPDF(url);
