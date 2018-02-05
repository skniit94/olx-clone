import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Dimensions
} from "react-native";
import * as Expo from "expo";
import { Item, Input } from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailId: "", password: "" };
  }
  async login(email, pass) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);

      console.log("Logged In!");
      this.props.navigation.navigate("Home");
    } catch (error) {
      console.log(error.toString());
      alert("Incorrect Email or Password");
    }
  }
  authenticateUser() {
    const obj = { username: this.state.emailId, password: this.state.password };
    console.log(obj);
    mail = this.state.emailId;
    pass = this.state.password;
    findUser = function (user) {
      return user.username === this.mail && user.password === this.pass;
    };
    console.log("before", this.props.users);
    if (this.props.users.find(findUser)) this.props.navigation.navigate("Home");
    else alert("Incorrect Email or Password");
  }
  componentWillMount() {
    console.log("firebase.auth().currentUser", firebase.auth().currentUser);
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate("Home");
    }
  }
  render() {
    // console.log("before", this.props.users);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Text style={{ fontSize: 60 }}> OLX </Text> */}
          <Image
            style={{
              height: Dimensions.get("window").height / 5,
              width: Dimensions.get("window").width / 3
              // marginTop: 2
              // marginBottom: Dimensions.get("window").height / 40 + 5
            }}
            source={{
              uri: "/Users/saurabhkumar/Sites/projects/images/olx-clone/olx.jpg"
            }}
          />
          <Text>To start buying and selling </Text>
        </View>
        <View style={styles.login}>
          <Item rounded style={{ marginBottom: 10 }}>
            <Input
              placeholder="EmailId"
              onChangeText={text => this.setState({ emailId: text })}
            />
          </Item>
          <Item rounded style={{ marginBottom: 10 }}>
            <Input
              secureTextEntry="true"
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
          <Button
            color="#841584"
            title="LOGIN"
            style={styles.loginButton}
            onPress={() => {
              {
                /* this.authenticateUser(); */
              }
              this.login(this.state.emailId, this.state.password);
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 11,
            backgroundColor: "transparent",
            color: "white"
          }}
        >
          By continuing, you agree to our Terms and Conditions
        </Text>
        <View style={styles.header}>
          <Text
            style={{
              color: "white"
            }}
          >
            Don't have an account?
          </Text>
          <Button
            color="#841584"
            title="SIGNUP"
            style={styles.loginButton}
            onPress={() => {
              this.props.navigation.navigate("Signup");
            }}
          />
        </View>
        <Image
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: -1
          }}
          source={{
            uri:
            "/Users/saurabhkumar/Sites/projects/olx-clone/images/image1.jpg"
          }}
        />
      </View>
    );
  }
}
export default connect(
  state => ({
    users: state.LoginData.users,
    loginStatus: state.LoginData.loginStatus
  }),
  dispatch => ({
    actions: bindActionCreators(loginActions, dispatch)
  })
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%"
  },
  header: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 10,
    marginBottom: 80,
    backgroundColor: "transparent"
    // borderWidth: 10
  },
  login: {
    alignSelf: "stretch",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "transparent"
  },
  loginButton: {
    alignSelf: "center",
    marginBottom: 45,
    borderColor: "#FAF9FA",
    borderWidth: 100
  },
  input1: {
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "gray",
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
