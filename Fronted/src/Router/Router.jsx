import { createBrowserRouter } from "react-router-dom";
import { ProductManagementRoute } from "./ProductManagementRoute";

import Authrouter from "./AuthRoute";
const router = createBrowserRouter([...Authrouter,...ProductManagementRoute]);
export default router;
