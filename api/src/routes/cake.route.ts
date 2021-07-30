import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CakeController from '@/controllers/cake.controller';

class CakeRoute implements Routes {
  public path = '/cake';
  public router = Router();
  public cakeController = new CakeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cakeController.index);
    this.router.put(`${this.path}/:id`, this.cakeController.update);
    this.router.delete(`${this.path}/:id`, this.cakeController.deleteCake);
    this.router.post(`${this.path}`, this.cakeController.create);
  }
}

export default CakeRoute;
