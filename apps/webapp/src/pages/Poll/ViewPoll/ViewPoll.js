import React from 'react';
import { useParams } from 'react-router-dom';
import LayoutPage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { gql, useQuery } from '@apollo/client';

const GET_POLL_Q = gql`
query ($pollId: String!) {
  getPoll(pollId: $pollId) {
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
}
`;

export default function ViewPoll() {
  const { pollId } = useParams();
  const { data, loading, error } = useQuery(GET_POLL_Q, {
    variables: { pollId },
  });

  if (loading) {
    return (<p>Loading</p>);
  }
  if (error) {
    return (<pre>{JSON.stringify(error, null, '*')}</pre>);
  }
  return (
    <LayoutPage decorate>
      <Card
        sx={{
          marginTop: (theme) => theme.spacing(3),
          marginBottom: (theme) => theme.spacing(3),
        }}
      >
        <CardHeader title={data.getPoll.subject} />
        <CardContent>
          <List>
            {data.getPoll.options.map((o) => (
              <ListItemButton
                selected={data.getPoll.myVote && data.getPoll.myVote.id === o.id}
                disabled={!!data.getPoll.myVote}
                key={o.id}
              >
                <Typography>{o.text}</Typography>
                {data.getPoll.myVote && (
                <Typography>
                  {o.votersCount}
                  /
                  {data.getPoll.votersCount}
                </Typography>
                )}
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
    </LayoutPage>
  );
}
