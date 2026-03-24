export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/đ/g, 'd') // xử lý riêng chữ đ
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '_') // space -> -
    .replace(/-+/g, '_'); // nhiều - -> 1 -
}
