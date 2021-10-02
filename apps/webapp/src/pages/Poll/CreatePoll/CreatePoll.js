import React from 'react';
import { useHistory } from 'react-router-dom';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import { gql, useMutation } from '@apollo/client';
import PollForm from '@react-ssrex/ui/build/PollForm';

const CREATE_POLL_M = gql`
mutation ($input: CreatePollInput!) {
  createPoll(input: $input) {
    created
    poll {
      id
      userId
      subject
      options {
        id
        text
        voters
        votersCount
      }
      votersCount
    }
    error
  }
}
`;

export default function CreatePoll() {
  const history = useHistory();
  const [createPoll] = useMutation(CREATE_POLL_M);
  const handleSubmit = (input) => {
    createPoll({
      variables: { input },
    }).then(({ data }) => {
      if (data.createPoll.created) {
        return history.push(`/poll/view-${data.createPoll.poll.id}`);
      }
      return console.log(data.createPoll.error);
    }).catch(console.log);
  };
  return (
    <LayoutPage decorate>
      <PollForm onSubmit={handleSubmit} />
    </LayoutPage>
  );
}
