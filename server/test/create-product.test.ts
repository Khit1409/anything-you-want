export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ZERO = 'zero',
}
export interface ProductDataRequestDto {
  info: {
    name: string;
    description: string;
    price: number;
    sale: number;
    category: {
      name: string;
      id: string;
    };
    brand: string;
    origin: string;
  };
  owner: {
    sellerId: string;
    storeId: string;
  };
  images: {
    thumbnail: string;
    details: Array<string>;
  };
  classifications: Array<{
    name: string;
    values: Array<{
      name: string;
      stock: number;
      extraPrice: number;
      img?: string;
    }>;
  }>;
  shipping: { normal: boolean; flash: boolean };
  tags: Array<string>;
  status: Status;
}

export const productFakeRequestData: ProductDataRequestDto = {
  info: {
    name: 'Iphone 17 promax 512GB, 1TB, 256GB',
    category: {
      id: 'abc-def-gkh',
      name: 'Technology',
    },
    price: 20000000,
    sale: 5,
    description:
      'Iphone 17 promax 3 phiên bản phổ biến 256GB, 512GB, 1TB , bảo hành 3 năm, miễn phí sửa chữa với các lỗi đến từ nhà phát hành',
    brand: 'Apple',
    origin: 'United State',
  },
  classifications: [
    {
      name: 'Màu sắc',
      values: [
        { name: 'Trắng', extraPrice: 0, stock: 100, img: '' },
        { name: 'Đen', extraPrice: 0, stock: 100, img: '' },
        { name: 'Cam', extraPrice: 0, stock: 100, img: '' },
        { name: 'Vàng', extraPrice: 0, stock: 100, img: '' },
      ],
    },
    {
      name: 'Dung lượng bộ nhớ',
      values: [
        { name: '256GB', extraPrice: 0, stock: 100, img: '' },
        { name: '512GB', extraPrice: 10000000, stock: 100, img: '' },
        { name: '1TB', extraPrice: 12000000, stock: 100, img: '' },
      ],
    },
  ],
  images: {
    thumbnail: 'iphone-17-thumbnail.jpg',
    details: [
      'iphone-17-detail-img-1.jpg',
      'iphone-17-detail-img-2.jpg',
      'iphone-17-detail-img-3.jpg',
    ],
  },
  owner: {
    sellerId: 'abc-def-gkh',
    storeId: 'abc-123-gh02-11',
  },
  shipping: { flash: true, normal: true },
  status: Status.ACTIVE,
  tags: [
    '#iphone',
    '#iphone-17',
    '#iphone-17-promax',
    '#iphone-512gb',
    '#iphone-1tb',
    '#iphone17-1tb',
  ],
};
