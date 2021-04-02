import React, { Suspense as ReactSuspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Suspense({ fallback, children, bypassServer }) {
  if (typeof window === 'undefined') {
    // React Suspense is not suported
    if (bypassServer) {
      return children;
    }

    return fallback;
  }
  return (
    <ReactSuspense fallback={fallback}>
      {children}
    </ReactSuspense>
)
}

Suspense.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  bypassServer: PropTypes.bool,
};

Suspense.defaultProps = {
  bypassServer: false,
};
