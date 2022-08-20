import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,Image} from 'react-native'
//import { MapView } from 'expo'
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Callout,Marker } from 'react-native-maps';
import { colors, parameters,mapStyle } from '../globals/styles';
import apiClient from '../Services/apiClient'
import React ,{useEffect,useState,useLayoutEffect}from 'react'
import * as Location from 'expo-location';

const Map = () => {
  const [locations,setlocations]=useState([])
  const [position, setPosition] = useState(
    {
      "accuracy": 11.454999923706055,
      "altitude": -89.19999694824219,
      "altitudeAccuracy": 1.509387731552124,
      "heading": 270.5041198730469,
      "latitude": 6.93371,
      "longitude": 79.85548,
      "speed": 0.0023679917212575674,
    }
  );
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    apiClient.getToken().then(data => data).then(value => {
        if(value==""){
            navigation.navigate("Login")
        }else{
            apiClient.setToken(value)
        }
    })
    .catch(err => console.log(err))
  });

  useEffect(() => {
    async function getLocations() { 
      const {data,error}=await apiClient.loadStudentLocations()
      // console.log(data.result)
      setlocations(data.result)
    }
    getLocations();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location.coords);
    })();
  }, []);
  // async function getmylocation(){
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setPosition(location.coords);
  //   console.log(position)
  // }
  // useEffect(()=>{
  //   getmylocation()
  // },[])

    
  const origin = {latitude: position.latitude, longitude: position.longitude};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const GOOGLE_MAPS_APIKEY = '…';
    
  return (
    <View style={styles.container}>
  
        <MapView style={styles.map} 
          region={{
            latitude:position.latitude,
            longitude:position.longitude,
            latitudeDelta:0.007,
            longitudeDelta:0.008,
          }}
          showsUserLocation={true}
          customMapStyle={mapStyle}
          followsUserLocation={true}
        >
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={}
          /> */}
          {locations.map((data)=>{
            return <Marker 
            key={data.id}
            coordinate={{latitude:parseFloat(data.latitude),longitude:parseFloat(data.longitude)}} pinColor='green'
            >
              <Image style={{width:50,height:50,resizeMode:'contain'}} source={require('../../assets/images/studentmap.png')}/>
              <Callout><Text>Text data</Text></Callout>
              </Marker> }
            )}
            {/* <Marker  
            coordinate={{latitude:6.7896398,longitude:79.9255692}} pinColor='green'
            draggable={true}
            

            image={require('../../assets/images/schoolvanmap.png')}
            >
              <Callout><Text>Faalil's Palace</Text></Callout>
              </Marker>  */}
      </MapView>
      
      

    </View>
 
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})