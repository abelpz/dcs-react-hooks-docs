import PropTypes from 'prop-types';
import { MiscellaneousApi } from "dcs-js";
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

/**
 * Uses MiscellaneousApi from dcs-js.
 */
export const useMiscClient = ({ token, basePath, miscClient, axios, configuration } = {}) => {
  if (miscClient instanceof MiscellaneousApi) return miscClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new MiscellaneousApi(_configuration, _configuration.basePath, axios);
};

useMiscClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  miscClient: PropTypes.instanceOf(MiscellaneousApi),
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