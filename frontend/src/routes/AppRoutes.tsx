import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import HomeLayout from "@/Layout/HomeLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { LayoutType, RouteOptions } from "./routeType";
import { routes } from "./RoutesConfig";


const getBrowserRouter = (routes: RouteOptions[]) => {
  const routerObjects: RouteObject[] = routes.map((route: RouteOptions) => {

    let element = route.element;

    // Apply AuthLayout only if includeLayout is true
    if (route.layout ===  LayoutType.HOME) {
      element = <HomeLayout>{element}</HomeLayout>;
    }
    
    const routerObject: RouteObject = {
      id: route.key,
      path: route.path,
      element: element,
    };

        // Wrap protected routes
        if (route.isProtected) {
          routerObject.element = <ProtectedRoute>{routerObject.element}</ProtectedRoute>;
        }

    return routerObject;
  });

  const router = createBrowserRouter(routerObjects);
  return router;
};

const Router = () => {
  const router = getBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;