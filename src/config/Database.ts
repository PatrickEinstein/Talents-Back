import { Request, Response } from "express";
import AppDataSource from "../data-source.js";


const ConnectDatabse = (
  app: any,
  httpapp: any,
  PORT: number,
  HTTPS_PORT: number,
  uri: string
) => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .then(
      app.listen(PORT, "0.0.0.0", async (req: Request, res: Response) => {
        console.log(`Server is running on port http://localhost:${PORT}/api/docs`);
      })
    )
    .then(
      httpapp.listen(
        HTTPS_PORT,
        "0.0.0.0",
        async (req: Request, res: Response) => {
          console.log(
            `Server is running on port https://localhost:${HTTPS_PORT}/api/docs`
          );
        }
      )
    )
    .catch((error) =>
      console.log("Error during Data Source initialization", error)
    );
};
export default ConnectDatabse;
