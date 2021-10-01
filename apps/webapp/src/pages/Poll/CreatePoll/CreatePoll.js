import React from 'react';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import { gql, useMutation } from '@apollo/client';
import PollForm from './PollForm';

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
  const [createPoll] = useMutation(CREATE_POLL_M);
  const handleSubmit = (input) => {
    createPoll({
      variables: { input },
    }).then(console.log).catch(console.log);
  };
  return (
    <LayoutPage decorate>
      <PollForm onSubmit={handleSubmit} />
    </LayoutPage>
  );
}
