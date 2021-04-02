import React from 'react';
import PropTypes from 'prop-types';


function DefaultLoadingRender() {
  return (<div>Loading</div>)
}
function DefaultErrorRender(error) {
  return (<pre>{JSON.stringify(error, null, '\t')}</pre>)
}
export default function GqlResponse({
  loading,
  error,
  children,
  loadingRenderFn,
  errorRenderFn
}) {

  if(loading) {
    return loadingRenderFn();
  }
  if(error) {
    return errorRenderFn(error);
  }
  return children;
}


GqlResponse.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  loadingRenderFn: PropTypes.func,
  errorRenderFn: PropTypes.func,
}
GqlResponse.defaultProps = {
  loadingRenderFn: DefaultLoadingRender,
  errorRenderFn: DefaultErrorRender
}
