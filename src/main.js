import {
  searchInput,
  tableBody,
  pageSizeSelect,
  paginationList,
  modal,
  closeModal,
  table,
  loader,
} from "./dom.js";

import {
  allPosts,
  filteredPosts,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  initializePosts,
  setFilteredPosts,
} from "./states.js";

import { getPaginationData, paginate } from "./helpers.js";

import {
  hideSkeleton,
  showFetchError,
  showSkeletonRow,
  tooltip,
  openModal,
} from "./ui.js";

import { createNoPostsRow, createPostRow } from "./templates.js";
import { fetchPosts, fetchComments } from "./api.js";

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

function renderPosts() {
  const pagedData = paginate(filteredPosts, currentPage, pageSize);
  tableBody.innerHTML = "";

  if (pagedData.length === 0) {
    tableBody.appendChild(createNoPostsRow());
    return;
  }

  pagedData.forEach((post) => {
    const row = createPostRow(
      post,
      async () => {
        const comments = await fetchComments(post.id);
        openModal(post, comments);
      },
      {
        show: (e) => {
          const cell = e.target;
          tooltip.textContent = cell.dataset.full;
          tooltip.style.display = "block";
        },
        move: (e) => {
          tooltip.style.left = `${e.pageX + 12}px`;
          tooltip.style.top = `${e.pageY + 12}px`;
        },
        hide: () => {
          tooltip.style.display = "none";
        },
      }
    );
    tableBody.appendChild(row);
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  renderPaginationControls(totalPages, currentPage);
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

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
  setCurrentPage(newPage);
  renderPosts();
}

function applySearchFilter() {
  const query = searchInput.value.trim().toLowerCase();

  const params = new URLSearchParams(location.search);
  params.delete("page");
  const newUrl = params.toString()
    ? `?${params.toString()}`
    : location.pathname;
  history.replaceState(null, "", newUrl);

  setCurrentPage(1);

  if (!query) {
    setFilteredPosts(allPosts);
  } else {
    setFilteredPosts(
      allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.body.toLowerCase().includes(query)
      )
    );
  }
  renderPosts();
}

searchInput.addEventListener("input", () => {
  let searchTimeout = null;
  clearTimeout(searchTimeout);
  showSkeletonRow(table);
  searchTimeout = setTimeout(() => {
    applySearchFilter();
    hideSkeleton(loader);
  }, 400);
});

pageSizeSelect.addEventListener("change", () => {
  setPageSize(parseInt(pageSizeSelect.value));
  setCurrentPage(1);
  renderPosts();
});

setCurrentPage(Number(new URLSearchParams(location.search).get("page")) || 1);
setPageSize(parseInt(pageSizeSelect?.value || 10));

fetchPosts().then((posts) => {
  if (posts.error) {
    showFetchError(tableBody);
    return;
  }
  initializePosts(posts);
  renderPosts();
});
