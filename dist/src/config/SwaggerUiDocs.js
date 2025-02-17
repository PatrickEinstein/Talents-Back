import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
const ENV = process.env.ENV;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let directoryPath = path.join(__dirname, "..", "routes", "*.js");
if (ENV === "LINUX") {
    directoryPath = path.join(__dirname, "..", "routes", "*.js");
}
else if (ENV === "WINDOWS") {
    directoryPath = path.join(__dirname, "..", "routes", "*.js").slice(1);
}
// Decode the path if necessary (only for special characters)
const decodedPath = directoryPath.includes("%")
    ? decodeURIComponent(directoryPath)
    : directoryPath;
console.log("Directory: " + directoryPath, "Decoded: " + decodedPath);
// const decodedPath = decodeURIComponent(directoryPath);
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Talented Skills network api",
            version: "1.7.1",
            description: "This is the api for talented skills",
            // contact: {
            //   name: "Patrick",
            //   url: "folio.vercel.app",
            //   email: "pmohammed@chamsswitch.com",
            // },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/`,
                description: "Development server",
            },
            {
                url: `https://localhost:${process.env.HTTPS_PORT}/`,
                description: "Production server",
            },
        ],
        basePath: "/",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        explorer: true,
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [decodedPath],
};
const swaggerconfig = swaggerJSDoc(options);
export default swaggerconfig;
