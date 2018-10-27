import {useState, useEffect} from './react';
import {on, off} from './util';

export interface OrientationState {
  angle: number;
  type: string;
}

const defaultState: OrientationState = {
  angle: 0,
  type: 'landscape-primary'
};

const useOrientation = (initialState: OrientationState = defaultState) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let mounted = true;

    const onChange = () => {
      if (mounted) {
        const {orientation} = screen as any;
        
        if (!orientation) {
          setState(initialState);
        }
        
        const {angle, type} = orientation;
        setState({angle, type});
      }
    };

    on(window, 'orientationchange', onChange);
    onChange();

    return () => {
      mounted = false;
      off(window, 'orientationchange', onChange);
    };
  }, [0]);

  return state;
};

export default useOrientation;
