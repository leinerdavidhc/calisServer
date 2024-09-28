import express, { Application } from "express";
import IndexRoutes from "../routes/index.routes";
import cors from 'cors';
import morgan from 'morgan';

export class App {
  private app: Application;
  public Routes = new IndexRoutes();

  constructor(private port: number) {
    this.app = express();
    this.setting();
    this.middlewares();
    this.routes();
  }

  private setting() {
    this.app.set("port", this.port);
  }
  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors(
      {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
      }
    ));

  }

  private routes(): void {
    this.app.use('/auth', this.Routes.RouterUser.router);
  }

  async start(): Promise<void> {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}