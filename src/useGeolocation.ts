import {useState, useEffect} from 'react';

export interface GeoLocationSensorState {
  loading: boolean,
  accuracy: number,
  altitude: number,
  altitudeAccuracy: number,
  heading: number,
  latitude: number,
  longitude: number,
  speed: number,
  timestamp: number,
  error?: Error | PositionError
}

const useGeolocation = () => {
  const [state, setState] = useState({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  let mounted = true;
  let watchId: any;

  const onEvent = (event: any) => {
    if (mounted) {
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };
  const onEventError = (error: any) =>
    mounted && setState(oldState => ({...oldState, loading: false, error}));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError);
    watchId = navigator.geolocation.watchPosition(onEvent, onEventError);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, [0]);

  return state;
};

export default useGeolocation;
