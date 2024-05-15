import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/lib/i18";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
