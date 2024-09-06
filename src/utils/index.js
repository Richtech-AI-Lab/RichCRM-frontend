export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    return `${year}-${month}-${day}`;
  };