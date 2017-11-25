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
  Body
} from "native-base";
import { NavigationActions } from "react-navigation";
import { Item, Input, Spinner } from "native-base";

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      modalVisible: false
    };
  }
  componentWillMount() {
    this.props.actions.fetchUsers();
  }
  render() {
    const users = this.props.users;
    if (this.props.fetchedUsers == false) {
      return (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Spinner color="gray" />
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
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Details</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="md-share" />
              </Button>
              <Button transparent>
                <Icon name="heart" />
              </Button>
            </Right>
          </Header>
          <View style={styles.container}>
            {/* <Button
            color="#841584"
            title="Back"
            onPress={() => this.props.navigation.navigate("Home")}
          /> */}
            <ScrollView style={styles.subContainer}>
              <Image
                style={styles.img}
                source={{
                  uri: product.image
                  /* uri: "/Users/saurabhkumar/Sites/projects/olx-clone/image1.jpg" */
                }}
                onLoadStart={() => this.setState({ loading: true })}
                onLoadEnd={() => {
                  this.setState({ loading: false });
                }}
              >
                {this.state.loading && (
                  <Spinner
                    style={{
                      marginTop: Dimensions.get("window").height / 10
                    }}
                    color="gray"
                  />
                )}
              </Image>
              <Card style={styles.detailsCard}>
                <CardItem>
                  <Body>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.userName}>{users[0].name}</Text>
                      <Button
                        transparent
                        onPress={() =>
                          this.props.navigation.navigate("Profile", {
                            user: users[0]
                          })}
                      >
                        <Text>VIEW PROFILE</Text>
                      </Button>
                    </View>
                    <Text style={styles.addTime}>Ad posted at 10:19 am</Text>
                    <Text style={styles.price}>Rs {product.price}</Text>
                    <Text
                      style={{
                        fontSize: 14,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#d6d7da"
                      }}
                    >
                      {product.description}
                    </Text>
                    <Text style={styles.address}>
                      {users[0].address},BTM Layout,Bangalore
                    </Text>
                    <Text style={styles.description}>
                      Brand new Samsung galaxy S8 plus Black 4G LTE single sim
                      64gb with 4gb ram Snapdragon processor Us imported with
                      all accessories . No bill.Hence no warranty in india 100%
                      percent best quality than Indian version. PRICE IS FIX
                      Serious buyers can call
                    </Text>
                    <View style={styles.footer}>
                      <Button
                        transparent
                        style={{
                          alignSelf: "center"
                        }}
                      >
                        <Text>SHARE</Text>
                      </Button>
                      <Button transparent style={{ alignSelf: "center" }}>
                        <Text>REPORT</Text>
                      </Button>
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
)(ProductScreen);

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
  price: {
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 30
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
    // height: Dimensions.get("window").height / 2 + 50,
    marginTop: Dimensions.get("window").height / 50 - 5,
    marginRight: Dimensions.get("window").width / 50,
    paddingLeft: Dimensions.get("window").width / 50,
    paddingRight: Dimensions.get("window").width / 50 - 5
  }
});
