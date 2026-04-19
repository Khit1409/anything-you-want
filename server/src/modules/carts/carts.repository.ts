import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Cart } from './schemas/carts.schema';

@Injectable()
export class CartRepository {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) {}

  /**
   *
   * @param dto
   * @param uid
   * @param ownerOfProduct
   * @returns
   */
  async create(cartData: Cart) {
    const newCart = await this.cartModel.create({ ...cartData });
    return newCart;
  }
  /**
   *
   * @param productId
   * @returns
   */
  async getByProductId(productId: string, userId: string) {
    return await this.cartModel.findOne({
      'info.productId': productId,
      'owner.userId': userId,
    });
  }
  /**
   *
   * @param id
   * @param quantity
   */
  async updateExistingCart(id: mongoose.Types.ObjectId, quantity: number) {
    await this.cartModel.updateOne(
      {
        _id: id,
      },
      {
        $inc: {
          'info.quantity': quantity,
        },
      },
    );
  }
  /**
   *
   * @param uid
   * @returns
   */
  async getByUser(uid: string) {
    const carts = await this.cartModel
      .find({ 'owner.userId': uid })
      .select('-owner -__v')
      .lean();
    return carts;
  }
  /**
   *
   * @param id
   * @returns
   */
  async getOne(id: string, uid: string) {
    return await this.cartModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      'owner.userId': uid,
    });
  }
  /**
   *
   * @param id
   * @param quantity
   * @returns
   */
  async updateQuantity(id: string, quantity: number) {
    const updated = await this.cartModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        'info.quantity': Number(quantity),
      },
    );
    return updated;
  }
  /**
   *
   */
  async delete(id: string, uid: string) {
    return await this.cartModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      'owner.userId': uid,
    });
  }
}
