import { ErrorBoundary } from 'react-error-boundary';
function ErrorFallback({ error }) {
    return (<div role="alert" style={{ padding: 16 }}>
      <h4>Something went wrong:(</h4>

      <pre>{error.message}</pre>

      <details title="Error Stack">
        <summary>Error Stack</summary>
        <pre>{error.stack}</pre>
      </details>
    </div>);
}
export const BaseErrorBoundary = (props) => {
    return (<ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>);
};
