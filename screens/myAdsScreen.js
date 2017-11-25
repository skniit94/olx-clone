/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";
import { bindActionCreators } from "redux";
import * as adActions from "../actions/adActions";
import { connect } from "react-redux";
import ProductCard from "../components/productCard";
import Slider from "react-native-slider";
import * as firebase from "firebase";

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Modal
} from "react-native";
import { NavigationActions } from "react-navigation";
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
  Text
} from "native-base";

class MyAdsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderlist() {
    if (this.props.ads != null && this.props.ads != undefined) {
      const ads = Object.values(this.props.ads);
      console.log("sdfsdfsdf", ads);
      console.log(this.props.category);
      const user = firebase.auth().currentUser;
      const filteredAds = ads.filter(item => {
        return item.postedBy === user["email"];
        // return true;
      });
      console.log(filteredAds, "&*&**&*&");
      return (
        <FlatList
          data={filteredAds}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
              /* onPress={() =>
                this.props.navigation.navigate("Ad", {
                  ad: item
                })} */
              >
                <ProductCard product={item} />
              </TouchableOpacity>
            </View>
          )}
        />
      );
    } else {
      return <Text> No ads posted yet </Text>;
    }
  }

  componentWillMount() {
    this.props.actions.fetchAds();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%"
        }}
      >
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
            <Title>My Adds</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>{this.renderlist()}</View>
      </View>
    );
  }
}

export default connect(
  state => ({
    ads: state.ads.ads,
    fetchingAds: state.ads.fetchingAds,
    fetchedAds: state.ads.fetchedAds,
    error: state.ads.error
  }),
  dispatch => ({
    actions: bindActionCreators(adActions, dispatch)
  })
)(MyAdsScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    // backgroundColor: "#FFFFFF",
    marginTop: Dimensions.get("window").height / 10
  }
});
