export let allPosts = [];
export let filteredPosts = [];
export let currentPage = 1;
export let pageSize = 10;

export function initializePosts(data) {
  allPosts = data;
  filteredPosts = data;
}

export function setFilteredPosts(data) {
  filteredPosts = data;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function setPageSize(size) {
  pageSize = size;
}
