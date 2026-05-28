export function replaceVietnameseStr(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // xử lý riêng chữ đ
    .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
    .trim();
}

export function createObjectKey(str: string) {
  const replaceVietnamese = replaceVietnameseStr(str);
  return replaceVietnamese.split(" ").join("_");
}
