const normalizeServerUrl = (value?: string) => value?.replace(/\/+$/, "");

const resolveHttpServer = () => {
  const configuredServer = normalizeServerUrl(process.env.NEXT_PUBLIC_HTTP_SERVER);
  if (configuredServer) {
    return configuredServer;
  }

  return "";
};

export const HTTP_SERVER = resolveHttpServer();