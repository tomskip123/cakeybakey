import request from 'supertest';
import App from '@/app';
import CakeRoute from '@/routes/cake.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Cake Routes', () => {

  describe('[GET] /cake', () => {
    it('response findAll users', async () => {
      const cakeRoute = new CakeRoute();

      const cakes = cakeRoute.cakeController.cakeService.cakes;

      const values = [
        {
          id: 1,
          name: 'cake 1',
          comment: 'cake 1 comment',
          imageUrl: 'http://url',
          yumFactor: 2
        },
        {
          id: 2,
          name: 'cake 2',
          comment: 'cake 2 comment',
          imageUrl: 'http://url',
          yumFactor: 4
        },
        {
          id: 3,
          name: 'cake 3',
          comment: 'cake 3 comment',
          imageUrl: 'http://url',
          yumFactor: 3
        },
      ];

      cakes.findAll = jest.fn().mockReturnValue(values);

      const app = new App([cakeRoute]);

      return request(app.getServer()).get(`${cakeRoute.path}`).expect(200);
    });
  });

  describe('[POST] /cake', () => {
    it('response post users', async () => {
      const cakeRoute = new CakeRoute();

      const cakes = cakeRoute.cakeController.cakeService.cakes;

      const postPayload = JSON.stringify({
        id: 1,
        name: 'cake 1',
        comment: 'cake 1 comment',
        imageUrl: 'http://url',
        yumFactor: 2
      });

      cakes.create = jest.fn().mockReturnValue(postPayload);

      const app = new App([cakeRoute]);

      return request(app.getServer())
        .post(`${cakeRoute.path}`)
        .attach('image', 'src/tests/test-assets/image.jpg')
        .field('data', postPayload)
        .expect(function (res) {
          res.body = postPayload;
        })
        .expect(200);
    });
  });

  describe('[PUT] /cake/:id', () => {
    it('response put users', async () => {
      const cakeRoute = new CakeRoute();

      const cakes = cakeRoute.cakeController.cakeService.cakes;

      const postPayload = JSON.stringify({
        id: 1,
        name: 'cake 1',
        comment: 'cake 1 comment',
        imageUrl: 'http://url',
        yumFactor: 2
      });

      cakes.update = jest.fn().mockReturnValue(postPayload);

      const app = new App([cakeRoute]);

      return request(app.getServer())
        .put(`${cakeRoute.path}/1`)
        .attach('image', 'src/tests/test-assets/image.jpg')
        .field('data', postPayload)
        .expect(function (res) {
          res.body = postPayload;
        })
        .expect(200);
    });
  });

  describe('[DELETE] /cake/:id', () => {
    it('response post users', async () => {
      const cakeRoute = new CakeRoute();

      const cakes = cakeRoute.cakeController.cakeService.cakes;

      const postPayload = JSON.stringify({
        id: 1,
        name: 'cake 1',
        comment: 'cake 1 comment',
        imageUrl: 'http://url',
        yumFactor: 2
      });

      cakes.destroy = jest.fn().mockReturnValue(postPayload);

      const app = new App([cakeRoute]);

      return request(app.getServer())
        .delete(`${cakeRoute.path}/1`)
        .expect(200);
    });
  });



});
