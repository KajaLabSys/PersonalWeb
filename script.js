const root = document.body;
const toggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = document.querySelector(".site-header");
const siteNav = document.querySelector(".site-nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const savedTheme = localStorage.getItem("theme");
let lastLightboxTrigger = null;

if (savedTheme) {
    root.dataset.theme = savedTheme;
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.dataset.theme = "dark";
}

root.dataset.scheme = "s1";

const syncThemeButton = () => {
    const dark = root.dataset.theme === "dark";
    toggle?.setAttribute("aria-pressed", String(dark));
};

syncThemeButton();

toggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    syncThemeButton();
});

const syncMenuButton = (open) => {
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "Zavřít navigaci" : "Otevřít navigaci");
    siteHeader?.classList.toggle("is-menu-open", open);
};

const closeMenu = () => {
    syncMenuButton(false);
};

menuToggle?.addEventListener("click", () => {
    const nextOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    syncMenuButton(nextOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
    if (!siteHeader?.classList.contains("is-menu-open")) {
        return;
    }

    if (siteHeader.contains(event.target)) {
        return;
    }

    closeMenu();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
        closeMenu();
    }
});

syncMenuButton(false);

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    }
}, {
    threshold: 0.15,
});

document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
});

const openLightbox = (trigger) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    const src = trigger.dataset.lightboxSrc;

    if (!src) {
        return;
    }

    lastLightboxTrigger = trigger;
    lightboxImage.src = src;
    lightboxImage.alt = trigger.querySelector("img")?.alt || "";
    lightboxCaption.textContent = trigger.dataset.lightboxCaption || "";
    lightbox.hidden = false;
    root.classList.add("is-lightbox-open");
    lightboxClose?.focus();
};

function closeLightbox() {
    if (!lightbox || lightbox.hidden) {
        return;
    }

    lightbox.hidden = true;
    root.classList.remove("is-lightbox-open");

    if (lightboxImage) {
        lightboxImage.src = "";
        lightboxImage.alt = "";
    }

    lastLightboxTrigger?.focus();
    lastLightboxTrigger = null;
}

document.querySelectorAll(".case-photo-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openLightbox(trigger);
    });
});

lightbox?.querySelectorAll(".lightbox-backdrop, .lightbox-close").forEach((control) => {
    control.addEventListener("click", closeLightbox);
});
