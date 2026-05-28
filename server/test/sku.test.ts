const name =
  'Giò bẫy gà rừng, giò đón và giò đá, chất liệu cáp lụa thái dây dù siêu bền ,phù hợp anh em đam mê gà rừng';
const value1 = 'Giò đón';
const value2 = 'Chân đồng';

function createProductCode(name: string) {
  return name
    .split(' ')[0] //lấy đầu tiên
    .toLowerCase()
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/đ/g, 'd') // xử lý riêng chữ đ
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .trim()
    .toUpperCase();
}

function creatSku() {
  const code = createProductCode(name);
  const randomNum = Math.floor(Math.random() * 1000).toString();

  const formatVl1 = value1
    .split(' ')
    .join('')
    .toLowerCase()
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/đ/g, 'd') // xử lý riêng chữ đ
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .trim()
    .toUpperCase();
  const formatVl2 = value2
    .split(' ')
    .join('')
    .toLowerCase()
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .replace(/đ/g, 'd') // xử lý riêng chữ đ
    .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
    .trim()
    .toUpperCase();
  return `${code}-${randomNum}-${formatVl1}-${formatVl2}`;
}

console.log(creatSku());
