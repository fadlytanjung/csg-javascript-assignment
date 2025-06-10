export function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export function getPaginationData({ active, total, sibling = 1 }) {
  const totalPageNumbers = sibling + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const left = Math.max(active - sibling, 1);
  const right = Math.min(active + sibling, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 2;

  if (!showLeftDots && showRightDots)
    return [...range(1, 3 + 2 * sibling), "dots", total];
  if (showLeftDots && !showRightDots)
    return [1, "dots", ...range(total - (3 + 2 * sibling) + 1, total)];
  return [1, "dots", ...range(left, right), "dots", total];
}

export function paginate(array, page, size) {
  const start = (page - 1) * size;
  return array.slice(start, start + size);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}
