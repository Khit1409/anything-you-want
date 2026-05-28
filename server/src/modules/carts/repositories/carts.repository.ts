import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Cart } from '../schemas/carts.schema';

@Injectable()
export class CartRepository {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) {}

  async create(cartData: Cart) {
    return await this.cartModel.create({ ...cartData });
  }

  async getOneByProductId(productId: string, userId: string) {
    return await this.cartModel
      .findOne({
        'info.productId': productId,
        'owner.userId': userId,
      })
      .lean();
  }

  async findOneByProductId(
    productId: string,
    userId: string,
  ): Promise<HydratedDocument<Cart> | null> {
    return await this.cartModel.findOne({
      'info.productId': productId,
      'owner.userId': userId,
    });
  }

  async getOneById(id: string, userId: string): Promise<Cart | null> {
    return await this.cartModel
      .findOne({ _id: id, 'owner.userId': userId })
      .lean();
  }

  async findOneById(
    id: string,
    userId: string,
  ): Promise<HydratedDocument<Cart> | null> {
    return await this.cartModel.findOne({ _id: id, 'owner.userId': userId });
  }

  async getManyByUser(uid: string): Promise<Cart[]> {
    return await this.cartModel
      .find({ 'owner.userId': uid })
      .select('-owner -__v')
      .lean();
  }

  async findManyByUser(uid: string) {
    return await this.cartModel
      .find({ 'owner.userId': uid })
      .select('-owner -__v');
  }

  async updateQuantity(id: string, quantity: number) {
    return await this.cartModel.updateOne(
      { _id: id },
      {
        'info.quantity': Number(quantity),
      },
    );
  }

  async delete(id: string, uid: string) {
    return await this.cartModel.findOneAndDelete({
      _id: id,
      'owner.userId': uid,
    });
  }

  async deleteByProductId(productId: string, userId: string) {
    return await this.cartModel.deleteMany({
      'info.productId': productId,
      'owner.userId': userId,
    });
  }
}
