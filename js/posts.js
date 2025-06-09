import { fetchPosts, fetchComments } from "./api.js";
import {
  getPaginationData,
  paginate,
  showSkeletonRow,
  hideSkeleton,
} from "./helpers.js";

const searchInput = document.getElementById("search");
const tableBody = document.getElementById("posts-table");
const pageSizeSelect = document.getElementById("page-size");
const paginationList = document.getElementById("pagination-list");

let allPosts = [];
let filteredPosts = [];
let currentPage = Number(new URLSearchParams(location.search).get("page")) || 1;
let pageSize = parseInt(pageSizeSelect?.value || 10);

function renderPosts() {
  const pagedData = paginate(filteredPosts, currentPage, pageSize);
  tableBody.innerHTML = "";

  if (pagedData.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="3" class="text-center p-4 text-indigo-400 italic">No posts found</td>`;
    tableBody.appendChild(tr);
    return;
  }

  pagedData.forEach((post) => {
    const tr = document.createElement("tr");
    tr.classList.add("hover:bg-indigo-50", "cursor-pointer", "transition");
    if (post.body.includes("rerum")) {
      tr.classList.add("bg-indigo-100", "font-medium", "text-indigo-700");
    }
    tr.innerHTML = `
      <td class="p-3 border-b border-indigo-100">${post.id}</td>
      <td class="p-3 border-b border-indigo-100">${post.title}</td>
      <td class="p-3 border-b border-indigo-100">${post.body}</td>
    `;
    tr.addEventListener("click", async () => {
      const comments = await fetchComments(post.id);
      alert(
        `Comments for Post ${post.id}:\n` +
          comments.map((c) => `- ${c.body}`).join("\n")
      );
    });
    tableBody.appendChild(tr);
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  renderPaginationControls(totalPages, currentPage);
}

function renderPaginationControls(totalPages, currentPage) {
  paginationList.innerHTML = "";
  const paginationItems = getPaginationData({
    active: currentPage,
    total: totalPages,
  });

  const addPageButton = (label, page, isDisabled = false, isActive = false) => {
    const li = document.createElement("li");
    li.textContent = label;
    li.className = `flex h-10 w-10 items-center justify-center rounded-md text-sm border transition ${
      isDisabled
        ? "pointer-events-none text-gray-400"
        : "cursor-pointer hover:bg-indigo-100"
    } ${
      isActive ? "bg-indigo-600 text-white font-semibold" : "text-indigo-700"
    }`;
    if (!isDisabled) {
      li.addEventListener("click", () => updatePage(page));
    }
    paginationList.appendChild(li);
  };

  addPageButton("‹", currentPage - 1, currentPage === 1);

  paginationItems.forEach((item) => {
    if (item === "dots") {
      const li = document.createElement("li");
      li.textContent = "…";
      li.className =
        "pointer-events-none text-lg text-indigo-500 font-bold px-2";
      paginationList.appendChild(li);
    } else {
      addPageButton(item, item, false, item === currentPage);
    }
  });

  addPageButton("›", currentPage + 1, currentPage === totalPages);
}

function updatePage(newPage) {
  const params = new URLSearchParams(location.search);
  params.set("page", newPage);
  history.replaceState(null, "", `?${params.toString()}`);
  currentPage = newPage;
  renderPosts();
}

function applySearchFilter() {
  const query = searchInput.value.toLowerCase();
  filteredPosts = allPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.body.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderPosts();
}
let searchTimeout = null;

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);

  showSkeletonRow();

  searchTimeout = setTimeout(() => {
    applySearchFilter();
    hideSkeleton();
  }, 400);
});

pageSizeSelect.addEventListener("change", () => {
  pageSize = parseInt(pageSizeSelect.value);
  currentPage = 1;
  renderPosts();
});

fetchPosts().then((posts) => {
  allPosts = posts;
  filteredPosts = posts;
  renderPosts();
});
