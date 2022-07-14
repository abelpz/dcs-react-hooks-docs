import { AdminApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS admin API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useAdminClient = ({ token }) => {
  const config = getApiConfig({ token });
  const AdminClient = new AdminApi(config);
  return AdminClient;
};