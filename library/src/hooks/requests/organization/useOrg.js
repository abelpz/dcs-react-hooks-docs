import useSwr from 'swr';
import { useOrgClient } from '@hooks/clients/useOrgClient';
import { useAuthentication } from '@hooks/user/useAuthentication';

export function useOrg({ organizationName, organizationClient, options, configuration, axios }) {
  const { state: { token } } = useAuthentication({});
  
  const _organizationClient = useOrgClient({organizationClient, token: token?.sha1, ...configuration, axios});

  const fetchOrg = () => {
    const organization = _organizationClient.orgGet(organizationName).then(({ data }) => data);
    return organization;
  }

  const { data: organization, error, mutate: setOrganization } = useSwr([organizationName], fetchOrg, options);

  return {
    state: {
      organization,
      error,
      isLoading: !error && !organization && !!organizationName,
    },
    actions: {
      setOrganization,
      getOrganizationClient: () => _organizationClient
    }
  }
};
