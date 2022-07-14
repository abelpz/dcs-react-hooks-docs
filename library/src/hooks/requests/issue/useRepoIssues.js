import { useState } from "react";
import useSWR from "swr";

import useIssuesApi from "@hooks/clients/useIssueClient";

function useRepoIssues({
  resource,
  token,
  args = {},
  paged = false,
}) {
  const issuesClient = useIssuesClient({ token });
  const [isLoading, setIsLoading] = useState(false);

  function fetcher(owner, repo, defaultPage) {
    const {
      state,
      labels,
      q,
      type,
      milestones,
      since,
      before,
      createdBy,
      assignedBy,
      mentionedBy,
      limit,
      options,
    } = args;

    const page = defaultPage ?? args.page;
    const issues = issuesClient
      .issueListIssues(
        owner,
        repo,
        state,
        labels,
        q,
        type,
        milestones,
        since,
        before,
        createdBy,
        assignedBy,
        mentionedBy,
        page,
        limit,
        options
      )
      .then(({ data }) => data)
      .catch((reason) => console.error(reason));

    return issues;
  }

  function paginated_fetch(owner, repo, page = 1, previousResponse = []) {
    return fetcher(owner, repo, page).then((newResponse) => {
      const response = [...previousResponse, ...newResponse]; // Combine the two arrays

      if (newResponse.length !== 0) {
        page++;

        return paginated_fetch(owner, repo, page, response);
      }

      return response;
    });
  }

  const { data, error, mutate } = useSWR(
    !!resource && [resource.owner.username, resource.name, paged],
    (owner, repo, paged) => {
      if (!paged) {
        return paginated_fetch(owner, repo);
      }
      return fetcher(owner, repo);
    }
  );

  const setIssue = ({ title, owner, repo, closed = false, body = "" }) => {
    const issueBody = {
      title,
      closed,
      body,
    };
    setIsLoading(true);
    const issue = issuesClient
      .issueCreateIssue(owner, repo, issueBody)
      .then(({ data }) => {
        setIsLoading(false);
        return data;
      })
      .catch((reason) => {
        console.error(reason);
        setIsLoading(false);
        return reason;
      });
    mutate();
    return issue;
  };

  return {
    setIssue,
    issues: data,
    isLoading: (!error && !data && !!resource && !!token) || isLoading,
    isError: error,
  };
}

export default useRepoIssues;
