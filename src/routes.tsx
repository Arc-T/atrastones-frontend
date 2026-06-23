import { createBrowserRouter } from "react-router";
import { LoginPage } from "./routes/(app)/login";
import { RootLayout } from "./routes/(app)/root";
import { DashboardLayout } from "./routes/(app)/(authenticated)/route";
import { DashboardIndex } from "./routes/(app)/(authenticated)";
import { AttributesList } from "./routes/(app)/(authenticated)/attributes/list";
import { AttributesCreate } from "./routes/(app)/(authenticated)/attributes/create";
import { AttributesShow } from "./routes/(app)/(authenticated)/attributes/show";

export const router = createBrowserRouter([
  {
    path: "dashboard",
    Component: RootLayout,
    children: [
      {
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: DashboardIndex,
          },
          {
            path: "attributes",
            children: [
              {
                path: "create",
                Component: AttributesCreate,
              },
              {
                path: "list",
                Component: AttributesList,
              },
              {
                path: ":id?/show",
                Component: AttributesShow,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
