export function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export function getPaginationData({ active, total, sibling = 1 }) {
  const totalPageNumbers = sibling + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const leftSiblingIndex = Math.max(active - sibling, 1);
  const rightSiblingIndex = Math.min(active + sibling, total);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 2;

  const firstPageIndex = 1;
  const lastPageIndex = total;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(1, 3 + 2 * sibling);
    return [...leftRange, "dots", total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(total - (3 + 2 * sibling) + 1, total);
    return [firstPageIndex, "dots", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
  }
}

export function paginate(array, page, size) {
  const start = (page - 1) * size;
  return array.slice(start, start + size);
}

export function showSkeletonRow(count = 10) {
  const loader = document.getElementById("loader-skeleton");
  const table = document.getElementById("posts-table");
  table.innerHTML = "";
  loader.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="p-4 border-b">
        <div class="h-4 w-10 bg-indigo-100 rounded animate-pulse"></div>
      </td>
      <td class="p-4 border-b">
        <div class="h-4 w-32 bg-indigo-100 rounded animate-pulse"></div>
      </td>
      <td class="p-4 border-b">
        <div class="h-4 w-64 bg-indigo-100 rounded animate-pulse"></div>
      </td>
    `;
    loader.appendChild(row);
  }
  loader.style.display = "";
}

export function hideSkeleton() {
  document.getElementById("loader-skeleton").style.display = "none";
}


