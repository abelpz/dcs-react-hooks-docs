import useSWR from "swr";

import useUserClient from "@hooks/clients/useUserClient";

export default function useUser({ username, password }) {
  const userClient = useUserClient({ username, password });

  const fetchUser = () => {
    const user = userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error,
    mutate: setUser,
  } = useSWR( username && password ? { key: "fetchedUser", username, password } : null, fetchUser);

  return {
    actions: {
      setUser,
    },
    state: {
      user,
      isLoadig: !error && !user && !!username && !!password,
      isError: error,
    }
  };
}
