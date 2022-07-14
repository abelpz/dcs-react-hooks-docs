import PropTypes from 'prop-types';
import { RepositoryApi } from 'dcs-js';
import { AxiosInstance } from "axios";
import { getApiConfig } from "@helpers/api";

export const useRepoClient = ({ token, basePath, repositoryClient, axios, configuration } = {}) => {
  if (repositoryClient instanceof RepositoryApi) return repositoryClient;
  const _configuration = getApiConfig({ token, ...configuration, basePath });
  return new RepositoryApi(_configuration, _configuration.basePath, axios);;
};

useRepoClient.propTypes = {
  token: PropTypes.string,
  basePath: PropTypes.string,
  repositoryClient: PropTypes.instanceOf(RepositoryApi),
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