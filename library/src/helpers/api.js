export const getApiConfig = ({ token, basePath = "https://qa.door43.org/api/v1/", ...config }) => ({
  apiKey: token && ((key) => key === "Authorization" ? `token ${token}` : ""),
  basePath: basePath?.replace(/\/+$/, ""),
  ...config
})
