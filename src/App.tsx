import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import { showToastError } from "./utils/toast";
import { getError } from "./utils/error";

const queryCLient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showToastError(getError(error));
    },
  }),
});

export default function App() {
  return (
    <Fragment>
      <QueryClientProvider client={queryCLient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
      <ToastContainer />
    </Fragment>
  );
}
