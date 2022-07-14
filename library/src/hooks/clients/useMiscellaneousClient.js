import { MiscellaneousApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS Miscellaneous API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useMiscellaneousClient = ({ token }) => {
  const config = getApiConfig({ token });
  const MiscellaneousClient = new MiscellaneousApi(config);
  return MiscellaneousClient;
};