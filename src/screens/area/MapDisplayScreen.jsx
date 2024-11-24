import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";

const markersData = [
  {
    id: 1,
    title: "Marker 1 // TEXT // TEXT",
    description: "Description for Marker 1",
    coordinates: { latitude: 36.7294737, longitude: 10.3166525 },
    image: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
  },
];

const MapDisplayScreen = ({}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };
  const openMapsApp = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentLocation?.coords?.latitude},${currentLocation?.coords?.longitude}&destination=${selectedMarker?.coordinates?.latitude},${selectedMarker?.coordinates?.longitude}&travelmode=driving`;
    //const appleMapsUrl = `http://maps.apple.com/?saddr=${startLat},${startLng}&daddr=${destLat},${destLng}`;

    const url = /*  Platform.OS === "ios" ? appleMapsUrl : */ googleMapsUrl;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Unsupported URL:", url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("Error opening maps:", err));
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 36.729475,
          longitude: 10.332659,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: currentLocation?.coords?.latitude,
          longitude: currentLocation?.coords?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {markersData.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinates}
            onPress={() => onMarkerPress(marker)}
            image={{ uri: marker?.image }}
          />
        ))}
      </MapView>

      {selectedMarker && (
        <View style={styles.floatingView}>
          <Text style={styles.title}>{selectedMarker.title}</Text>
          <Text style={styles.description}>{selectedMarker.description}</Text>
          <Button
            title="Get Itinerary"
            onPress={() => {
              openMapsApp();
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedMarker(null)}
          >
            <AntDesign name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingView: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "lightgrey",
    borderRadius: 20,
    padding: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MapDisplayScreen;
