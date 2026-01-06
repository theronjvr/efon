// header.js
(async function () {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  try {
    const res = await fetch("/header.html", { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to load /header.html");
    mount.innerHTML = await res.text();

    // Venmo on mobile (keeps PayPal fallback desktop)
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const donate = mount.querySelector("#donateSmart");
    if (donate && isMobile) donate.href = "https://venmo.com/theronjvr";

    // Hamburger toggle
    const toggle = mount.querySelector(".nav-toggle");
    const nav = mount.querySelector("#site-nav");

    if (toggle && nav) {
      const closeMenu = () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      };

     toggle.addEventListener("click", (e) => {
  e.preventDefault();
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});
      
      // Close menu when tapping outside nav (mobile UX polish)
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

      // Close menu when clicking a link
      nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

      // Close on Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });

      // If resized to desktop, reset state
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) closeMenu();
      });
    }
  } catch (err) {
    console.error(err);
    mount.innerHTML = "<!-- Header failed to load -->";
  }
})();