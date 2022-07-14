import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable'
import { useUserClient } from "@hooks/clients/useUserClient";

export function useAuthentication({tokenName, username, password, userClient, options, configuration, axios}) {
  const _userClient = useUserClient({ userClient, username, password, ...configuration, axios});

  //Fetch function to get token and delete old ones
  const fetchAuth = async (username) => {

    if (!username || !password || !tokenName) throw new Error("missing tokenName, username or password");

    const allTokens = await _userClient
      .userGetTokens(username)
      .then(({ data }) => data);
    const appTokens = allTokens?.filter((item) => item.name === tokenName);

    if (appTokens?.length > 0) {
      appTokens.forEach((token) => {
        _userClient
          .userDeleteAccessToken(username, token.id)
          .then(({ data }) => data);
      });
    }

    const newToken = await _userClient
      .userCreateToken(username, { name: tokenName })
      .then((res) => res.data);

    if (newToken) {
      return newToken;
    }
  };

  const {
    data: token,
    error,
    mutate: setAuth,
  } = useSWRImmutable("fetchAuth", fetchAuth, options);

  //Fetch function to get user data
  const fetchUser = () => {
    if (!username) throw new Error("missing username");
    const user = _userClient.userGetCurrent().then(({ data }) => data);
    return user;
  };

  const {
    data: user,
    error: errorUser,
    mutate: setUser,
  } = useSWRImmutable(
    "fetchUser",
    fetchUser,
    options
  );

  useEffect(() => {
    if (username) setUser()
  },[username,setUser]);

  useEffect(() => {
    if (username && password && tokenName) {
      setAuth()
    }
  },[username,password,tokenName,setAuth])

  return {
    state: {
      token,
      user,
      isLoading: !error && !token && !!username && !!password,
      isError: {...error, ...errorUser},
    },
    actions: {
      setUser,
      setAuth
    }
  };
}
