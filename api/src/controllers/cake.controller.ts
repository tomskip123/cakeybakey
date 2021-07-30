import { Cake } from '@/interfaces/cake.interface';
import CakeService from '@/services/cake.service';
import { NextFunction, Request, Response } from 'express';

class CakeController {

  public cakeService = new CakeService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cakes: Cake[] = await this.cakeService.findAllCakes();

      res.json(cakes);
    } catch (error) {
      next(error);
    }
  };
}

export default CakeController;
