import React from 'react';
import PropTypes from 'prop-types';
import { NotificationApi } from 'dcs-js';
import { AxiosInstance } from "axios";

/**
 * Uses NotificationApi from dcs-js.
 */
export function useNotifClient() {
  return <></>;
};

useNotifClient.propTypes = {
  test: PropTypes.string,
  token: PropTypes.string,
  basePath: PropTypes.string,
  notifClient: PropTypes.instanceOf(NotificationApi),
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