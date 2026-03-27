const root = document.body;
const toggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

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
