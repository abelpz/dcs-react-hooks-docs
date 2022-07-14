import { OrganizationApi } from "dcs-js";
import { AxiosInstance } from "axios";
import PropTypes from 'prop-types';
import { getApiConfig } from "@helpers/api";

/**
 * Uses DCS organization API.
 */
export function useOrgClient({ token, basePath, organizationClient, axios, configuration }) {
  if (organizationClient instanceof OrganizationApi) return organizationClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new OrganizationApi(_configuration, _configuration.basePath, axios);
};

useOrgClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  organizationClient: PropTypes.instanceOf(OrganizationApi),
  axios: PropTypes.instanceOf(AxiosInstance),
  /** *dcs-js* instance config */
  configuration: PropTypes.shape({
    apiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    username: PropTypes.string,
    password: PropTypes.string,
    accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    basePath: PropTypes.string,
    baseOptions: PropTypes.object,
  })
};