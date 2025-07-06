document.addEventListener("DOMContentLoaded", () => {
  let main_container = document.querySelector(".main-content");
  let section = document.querySelectorAll("section");
  let links = document.querySelectorAll(".navbar a");
  let contactButton = document.querySelectorAll(".contact-button");
  let projectsButton = document.querySelectorAll(".projects-button");

  let currentIndex = 0;
  let isAnimating = false;

  const animationDuration = 500;

  let scrollAccumulator = 0;
  const scrollThreshold = 50;
  let lastScrollTime = 0;
  const scrollCooldown = 100;

  function showPage(index) {
    if (index < 0 || index >= section.length) {
      isAnimating = false;
      return;
    }
    if (isAnimating) {
      return;
    }

    isAnimating = true;

    if (section[currentIndex]) {
      section[currentIndex].classList.remove("active");
    }

    links.forEach((link, idx) => {
      if (idx === currentIndex) {
        link.classList.remove("active");
      }
      if (idx === index) {
        link.classList.add("active");
      }
    });

    currentIndex = index;

    setTimeout(() => {
      section[currentIndex].classList.add("active");

      setTimeout(() => {
        isAnimating = false;
        scrollAccumulator = 0;
      }, animationDuration);
    }, 50);
  }

  const isMobile = window.innerWidth <= 768;

  if (!isMobile) {
    main_container.addEventListener("wheel", (event) => {
      if (isAnimating) {
        event.preventDefault();
        return;
      }

      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollCooldown) {
        return;
      }
      lastScrollTime = currentTime;

      scrollAccumulator += event.deltaY;

      let nextPageIndex = currentIndex;
      let pageChangeTriggered = false;

      if (scrollAccumulator > scrollThreshold) {
        nextPageIndex++;
        scrollAccumulator = 0;
        pageChangeTriggered = true;
      } else if (scrollAccumulator < -scrollThreshold) {
        nextPageIndex--;
        pageChangeTriggered = true;
        scrollAccumulator = 0;
      }

      if (pageChangeTriggered) {
        if (nextPageIndex >= 0 && nextPageIndex < section.length) {
          showPage(nextPageIndex);
        }
      }

      event.preventDefault();
    });
  }

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (isMobile) {
        // Scroll to section by ID on mobile
        const targetId = link.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        showPage(index); // desktop logic
      }
    });
  });
  projectsButton.forEach((button) => {
    button.addEventListener("click", () => {
      if (isMobile) {
        const target = document.getElementById("projects");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        showPage(3);
      }
    });
  });

  contactButton.forEach((button) => {
    button.addEventListener("click", () => {
      if (isMobile) {
        const target = document.getElementById("contact");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        showPage(4);
      }
    });
  });

  showPage(0);
});
