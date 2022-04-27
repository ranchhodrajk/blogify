import "../styles/globals.scss";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../components/Layout/Layout";

import { ApolloProvider } from "@apollo/client";
import client from "../utilities/apollo-client";
import { Provider } from "react-redux";
import store from "../utilities/Store";

function MyApp({ Component, pageProps }) {
  return (
    <div className="appRootClass">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
