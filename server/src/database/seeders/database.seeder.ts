import { Category } from '@/modules/categories/schemas/categories.schema';
import { Product } from '@/modules/products/schemas/products.schema';
import { SellerPhoneType } from '@/modules/sellers/entities/seller-phone.entity';
import { Seller, SellerStatus } from '@/modules/sellers/entities/seller.entity';
import { User, UserStatus } from '@/modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';

import { HydratedDocument, Model } from 'mongoose';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerOrm: Repository<Seller>,
    @InjectRepository(User)
    private readonly userOrm: Repository<User>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  /**
   * Tạo database mẫu cho sellers
   * @returns
   */
  async createSellers() {
    try {
      const sellers = [
        {
          emailAddress: 'khitquangdai1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Quang',
            fullName: 'Quang Dai Khit',
            lastName: 'Dai Khit',
          },
          phones: [
            {
              phoneNumber: '0793844821',
              type: SellerPhoneType.COMPANY,
            },
            {
              phoneNumber: '0793844821',
              type: SellerPhoneType.INDIVIDUAL,
            },
          ],
          store: {
            info: {
              avatar:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
              description: 'Shop sample 1',
              emailAddress: 'shopsample1@gmail.com',
              name: 'Shop Sample 1',
              phoneNumber: '0793844821',
              slug: 'shop-sample-1',
              thumbnail:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            },
            storeCode: '123456',
          },
          status: SellerStatus.ACTIVE,
        },
        {
          emailAddress: 'devquang1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Dev',
            fullName: 'Dev Quang Dai Khit',
            lastName: 'Quang Dai Khit',
          },
          phones: [
            {
              phoneNumber: '0793844822',
              type: SellerPhoneType.COMPANY,
            },
            {
              phoneNumber: '0793844823',
              type: SellerPhoneType.INDIVIDUAL,
            },
          ],
          store: {
            info: {
              avatar:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
              description: 'Shop sample 2',
              emailAddress: 'shopsample2@gmail.com',
              name: 'Shop Sample 2',
              phoneNumber: '0793844822',
              slug: 'shop-sample-2',
              thumbnail:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            },
            storeCode: '140905',
          },
          status: SellerStatus.ACTIVE,
        },
        {
          emailAddress: 'kidgame1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Kid',
            fullName: 'Kid Quang Dai',
            lastName: 'Quang Dai',
          },
          phones: [
            {
              phoneNumber: '0793844823',
              type: SellerPhoneType.COMPANY,
            },
            {
              phoneNumber: '0793844824',
              type: SellerPhoneType.INDIVIDUAL,
            },
          ],
          store: {
            info: {
              avatar:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
              description: 'Shop sample 3',
              emailAddress: 'shopsample3@gmail.com',
              name: 'Shop Sample 3',
              phoneNumber: '0793844823',
              slug: 'shop-sample-3',
              thumbnail:
                'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            },
            storeCode: '123457',
          },
          status: SellerStatus.ACTIVE,
        },
      ];
      const newSellerData = this.sellerOrm.create(sellers);
      return await this.sellerOrm.save(newSellerData);
    } catch (error) {
      console.log('SELLER ERROR', error);
      throw error;
    }
  }
  /**
   * Tạo database mẫu cho danh mục sản phẩm
   * @returns
   */
  async createCategories() {
    try {
      const categories = [
        {
          name: 'Shoes',
          slug: 'shoes',
        },
        {
          name: 'Fashion',
          slug: 'fashion',
        },
        {
          name: 'Home & Living',
          slug: 'home-living',
        },
        {
          name: 'Sports',
          slug: 'sports',
        },
        {
          name: 'Studies',
          slug: 'studies',
        },
        {
          name: 'Beauty',
          slug: 'beauty',
        },
        {
          name: 'Electronics',
          slug: 'electronics',
        },
        {
          name: 'Toys',
          slug: 'toys',
        },
      ];
      return await this.categoryModel.create(categories);
    } catch (error) {
      console.log('CATEGORIES ERROR', error);
      throw error;
    }
  }
  /**
   * Tạo database mẫu cho sản phẩm
   * @returns
   */
  async createProducts(
    newSellers: Seller[],
    newCategories: HydratedDocument<Category>[],
  ) {
    try {
      const products = [
        {
          info: {
            name: 'Product 1',
            description: 'Description for product 1',
            price: 100000,
            sale: 5,
            category: { id: '', name: '' },
            brand: 'Brand 1',
            origin: 'Vietnam',
          },
          owner: { sellerId: '', storeId: '' },
          images: {
            thumbnail: 'https://picsum.photos/200?random=1',
            details: [
              'https://picsum.photos/300?random=11',
              'https://picsum.photos/300?random=12',
            ],
          },
          tags: ['#product1', '#demo'],
          classification: [
            {
              name: 'type',
              values: [
                { name: 'Type A', img: '', stock: 10, extraPrice: 0 },
                { name: 'Type B', img: '', stock: 15, extraPrice: 5000 },
              ],
            },
          ],
          shipping: { flash: true, normal: true },
          ratingSumary: { avg: 4.5, total: 10 },
          status: 'active',
        },

        {
          info: {
            name: 'Product 2',
            description: 'Description for product 2',
            price: 200000,
            sale: 10,
            category: { id: '', name: '' },
            brand: 'Brand 2',
            origin: 'Vietnam',
          },
          owner: { sellerId: '', storeId: '' },
          images: {
            thumbnail: 'https://picsum.photos/200?random=2',
            details: [
              'https://picsum.photos/300?random=21',
              'https://picsum.photos/300?random=22',
            ],
          },
          tags: ['#product2', '#demo'],
          classification: [
            {
              name: 'type',
              values: [
                { name: 'Type A', img: '', stock: 20, extraPrice: 0 },
                { name: 'Type B', img: '', stock: 25, extraPrice: 10000 },
              ],
            },
          ],
          shipping: { flash: true, normal: true },
          ratingSumary: { avg: 4.2, total: 8 },
          status: 'active',
        },

        {
          info: {
            name: 'Product 3',
            description: 'Description for product 3',
            price: 300000,
            sale: 15,
            category: { id: '', name: '' },
            brand: 'Brand 3',
            origin: 'Vietnam',
          },
          owner: { sellerId: '', storeId: '' },
          images: {
            thumbnail: 'https://picsum.photos/200?random=3',
            details: [
              'https://picsum.photos/300?random=31',
              'https://picsum.photos/300?random=32',
            ],
          },
          tags: ['#product3', '#demo'],
          classification: [
            {
              name: 'type',
              values: [
                { name: 'Type A', img: '', stock: 30, extraPrice: 0 },
                { name: 'Type B', img: '', stock: 35, extraPrice: 15000 },
              ],
            },
          ],
          shipping: { flash: true, normal: true },
          ratingSumary: { avg: 4.8, total: 15 },
          status: 'active',
        },
      ];

      const formatedProductData = newSellers.flatMap((seller) =>
        products.map((product) => {
          const category =
            newCategories[Math.floor(Math.random() * newCategories.length)];

          return {
            ...product,
            owner: {
              sellerId: seller.id,
              storeId: seller.store.id,
            },
            info: {
              ...product.info,
              name: `${product.info.name} ${category.name} ${seller.info.fullName}`,
              category: {
                name: category.name,
                id: category._id.toString(),
              },
            },
          };
        }),
      );

      return await this.productModel.create(formatedProductData);
    } catch (error) {
      console.log('PRODUCT ERROR', error);
      throw error;
    }
  }
  /**
   * Tạo database mẫu cho người dùng
   */
  async createUsers() {
    try {
      const users = [
        {
          emailAddress: 'khitquangdai1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Quang',
            fullName: 'Quang Dai Khit',
            lastName: 'Dai Khit',
          },
          phones: [
            {
              phoneNumber: '0793844821',
            },
            {
              phoneNumber: '0793844821',
            },
          ],
          status: UserStatus.ACTIVE,
        },
        {
          emailAddress: 'devquang1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Dev',
            fullName: 'Dev Quang',
            lastName: 'Quang',
          },
          phones: [
            {
              phoneNumber: '0793844822',
            },
            {
              phoneNumber: '0793844823',
            },
          ],
          status: UserStatus.ACTIVE,
        },
        {
          emailAddress: 'kidgame1409@gmail.com',
          hashPassword: await bcrypt.hash('14092005', 10),
          addresses: [
            {
              addressDetail: 'Cafe Truc Ly - Huu Duc',
              province: 'Khanh Hoa',
              ward: 'Phuoc Huu',
            },
          ],
          info: {
            avatar:
              'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
            dateOfBirth: '2005-09-14',
            firstName: 'Kid',
            fullName: 'Kid Gaming',
            lastName: 'Gaming',
          },
          phones: [
            {
              phoneNumber: '0793844823',
            },
            {
              phoneNumber: '0793844824',
            },
          ],
          status: UserStatus.ACTIVE,
        },
      ];
      const newUsers = this.userOrm.create(users);
      return await this.userOrm.save(newUsers);
    } catch (error) {
      console.log('USER ERROR: ', error);
      throw error;
    }
  }
  /**
   * Tạo Database mẫu khi khởi tạo dự án
   */
  async create() {
    try {
      const newSellers = await this.createSellers();

      const newUsers = await this.createUsers();

      const newCategories = await this.createCategories();

      const newProducts = await this.createProducts(newSellers, newCategories);

      console.log('================ SELLER & STORE ================');
      console.table(
        newSellers.map((seller) => ({
          id: seller.id,
          storeId: seller.store.id,
        })),
      );
      console.log('================ USERS ================');
      console.table(newUsers.map((user) => ({ id: user.id })));
      console.log('================ CATEGORIES ================');
      console.table(
        newCategories.map((category) => ({ id: category._id.toString() })),
      );

      console.log('================ PRODUCT ================');
      console.table(
        newProducts.map((product) => ({ id: product._id.toString() })),
      );
    } catch (error) {
      await this.reset();
      console.log('create seed handle runtime error: ', error);
    }
  }
  /**
   * Reset toàn bộ database
   */
  async reset() {
    try {
      await this.sellerOrm.deleteAll();
      await this.userOrm.deleteAll();
      await this.productModel.deleteMany();
      await this.categoryModel.deleteMany();
      console.log('delete all successfull');
    } catch (error) {
      console.log('reset seed runtime error: ', error);
    }
  }
}
