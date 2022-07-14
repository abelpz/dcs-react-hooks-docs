import React from 'react';
import PropTypes from 'prop-types';
import { OrganizationApi } from 'dcs-js';
import { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Get All organizations from DCS.
 */
export function useAllOrgs() {
  return <></>;
};

useAllOrgs.propTypes = {
  lang: PropTypes.string,
  page: PropTypes.number,
  limit: PropTypes.number,
  orgClient: PropTypes.instanceOf(OrganizationApi),
  options: PropTypes.shape({
    /** see https://swr.vercel.app/docs/options#options */
    swr: PropTypes.object,
    /** see https://axios-http.com/docs/req_config */
    request: PropTypes.instanceOf(AxiosRequestConfig)
  }),
  /** *dcs-js* instance config */
  configuration: PropTypes.shape({
    token: PropTypes.string,
    apiKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    username: PropTypes.string,
    password: PropTypes.string,
    accessToken: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.instanceOf(Promise)]),
    basePath: PropTypes.string,
    baseOptions: PropTypes.object,
  }),
  axios: PropTypes.instanceOf(AxiosInstance)
};
