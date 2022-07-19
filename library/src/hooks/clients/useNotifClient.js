import PropTypes from 'prop-types';
import {NotificationApi, Configuration} from "dcs-js";
import {AxiosInstance} from "axios";
import {getApiConfig} from "@helpers/api";

/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * @callback apiKeyCallback
 * @param {string} AuthenticationType - a string containing one of (access_token|Authorization|Sudo|sudo|X-GITEA-OTP|token)
 * @return {string|Promise<string>} the apiKey
 */

/**
 * Uses NotificationApi from dcs-js.
 * @arg {Object} [params] - list of arguments
 * @arg {string} params.token - dcs authentication token
 * @arg {string} params.basePath - override requests base path
 * @arg {NotificationApi} params.notifClient - NotificationApi instance
 * @arg {AxiosInstance} params.axios - a custom axios instance to use to make requests
 * @arg {Configuration} params.configuration - a configuration object
 * @arg {string|Promise<string>|apiKeyCallback} params.configuration.apiKey - a string or a callback function returning the apiKey depending on authentication type.
 * @arg {string} params.configuration.username - the user name for basic authentication.
 * @arg {string} params.configuration.password - the user password for basic authentication.
 * @arg {string} params.configuration.basePath - override requests base path
 * @arg {NumberLike} params.configuration.baseOptions -base options for axios calls
 * @return {NotificationApi} new NotificationApi instance
*/
export const useNotifClient = ({
  token,
  basePath,
  notifClient,
  axios,
  configuration
} = {}) => {
  if (notifClient instanceof NotificationApi) 
    return notifClient;
  /**
   * configuration parameter
   */
  const _configuration = getApiConfig({
    token,
    ...configuration,
    basePath
  });
  return new NotificationApi(_configuration, _configuration.basePath, axios);
};