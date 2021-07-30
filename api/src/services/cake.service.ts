import DB from "@/databases";
import { Cake } from "@/interfaces/cake.interface";

class CakeService {

  public cakes = DB.Cakes;

  public async findAllCakes(): Promise<Cake[]> {
    const allCakes: Cake[] = await this.cakes.findAll();
    return allCakes;
  }

  public async addCake(newCake: Cake): Promise<Cake> {
    const cake: Cake = await this.cakes.create(newCake);
    return cake;
  }

  async deleteCake(id: any): Promise<number> {
    return await this.cakes.destroy(id);
  }

  async updateCake(body: any): Promise<any> {
    return await this.cakes.update(body.id, body);
  }


}

export default CakeService;