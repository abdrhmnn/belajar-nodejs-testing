import { getAllProduct, getProductById } from "../src/database";

export class DatabaseService {
  static findById(id){
    return getProductById(id)
  }

  static findAll(){
    return getAllProduct()
  }
}