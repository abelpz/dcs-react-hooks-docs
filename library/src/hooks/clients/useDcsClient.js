import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS issues API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useDcsClient = ({ token, Class }) => {
  const config = getApiConfig({ token });
  const client = Class ? new Class(config) : null;
  return client;
};
