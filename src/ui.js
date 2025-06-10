import { modal, title, content } from "./dom.js";
import {
  generateSkeletonRowHTML,
  generateFetchErrorHTML,
  generateModalCommentsHTML,
} from "./templates.js";

export const tooltip = (() => {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position: "absolute",
    zIndex: "100",
    maxWidth: "300px",
    padding: "8px",
    background: "#fff",
    border: "1px solid #c7d2fe",
    borderRadius: "0.5rem",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    fontSize: "0.875rem",
    color: "#4f46e5",
    pointerEvents: "none",
    display: "none",
  });
  el.id = "custom-tooltip";
  document.body.appendChild(el);
  return el;
})();

export function showSkeletonRow(target, count = 10) {
  target.innerHTML = generateSkeletonRowHTML(count);
  target.style.display = "";
}

export function hideSkeleton(target) {
  target.style.display = "none";
}

export function showFetchError(target) {
  target.innerHTML = generateFetchErrorHTML();
}

export function openModal(post, comments) {
  title.textContent = `💬 Comments for Post ${post.id}`;
  content.innerHTML = generateModalCommentsHTML(comments);
  modal.style.display = "flex";
}

export function closeModal() {
  modal.style.display = "none";
}
