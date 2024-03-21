/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyncOutlined } from '@ant-design/icons';
import React, { ReactNode, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

function Spin({ delay }: { delay: number }) {
  const [ready, setReady] = useState(!delay);

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const timer = setTimeout(() => {
      setReady(true);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  return <SyncOutlined spin />;
}

const DefaultFallback = (
  <Wrapper>
    <Spin delay={100} />
  </Wrapper>
);

const lazy: (
  factory: () => Promise<{
    default: React.ComponentType<any>;
  }>,
  fallback?: NonNullable<ReactNode> | null
) => any = (factory, fallback = DefaultFallback) => {
  const Factory = React.lazy(factory);

  // eslint-disable-next-line func-names
  return function (props: any) {
    return (
      <Suspense fallback={fallback}>
        <Factory {...props} />
      </Suspense>
    );
  };
};

export default lazy;
