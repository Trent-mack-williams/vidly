export function paginate(items, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pagesItems = items.slice(startIndex, endIndex);
  return pagesItems;
}
