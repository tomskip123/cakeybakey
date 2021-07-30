import { Cake } from '@/interfaces/cake.interface';
import CakeService from '@/services/cake.service';
import { NextFunction, Request, Response } from 'express';

class CakeController {

  public cakeService = new CakeService();

  /**
   * Get a list of cakes from the cake service
   * @param req 
   * @param res 
   * @param next 
   */
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cakes: Cake[] = await this.cakeService.findAllCakes();

      res.json(cakes);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a cake with this endpoint
   * @param req 
   * @param res 
   * @param next 
   */
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = JSON.parse(req.body.data);

      data.imageUrl = `http://localhost/api/${(req as any).file.filename}`

      const cakes: Cake = await this.cakeService.addCake(data);

      res.json(cakes);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a cake
   * @param req 
   * @param res 
   * @param next 
   */
  public update = async (req: any, res: Response, next: NextFunction) => {
    try {

      const data = JSON.parse(req.body.data);

      if (req?.file?.filename) {
        data.imageUrl = `http://localhost/api/${(req as any).file.filename}`
      }

      const cakes = await this.cakeService.updateCake(data);

      res.json(cakes);
    } catch (error) {
      next(error);
    }
  };

  /**
   * delete a cake
   * @param req 
   * @param res 
   * @param next 
   */
  public deleteCake = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params);
      const cakes: number = await this.cakeService.deleteCake(+req.params.id);

      res.json(cakes);
    } catch (error) {
      next(error);
    }
  };
}

export default CakeController;
