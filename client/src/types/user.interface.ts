import { IOrder } from "./order.interface"
import { IProduct } from "./product.interface"

export interface IUser {
  id: number
  email: string
  name: string
  avatarPath: string
  phone: string
  favorites: IProduct[]
}

export interface IFullUser extends IUser {
  favorites: IProduct[]
  orders: IOrder[]
}