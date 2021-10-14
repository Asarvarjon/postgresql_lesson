import express from "express";
import morgan from "morgan";
import path from "path";
import { addErrorHandler } from "./middlewares/errorHandler.js";
import database from "./modules/mongoose.js";
import routes from "./routes/routes.js";

// import swaggerUi from "swagger-ui-express";
// import swaggerJson from "../docs/swagger.json";

const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

async function server(mode) {
	const app = express();

	try {
		app.listen(PORT, () => console.log(`SERVER READY AT ${PORT}`));

		// middlewares
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static(path.join(__dirname, "public")));
		// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

		if (mode == "dev") app.use(morgan("dev"));

		await database();

		app.use(addErrorHandler);
	} catch (error) {
		console.log("SERVER ERROR:", error + "");
	} finally {
		routes(app);
	}
}

export default server;
