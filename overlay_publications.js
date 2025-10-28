(() => {
  const publicationLogos = [
    {
      name: "ArchDaily",
      file: "archdaily_logo.svg",
      path: "multimedia/publications/archdaily_logo.svg",
      side: "right"
    },
    {
      name: "Compasses Magazine",
      file: "compasses_logo.svg",
      path: "multimedia/publications/compasses_logo.svg",
      side: "left"
    },
    {
      name: "Archetype",
      file: "archetype_logo.svg",
      path: "multimedia/publications/archetype_logo.svg",
      side: "right"
    },
    {
      name: "Hotels Magazine",
      file: "hotels_logo.svg",
      path: "multimedia/publications/hotels_logo.svg",
      side: "left"
    }
  ];

  const pageConfigurations = {
    "index.html": {
      mountSelector: "body",
      defaultSide: "right",
      dynamicSide: false,
      rotationInterval: 6000
    },
    "home.html": {
      mountSelector: "body",
      defaultSide: "right",
      dynamicSide: false,
      rotationInterval: 6000
    },
    "portfolio.html": {
      mountSelector: "body",
      defaultSide: "right",
      dynamicSide: true,
      rotationInterval: 2800
    },
    "development.html": {
      mountSelector: "body",
      defaultSide: "right",
      dynamicSide: false,
      rotationInterval: 6000
    }
  };
  const FEATURED_LABEL = "Featured In";

  function detectPageKey() {
    const path = window.location.pathname || "";
    const segment = path.split("/").pop();
    if (!segment || segment === "") {
      return "index.html";
    }
    if (!segment.includes(".html")) {
      return segment.toLowerCase() + ".html";
    }
    return segment.toLowerCase();
  }
  function createOverlayContainer(defaultSide) {
    const overlay = document.createElement("aside");
    overlay.className = "publication-overlay";
    overlay.classList.add(defaultSide === "left" ? "overlay-left" : "overlay-right");
    overlay.setAttribute("role", "complementary");
    overlay.setAttribute("aria-label", "Publications featuring MI Architects");
    return overlay;
  }

  function createTitleElement() {
    const title = document.createElement("div");
    title.className = "publication-overlay__title";
    title.textContent = FEATURED_LABEL;
    return title;
  }

  function createLogosWrapper() {
    const wrapper = document.createElement("div");
    wrapper.className = "publication-overlay__logos";
    return wrapper;
  }

  function createLogoElement(logo) {
    const logoContainer = document.createElement("div");
    logoContainer.className = "publication-overlay__logo";
    logoContainer.setAttribute("data-logo-name", logo.name);

    const img = document.createElement("img");
    img.src = logo.path;
    img.alt = `${logo.name} logo`;
    img.loading = "lazy";

    logoContainer.appendChild(img);
    return logoContainer;
  }

  function updateLogoElement(element, logo) {
    if (!element) return;
    element.setAttribute("data-logo-name", logo.name);
    const img = element.querySelector("img");
    if (img) {
      img.src = logo.path;
      img.alt = `${logo.name} logo`;
    }
  }


  function setOverlaySide(overlay, side, fallback) {
    const targetSide = side === "left" || side === "right" ? side : fallback;
    overlay.classList.remove("overlay-left", "overlay-right");
    overlay.classList.add(targetSide === "left" ? "overlay-left" : "overlay-right");
  }

  function startDynamicRotation(wrapper, overlay, logos, config) {
    if (!logos.length) return;

    let currentIndex = 0;
    let rotationId = null;

    const singleLogo = createLogoElement(logos[currentIndex]);
    wrapper.appendChild(singleLogo);
    setOverlaySide(overlay, logos[currentIndex].side, config.defaultSide);
const rotate = () => {
  currentIndex = (currentIndex + 1) % logos.length;
// ✨ Smooth fade transition for portfolio dynamic rotation
if (window.location.pathname.includes("portfolio")) {
  singleLogo.classList.add("fade-out");

  setTimeout(() => {
    updateLogoElement(singleLogo, logos[currentIndex]);
    singleLogo.classList.remove("fade-out");
    singleLogo.classList.add("fade-in");

    // remove fade-in after animation completes
    setTimeout(() => {
      singleLogo.classList.remove("fade-in");
    }, 1700); // match CSS fade duration
  }, 600); // wait for fade-out to nearly finish before swap
} else {
  updateLogoElement(singleLogo, logos[currentIndex]);
}
  setOverlaySide(overlay, logos[currentIndex].side, config.defaultSide);
  rotationId = window.setTimeout(rotate, config.rotationInterval);
};
    const pauseRotation = () => {
      if (rotationId) {
        window.clearTimeout(rotationId);
        rotationId = null;
      }
    };

    const resumeRotation = () => {
      if (!rotationId && logos.length > 1) {
        rotationId = window.setTimeout(rotate, config.rotationInterval);
      }
    };

    overlay.addEventListener("mouseenter", pauseRotation);
    overlay.addEventListener("mouseleave", resumeRotation);

    if (logos.length > 1) {
      rotationId = window.setTimeout(rotate, config.rotationInterval);
    }
  }

  function hydrateStaticOverlay(wrapper, overlay, logos, config) {
    logos.forEach((logo) => {
      wrapper.appendChild(createLogoElement(logo));
    });
    setOverlaySide(overlay, config.defaultSide, config.defaultSide);
  }

  function mountOverlay(config) {
    const mountNode = document.querySelector(config.mountSelector) || document.body;
    if (!mountNode) return;

    const overlay = createOverlayContainer(config.defaultSide);
    const title = createTitleElement();
    const logosWrapper = createLogosWrapper();

    overlay.appendChild(title);
    overlay.appendChild(logosWrapper);

    mountNode.appendChild(overlay);

    if (config.dynamicSide) {
      startDynamicRotation(logosWrapper, overlay, publicationLogos, config);
    } else {
      hydrateStaticOverlay(logosWrapper, overlay, publicationLogos, config);
    }

    window.requestAnimationFrame(() => {
      overlay.classList.add("fade-in-overlay");
    });
  }

  function initPublicationOverlays() {
    const pageKey = detectPageKey();
    const config = pageConfigurations[pageKey];
    if (!config || !publicationLogos.length) {
      return;
    }

    document.addEventListener("visibilitychange", () => {
      // Ensures overlay remains visible after tab switches
      const overlay = document.querySelector(".publication-overlay");
      if (overlay && document.visibilityState === "visible") {
        overlay.classList.add("fade-in-overlay");
      }
    });
/*
  // 🧭 Enable dynamic rotation on mobile for smoother overlay behavior
  if (window.innerWidth < 768 && !config.dynamicSide) {
    config.dynamicSide = true;
    config.rotationInterval = 5000; // or 4000 for gentle timing
  }
*/

mountOverlay(config);
    mountOverlay(config);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPublicationOverlays);
  } else {
    initPublicationOverlays();
  }
})();

// 🧭 Smooth fade-out of publication overlay when near Contact section
window.addEventListener('scroll', () => {
  const overlay = document.querySelector('.publication-overlay');
  const contact = document.getElementById('contact');
  if (!overlay || !contact) return;

  const contactTop = contact.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (contactTop < windowHeight * 0.8) {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  } else {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
  }
});
