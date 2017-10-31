/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  Image
} from "react-native";
import * as Expo from "expo";
import { Item, Input } from "native-base";
import { NavigationActions } from "react-navigation";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailId: "", password: "" };
  }

  authenticateUser() {
    const obj = { username: this.state.emailId, password: this.state.password };
    console.log(obj);
    mail = this.state.emailId;
    pass = this.state.password;
    findUser = function(user) {
      return user.username === this.mail && user.password === this.pass;
    };
    console.log("before", this.props.users);
    if (this.props.users.find(findUser)) this.props.navigation.navigate("Home");
    else alert("Incorrect Email or Password");
  }
  render() {
    // console.log("before", this.props.users);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 60 }}> OLX </Text>
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
              this.authenticateUser();
            }}
          />
        </View>
        <Text style={{ fontSize: 11 }}>
          By continuing, you agree to our Terms and Conditions
        </Text>
        <View style={styles.header}>
          <Text>Don't have an account?</Text>
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
            width: "100%",
            height: "100%",
            zIndex: -1
          }}
          source={{
            uri: "/Users/saurabhkumar/Sites/projects/olx-clone/image1.jpg"
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
    backgroundColor: "transparent"
  },
  header: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 100,
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
