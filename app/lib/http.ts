const LOCAL_API_SERVER = "http://localhost:4000";

const normalizeServerUrl = (value?: string) => value?.replace(/\/+$/, "");

const isLocalHostname = (hostname: string) => hostname === "localhost" || hostname === "127.0.0.1";

const resolveHttpServer = () => {
  const configuredServer = normalizeServerUrl(process.env.NEXT_PUBLIC_HTTP_SERVER);
  if (configuredServer) {
    return configuredServer;
  }

  if (typeof window !== "undefined") {
    if (isLocalHostname(window.location.hostname)) {
      return LOCAL_API_SERVER;
    }

    console.error(
      "NEXT_PUBLIC_HTTP_SERVER is not configured. Set it to your deployed Express server URL in Vercel.",
    );
    return "";
  }

  return LOCAL_API_SERVER;
};

export const HTTP_SERVER = resolveHttpServer();