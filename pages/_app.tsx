import type { AppProps } from "next/app";

import Layout from "../components/layout/layout";
import { NotificationProvider } from "../store/notification-context";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
}

export default MyApp;
