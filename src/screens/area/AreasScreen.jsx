import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import MapView, {
  AnimatedRegion,
  MarkerAnimated,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View } from "react-native";

const AreasScreen = ({}) => {
  const [location, setLocation] = useState(null);
  const [coordinate, setCoordinate] = useState({
    latitude: 36.7294947,
    longitude: 10.3167343,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(text);
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 36.7294947,
          longitude: 10.3167343,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default AreasScreen;
