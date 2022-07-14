import React from 'react';
import PropTypes from 'prop-types';
import { RepositoryApi } from 'dcs-js';
import { AxiosInstance } from "axios";

/**
 * Uses RepositoryApi from dcs-js.
 */
export function useRepoClient() {
  return <></>;
};

useRepoClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  repoClient: PropTypes.instanceOf(RepositoryApi),
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