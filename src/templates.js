import { truncateText } from "./helpers.js";
import { escapeHTML } from "./utils/sanitize.js";

export function createNoPostsRow() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td colspan="3" class="p-4 text-center">
      <img src="/assets/not-found.avif" alt="No posts found" class="mx-auto" width="198px" />
      <p class="mt-2 text-indigo-400 font-semibold">No posts found</p>
    </td>
  `;
  return tr;
}

export function createPostRow(post, onClick, tooltipHandlers) {
  const tr = document.createElement("tr");
  tr.classList.add("hover:bg-indigo-50", "cursor-pointer", "transition");

  const highlight = post.body.includes("rerum")
    ? "bg-indigo-100 text-indigo-700 font-medium"
    : "";

  tr.innerHTML = `
    <td class="p-3 border-b border-indigo-100">${post.id}</td>
    <td class="p-3 border-b border-indigo-100 tooltip-cell" data-full="${
      post.title
    }">
      ${truncateText(post.title, 40)}
    </td>
    <td class="p-3 border-b border-indigo-100 tooltip-cell ${highlight}" data-full="${
    post.body
  }">
      ${truncateText(post.body, 60)}
    </td>
  `;

  tr.addEventListener("click", onClick);

  tr.querySelectorAll(".tooltip-cell").forEach((cell) => {
    cell.addEventListener("mouseenter", tooltipHandlers.show);
    cell.addEventListener("mousemove", tooltipHandlers.move);
    cell.addEventListener("mouseleave", tooltipHandlers.hide);
  });

  return tr;
};

export function createUserReportRow(userId, count) {
  const tr = document.createElement("tr");
  tr.classList.add("hover:bg-gray-50", "transition", "text-gray-700");

  tr.innerHTML = `
    <td class="p-3 border-b border-indigo-100">${userId}</td>
    <td class="p-3 border-b border-indigo-100">${count}</td>
  `;
  return tr;
}

export function generateSkeletonRowHTML(count = 10) {
  return Array.from({ length: count })
    .map(() => `
      <tr>
        <td class="p-4 border-b"><div class="h-4 w-10 bg-indigo-100 rounded animate-pulse"></div></td>
        <td class="p-4 border-b"><div class="h-4 w-32 bg-indigo-100 rounded animate-pulse"></div></td>
        <td class="p-4 border-b"><div class="h-4 w-64 bg-indigo-100 rounded animate-pulse"></div></td>
      </tr>
    `)
    .join("");
}

export function generateFetchErrorHTML() {
  return `
    <tr>
      <td colspan="3" class="p-4 text-center">
        <img src="/assets/not-found.avif" alt="Fetch Error" class="mx-auto" width="198px" />
        <p class="mt-2 text-red-500 italic">Unable to load posts. Please try again later.</p>
      </td>
    </tr>
  `;
}

export function generateModalCommentsHTML(comments) {
  if (!comments.length) {
    return `<p class="text-center text-gray-400 italic">No comments found.</p>`;
  }

  return comments
    .map(
      (c) => `
      <div class="border rounded-xl p-3 bg-indigo-50 border-indigo-500">
        <p class="font-semibold text-indigo-700">👤 ${escapeHTML(c.name)}</p>
        <p class="text-sm text-gray-500">@${escapeHTML(c.email)}</p>
        <p class="mt-2 text-indigo-800 leading-relaxed">💬 ${escapeHTML(
          c.body
        )}</p>
      </div>`
    )
    .join("");
}