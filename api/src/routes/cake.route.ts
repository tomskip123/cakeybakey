import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CakeController from '@/controllers/cake.controller';
import multer from 'multer';


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });
class CakeRoute implements Routes {
  public path = '/cake';
  public router = Router();
  public cakeController = new CakeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cakeController.index);
    this.router.put(`${this.path}/:id`, upload.single('image'), this.cakeController.update);
    this.router.delete(`${this.path}/:id`, this.cakeController.deleteCake);
    this.router.post(`${this.path}`, upload.single('image'), this.cakeController.create);
  }
}

export default CakeRoute;
