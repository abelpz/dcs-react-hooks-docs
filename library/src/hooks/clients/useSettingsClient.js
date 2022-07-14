import { SettingsApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS Settings API.
 * @param {string} token - Token needed to make secure requests.
 */
export const useSettingsClient = ({ token }) => {
  const config = getApiConfig({ token });
  const SettingsClient = new SettingsApi(config);
  return SettingsClient;
};
