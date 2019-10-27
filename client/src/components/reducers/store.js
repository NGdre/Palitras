import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import createRootReducer from "./";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      composeWithDevTools(
        applyMiddleware(routerMiddleware(history), apiMiddleware, thunk)
      )
    )
  );

  return store;
}
