import connectToDB from "./connectToDB.js"
import registerGlobalMiddlewares from "./registerGlobalMiddlewares.js";

const bootstrap = async (app) => {
    registerGlobalMiddlewares(app)
    await connectToDB();
}

export default bootstrap;