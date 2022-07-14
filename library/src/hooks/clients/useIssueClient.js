import { IssueApi } from "dcs-js";
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS issue API.
 * @param {Object} props - hook props
 * @param {string} props.token - Token needed to make secure requests.
 */
export const useIssueClient = ({ token }) => {
  const config = getApiConfig({ token });
  const issueClient = new IssueApi(config);
  return issueClient;
};
