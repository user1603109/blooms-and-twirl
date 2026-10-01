import * as ReactTypes from 'react';

declare global {
  namespace React {
    type ReactNode = any;
    type FC<P = {}> = (props: P) => any;
    function useState<T>(init: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void];
    function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    function useMemo<T>(factory: () => T, deps?: any[]): T;
    function useRef<T>(initialValue?: T): { current: T };
    class Component<P = {}, S = {}> {
      constructor(props: P);
      state: S;
      props: P;
      setState(state: any, cb?: () => void): void;
      render(): any;
    }
  }

  namespace ReactDOM {
    function render(element: any, container: any): void;
    function createRoot(container: any): { render(element: any): void };
  }

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  const React: any;
  const ReactDOM: any;
}

export {};
