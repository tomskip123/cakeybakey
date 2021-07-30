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
  }
}

export default CakeRoute;
