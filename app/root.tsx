import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// Only used during package development.
import elFormStyles from "../packages/electric-ladyland-form/dist/styles/styles.css";
// import elFormStyles from "electric-ladyland-form/styles/style.css";
import elStyles from "~/styles/electric-ladyland.css";
import twStyles from "~/styles/tailwind.css";

export function links() {
  return [
    { rel: "stylesheet", href: twStyles },
    { rel: "stylesheet", href: elFormStyles },
    { rel: "stylesheet", href: elStyles },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
