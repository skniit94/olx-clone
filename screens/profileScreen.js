/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
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
  Icon,
  Text,
  Card,
  CardItem,
  Body,
  Thumbnail
} from "native-base";
import { NavigationActions } from "react-navigation";
import { Item, Input } from "native-base";

class ProfileScreen extends Component {
  componentWillMount() {
    this.props.actions.fetchUsers();
  }
  render() {
    const users = this.props.users;
    if (this.props.fetchedUsers == false) {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      );
    } else {
      const { product } = this.props.navigation.state.params;
      return (
        <View>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Profile</Title>
            </Body>
            <Right />
          </Header>
          <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
              <Card style={styles.detailsCard}>
                <CardItem>
                  <Body>
                    <Thumbnail
                      large
                      source={{ uri: users[0].image }}
                      style={{ alignSelf: "center" }}
                    />
                    <Text style={styles.name}>{users[0].name}</Text>
                    <Text style={styles.username}>{users[0].username}</Text>
                    <Text style={styles.email}>{users[0].email}</Text>
                    <Text style={styles.address}>
                      {users[0].address}, BTM Layout, Bangalore
                    </Text>
                    <Text style={styles.address}>Verified With</Text>
                    <View
                      style={{
                        width: Dimensions.get("window").width / 3 + 20,
                        marginTop: Dimensions.get("window").height / 50,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignSelf: "center"
                      }}
                    >
                      <Thumbnail
                        square
                        small
                        source={{
                          uri:
                            "/Users/saurabhkumar/Sites/projects/olx-clone/phone.png"
                        }}
                      />
                      <Thumbnail
                        square
                        small
                        source={{
                          uri:
                            "/Users/saurabhkumar/Sites/projects/olx-clone/msg.jpg"
                        }}
                      />
                      <Thumbnail
                        square
                        small
                        source={{
                          uri:
                            "/Users/saurabhkumar/Sites/projects/olx-clone/fb.png"
                        }}
                      />
                    </View>
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

export default connect(
  state => ({
    users: state.users.users,
    fetchingUsers: state.users.fetchingUsers,
    fetchedUsers: state.users.fetchedUsers,
    error: state.users.error
  }),
  dispatch => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: Dimensions.get("window").height / 40 - 5
  },
  profileButton: {
    marginLeft: Dimensions.get("window").width / 50,
    marginTop: Dimensions.get("window").height / 50,
    fontSize: 14
  },
  addTime: {
    backgroundColor: "transparent",
    fontSize: 10,
    marginTop: -Dimensions.get("window").height / 80,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  address: {
    marginTop: Dimensions.get("window").height / 30
  },
  description: {
    marginTop: Dimensions.get("window").height / 30
  },
  name: {
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  userName: {
    fontSize: 17,
    marginTop: Dimensions.get("window").height / 50 - 5
  },
  subContainer: {
    // justifyContent: "space-around",
    zIndex: 1,
    // borderWidth: 0.5,
    backgroundColor: "#FFFFFF",
    paddingLeft: Dimensions.get("window").width / 40 - 5,
    width: Dimensions.get("window").width - 20,
    height: Dimensions.get("window").height - 20
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  img: {
    // justifyContent: "center",
    height: Dimensions.get("window").height / 3 - 50,
    width: Dimensions.get("window").width - 30
  },
  detailsCard: {
    // borderWidth: 0.5,
    // borderColor: "black",
    // borderRadius: 10,
    height: Dimensions.get("window").height - 115,
    marginTop: Dimensions.get("window").height / 50 - 5,
    marginRight: Dimensions.get("window").width / 50,
    paddingLeft: Dimensions.get("window").width / 50,
    paddingRight: Dimensions.get("window").width / 50 - 5
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5
  },
  username: {
    fontSize: 10,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  email: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  },
  address: {
    fontSize: 14,
    marginTop: Dimensions.get("window").height / 30,
    alignSelf: "center"
  }
});
