import * as Expo from "expo";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import LoginScreen from "./screens/loginScreen";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import MyAdsScreen from "./screens/myAdsScreen";
import ProfileScreen from "./screens/profileScreen";
import SignupScreen from "./screens/signupScreen";
import SellScreen from "./screens/sellScreen";
import { Root } from "native-base";
import { Provider } from "react-redux";
import store from "./store";
import "regenerator-runtime/runtime";
import * as firebase from "firebase";
import config from "./firebaseConfig";

console.disableYellowBox = true;

firebase.initializeApp(config);

const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Product: { screen: ProductScreen },
    Profile: { screen: ProfileScreen },
    Signup: { screen: SignupScreen },
    Sell: { screen: SellScreen },
    MyAds: { screen: MyAdsScreen }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <Expo.AppLoading />;
    } else
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
  }
}
