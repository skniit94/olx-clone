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

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { emailId: "", password: "", confPassword: "" };
  }

  render() {
    return (
      <View>
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
          <Item rounded style={{ marginBottom: 10 }}>
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
                this.props.actions.addUsers(
                  this.state.emailId,
                  this.state.password
                );
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
    marginTop: Dimensions.get("window").height / 40 + 15,
    backgroundColor: "transparent"
  }
});
