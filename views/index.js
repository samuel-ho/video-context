import HomePage, { config as HomeConfig } from "./HomePage";
import ExternalApiPage, {
  config as ExternalApiConfig,
} from "./ExternalApiPage";
import LoungePage, { config as LoungePageConfig } from "./LoungePage";
import ErrorPage, { config as ErrorPageConfig } from "./ErrorPage";

import PrivateRoute from "../components/PrivateRoute";

const views = [
  {
    ...HomeConfig,
    exact: true,
    routeType: PrivateRoute,
    component: HomePage,
  },
  {
    ...ExternalApiConfig,
    exact: true,
    routeType: PrivateRoute,
    component: ExternalApiPage,
  },
  {
    ...LoungePageConfig,
    exact: true,
    routeType: PrivateRoute,
    component: LoungePage,
  },
  {
    ...ErrorPageConfig,
    exact: true,
    routeType: PrivateRoute,
    component: ErrorPage
  }
];

export default views;
