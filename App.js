import React from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, Dimensions, Button, Alert, Image, } from 'react-native';
import { Marker } from 'react-native-maps';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCKliWBWjiYAHRCsVnTN9yfjjBflaZxZF0",
  authDomain: "seguro-auto.firebaseapp.com",
  databaseURL: "https://seguro-auto.firebaseio.com",
  projectId: "seguro-auto",
  storageBucket: "seguro-auto.appspot.com",
  messagingSenderId: "25273210229"
};

firebase.initializeApp(firebaseConfig);


class MapScreen extends React.Component {

  constructor() {
    super();

/// Remove yellowboxtimer
    console.ignoredYellowBox = [
      'Setting a timer'
      ];
/// Remove yellowboxtimer end
      
    this.state = {
      showRoubos: false,
      showEnchente: false,
      showBatida: false,
      markersRoubos: [
        {
          UID: 0,
          latlng: {
            latitude: -22.907230,
            longitude: -43.173115,
          },
          title: 'Roubo',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.911055,
            longitude: -43.171873,
          },
          title: 'Roubo',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.906884,
            longitude: -43.178201,
          },
          title: 'Roubo',
          description: '',
        },

      ],
      markersEnchente: [
        {
          UID: 0,
          latlng: {
            latitude: -22.908896,
            longitude: -43.179077,
          },
          title: 'Enchente',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.911451,
            longitude: -43.168206,
          },
          title: 'Enchente',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.905672,
            longitude: -43.176076,
          },
          title: 'Enchente',
          description: '',
        },
      ],
      markersBatida: [
        {
          UID: 0,
          latlng: {
            latitude: -22.903940,
            longitude: -43.172722,
          },
          title: 'Batida',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.912833,
            longitude: -43.174856,
          },
          title: 'Batida',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.909637,
            longitude: -43.176583,
          },
          title: 'Batida',
          description: '',
        },
      ],
      mapRegion: null,
      location: null,
      errorMessage: null,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Opa, isto não vai funcionar no emulador.Tente em um aplocativo!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
    this.onMarkerCoords();
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'permitido') {
      this.setState({
        errorMessage: 'permissão para acessar localização negada!',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0822, longitudeDelta: 0.0721 } });
  };

  onMarkerCoords() {
    firebase.database().ref().on('child_added', (snapshot) => {
      //console.log(snapshot.val());
      //console.log(snapshot);
    });
  }

  changeRouboView() {
    console.log('changing roubo view to: ' + !this.state.showRoubos);
    this.setState({
      showRoubos: !this.state.showRoubos,
      markersRoubos: (this.state.showRoubos) ? [
        {
          UID: 0,
          latlng: {
            latitude: -22.907230,
            longitude: -43.173115,
          },
          title: 'Roubo',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.911055,
            longitude: -43.171873,
          },
          title: 'Roubo',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.906884,
            longitude: -43.178201,
          },
          title: 'Roubo',
          description: '',
        },

      ] : []
    })
  }

  changeEnchenteView() {
    console.log('changing enchente view to: ' + !this.state.showEnchente);
    this.setState({
      showEnchente: !this.state.showEnchente,
      markersEnchente: (this.state.showEnchente) ? [
        {
          UID: 0,
          latlng: {
            latitude: -22.908896,
            longitude: -43.179077,
          },
          title: 'Enchente',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.911451,
            longitude: -43.168206,
          },
          title: 'Enchente',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.905672,
            longitude: -43.176076,
          },
          title: 'Enchente',
          description: '',
        },
      ] : []
    })
  }

  changeBatidaView() {
    console.log('changing batida view to: ' + !this.state.showBatida);
    this.setState({
      showBatida: !this.state.showBatida,
      markersBatida: (this.state.showBatida) ? [
        {
          UID: 0,
          latlng: {
            latitude: -22.903940,
            longitude: -43.172722,
          },
          title: 'Batida',
          description: '',
        },

        {
          UID: 1,
          latlng: {
            latitude: -22.912833,
            longitude: -43.174856,
          },
          title: 'Batida',
          description: '',
        },

        {
          UID: 2,
          latlng: {
            latitude: -22.909637,
            longitude: -43.176583,
          },
          title: 'Batida',
          description: '',
        },
      ] : []
    })
  }

  render() {
    return (
      ////mapa
      <View style={styles.overallViewContainer}>
        <MapView
          style={styles.container}
          showsUserLocation={true}
          enableHighAccuracy={true}
          region={this.state.region}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          {this.state.markersRoubos.map(marker => (
            <Marker
              key={marker.UID}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('./src/img/m3.png')}
            />
          ))}

          {this.state.markersEnchente.map(marker => (
            <Marker
              key={marker.UID}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('./src/img/m1.png')}
            />
          ))}

          {this.state.markersBatida.map(marker => (
            <Marker
              key={marker.UID}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={require('./src/img/m2.png')}
            />
          ))}

          <MapView.Marker
            coordinate={{ latitude: -22.9097169, longitude: -43.1689707 }}
            title={"MJV"}
            description={"Technology & Innovation"}
            image={require('./src/img/mjv.png')}

          />

        </MapView>
        <View style={styles.search}>
          <View style={styles.inputContainer}>
            <TextInput underlineColorAndroid="transparent"
              placeholder="Where to?"
              style={styles.input}
            />
          </View>
        </View>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#CC092f"
            title="Furtos"
            onPress={() => this.changeRouboView()}>
            <Ionicons name="ios-eye-off-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#00539f"
            title="Alagamentos"
            onPress={() => this.changeEnchenteView()}>
            <Ionicons
              name="ios-analytics-outline"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#d8aa00"
            title="Colisões"
            onPress={() => { this.changeBatidaView(); }}>
            <Ionicons name="ios-alert-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

class PerfilScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: '100%', height: '100%' }} source={require('./perfil.png')} />
      </View>
    );
  }
}

export default TabNavigator(
  {
    Mapa: { screen: MapScreen },
    Perfil: { screen: PerfilScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Mapa') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'Perfil') {
          iconName = `ios-contacts${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);


const styles = StyleSheet.create({
  overallViewContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  input: {
    elevation: 1,
    width: '99%',
    paddingRight: 'auto',
    paddingBottom: 'auto',
    paddingLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  search: {
    alignItems: 'center',
    height: '10%',
    width: '100%'
  },
  inputContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '55%',
    top: 40,
    borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 }
  },
  button0: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#cc092f',
    width: '24%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: '#cc092f',
    position: 'absolute',
    bottom: 0,
    left: '25%',
    width: '25%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    position: 'absolute',
    bottom: 0,
    right: '25%',
    backgroundColor: '#cc092f',
    width: '25%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button3: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#cc092f',
    width: '25%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,

  },

});