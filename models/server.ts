import express, { Application } from 'express';
import userRoutes from '../routes/userRoutes';
import cors from 'cors';

import db from '../db/connection';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  //   TODO: conectar DB
  async dbConnection() {
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Parseo de body
    this.app.use(express.json());
    // Carpeta public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

export default Server;
