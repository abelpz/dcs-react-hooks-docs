import React from 'react';
import PropTypes from 'prop-types';
import { UserApi } from 'dcs-js';
import { AxiosInstance } from "axios";
/**
 * Uses UserApi from dcs-js
 */
export function useUserClient() {
  return <></>;
};

useUserClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  userClient: PropTypes.instanceOf(UserApi),
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