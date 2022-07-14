import PropTypes from 'prop-types';
import { NotificationApi, Configuration } from "dcs-js";
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

/**
 * @callback apiKeyCallback
 * @param {string} AuthenticationType - a string containing one of (access_token|Authorization|Sudo|sudo|X-GITEA-OTP|token)
 * @return {string|Promise<string>} the apiKey
 */

/**
 * Uses NotificationApi from dcs-js.
 * @param {Object} [params] - list of arguments
 * @param {string} params.token - dcs authentication token
 * @param {string} params.basePath - override requests base path
 * @param {NotificationApi} params.notifClient - NotificationApi instance
 * @param {AxiosInstance} params.axios - a custom axios instance to use to make requests
 * @param {Configuration} params.configuration - a configuration object
 * @param {string|Promise<string>|apiKeyCallback} params.configuration.apiKey - a string or a callback function returning the apiKey depending on authentication type.
 * @param {string} params.configuration.username - the user name for basic authentication.
 * @param {string} params.configuration.password - the user password for basic authentication.
 * @param {string} params.configuration.basePath - override requests base path
 * @param {} params.configuration.baseOptions -base options for axios calls
 * @return {NotificationApi} new NotificationApi instance
*/
export const useNotifClient = ({ token, basePath, notifClient, axios, configuration } = {}) => {
  if (notifClient instanceof NotificationApi) return notifClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new NotificationApi(_configuration, _configuration.basePath, axios);
};

// useNotifClient.propTypes = {
//   token: PropTypes.string,
//   basePath: PropTypes.string,
//   notifClient: PropTypes.instanceOf(NotificationApi),
//   axios: PropTypes.instanceOf(AxiosInstance),
//   /** *dcs-js* instance config */
//   configuration: PropTypes.shape({
//     apiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
//     username: PropTypes.string,
//     password: PropTypes.string,
//     accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
//     basePath: PropTypes.string,
//     baseOptions: PropTypes.object,
//   })
// };