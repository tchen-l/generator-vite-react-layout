import { Button, Result } from 'antd';
import { useRouteError } from 'react-router-dom';

export default function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Click here to reload the app
          </Button>
          <pre>{error.message || JSON.stringify(error)}</pre>
        </>
      }
    />
  );
}
