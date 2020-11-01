document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const nose = document.querySelector(".nose");

  nose.addEventListener("click", () => {
    const currentHeight = window
      .getComputedStyle(root)
      .getPropertyValue("--hair-height")
      .trim();

    document.documentElement.style.setProperty(
      "--hair-height",
      `${parseInt(currentHeight) + 5}vh`
    );
  });
});
