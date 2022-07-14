import React from 'react';
import PropTypes from 'prop-types';
import { OrganizationApi } from 'dcs-js';
import { AxiosInstance } from "axios";
/**
 * Uses OrganizationApi from dcs-js.
 */
export function useOrgClient() {
  return <></>;
};

useOrgClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  orgClient: PropTypes.instanceOf(OrganizationApi),
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