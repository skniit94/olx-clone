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
  View,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import * as Expo from "expo";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Item,
  Input
} from "native-base";
import { NavigationActions } from "react-navigation";
import * as firebase from "firebase";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailId: "", password: "", confPassword: "" };
  }

  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);

      console.log("Account created");

      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      console.log(error.toString());
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%"
        }}
      >
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>SignUp</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.signup}>
          <Item style={{ marginBottom: 10 }}>
            <Input
              placeholder="EmailId"
              onChangeText={text => this.setState({ emailId: text })}
            />
          </Item>
          <Item style={{ marginBottom: 10 }}>
            <Input
              secureTextEntry="true"
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
            />
          </Item>
          <Item style={{ marginBottom: 10 }}>
            <Input
              secureTextEntry="true"
              placeholder="Confirm Password"
              onChangeText={text => this.setState({ confPassword: text })}
            />
          </Item>
          <Button
            info
            style={{ alignSelf: "center" }}
            onPress={() => {
              if (this.state.password != this.state.confPassword)
                alert("Passwords do not match");
              else {
                {
                  /* this.props.actions.addUsers(
                  this.state.emailId,
                  this.state.password
                ); */
                }
                this.signup(this.state.emailId, this.state.password);
                this.props.navigation.goBack();
              }
            }}
          >
            <Text>SignUp</Text>
          </Button>
        </View>
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
)(SignupScreen);

const styles = StyleSheet.create({
  signup: {
    alignSelf: "stretch",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: Dimensions.get("window").height / 40 + 15
    // backgroundColor: "#FFFFFF"
  }
});
