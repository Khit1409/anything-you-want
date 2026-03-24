import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Connection } from 'mongoose';
import { Cart } from './schemas/carts.schema';

@Injectable()
export class CartRepository {
  constructor(
    @InjectConnection() private readonly cartConnection: Connection,
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
  ) {}

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
  async getByProductId(productId: string) {
    return await this.cartModel.findOne({ 'items.product_id': productId });
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
          'items.quantity': quantity,
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
      .find({ 'owner.user_id': uid })
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
      'owner.user_id': uid,
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
        'items.quantity': Number(quantity),
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
      'owner.user_id': uid,
    });
  }
}
