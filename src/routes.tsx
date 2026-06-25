import { createBrowserRouter } from "react-router";
import { LoginPage } from "./routes/(app)/login";
import { RootLayout } from "./routes/(app)/root";
import { DashboardLayout } from "./routes/(app)/(authenticated)/route";
import { DashboardIndex } from "./routes/(app)/(authenticated)";
import { AttributesList } from "./routes/(app)/(authenticated)/attributes/list";
import { AttributesCreate } from "./routes/(app)/(authenticated)/attributes/create";
import { AttributesShow } from "./routes/(app)/(authenticated)/attributes/show";
import { CategoriesCreate } from "./routes/(app)/(authenticated)/categories/create";
import { CategoriesList } from "./routes/(app)/(authenticated)/categories/list";
import { CategoriesShow } from "./routes/(app)/(authenticated)/categories/show";
import { TagsCreate } from "./routes/(app)/(authenticated)/tags/create";
import { TagsList } from "./routes/(app)/(authenticated)/tags/list";
import { TagsShow } from "./routes/(app)/(authenticated)/tags/show";
import { ServicesCreate } from "./routes/(app)/(authenticated)/services/create";
import { ServicesList } from "./routes/(app)/(authenticated)/services/list";
import { ServicesShow } from "./routes/(app)/(authenticated)/services/show";
import { ProductsCreate } from "./routes/(app)/(authenticated)/products/create";
import { ProductsList } from "./routes/(app)/(authenticated)/products/list";
import { ProductsShow } from "./routes/(app)/(authenticated)/products/show";
import { AttributesEdit } from "./routes/(app)/(authenticated)/attributes/edit";

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
              {
                path: ":id?/edit",
                Component: AttributesEdit,
              },
            ],
          },
          {
            path: "categories",
            children: [
              {
                path: "create",
                Component: CategoriesCreate,
              },
              {
                path: "list",
                Component: CategoriesList,
              },
              {
                path: ":id?/show",
                Component: CategoriesShow,
              },
            ],
          },
          {
            path: "tags",
            children: [
              {
                path: "create",
                Component: TagsCreate,
              },
              {
                path: "list",
                Component: TagsList,
              },
              {
                path: ":id?/show",
                Component: TagsShow,
              },
            ],
          },
          {
            path: "services",
            children: [
              {
                path: "create",
                Component: ServicesCreate,
              },
              {
                path: "list",
                Component: ServicesList,
              },
              {
                path: ":id?/show",
                Component: ServicesShow,
              },
            ],
          },
          {
            path: "products",
            children: [
              {
                path: "create",
                Component: ProductsCreate,
              },
              {
                path: "list",
                Component: ProductsList,
              },
              {
                path: ":id?/show",
                Component: ProductsShow,
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
