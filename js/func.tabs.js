document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".functionality_link");
  const sections = document.querySelectorAll(".funct_wrapper > div");

  // Initially hide all sections and remove active class from links
  sections.forEach((section) => section.classList.remove("show"));
  links.forEach((link) => link.classList.remove("active"));

  // Show the first section and mark the first link as active
  if (sections.length > 0) {
    sections[0].style.display = "block";
    sections[0].classList.add("show");
    links[0].classList.add("active");
  }

  // Add click event to each link
  links.forEach((link, index) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Remove 'active' class from all links
      links.forEach((l) => l.classList.remove("active"));

      // Add 'active' class to the clicked link
      link.classList.add("active");

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("show");
        section.style.display = "none";
      });

      // Show the selected section with fade-in effect
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
        setTimeout(() => targetSection.classList.add("show"), 10);
      }
    });
  });
});
