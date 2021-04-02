import React from 'react';

import ErrorPage from './ErrorPage';

export default function PageNotFound() {
  return (
    <ErrorPage code={404} title="Page Not Found">
      The page you are looking for is not found.
    </ErrorPage>
  );
}
