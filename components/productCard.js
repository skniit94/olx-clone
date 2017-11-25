/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicatorIOS
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Item, Input, Spinner } from "native-base";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  render() {
    return (
      <View style={styles.ProductCard}>
        <Image
          style={styles.img}
          source={{ uri: this.props.product.image }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => {
            this.setState({ loading: false });
          }}
        >
          {this.state.loading && (
            <Spinner
              style={{
                marginTop: Dimensions.get("window").height / 6
              }}
              color="gray"
            />
          )}
        </Image>
        <Text>Rs {this.props.product.price}</Text>
        <Text>{this.props.product.description}</Text>
        <Text>{this.props.product.category}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ProductCard: {
    borderWidth: 0.5,
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "space-around",
    // alignItems: 'center',
    borderColor: "#d6d7da",
    margin: 10,
    // paddingRight: Dimensions.get("window").width / 40,
    paddingLeft: Dimensions.get("window").width / 40 - 5,
    width: Dimensions.get("window").width / 2 - 20,
    height: Dimensions.get("window").height / 2
  },
  img: {
    // justifyContent: "center",
    height: Dimensions.get("window").height / 2 - 80,
    width: Dimensions.get("window").width / 2 - 30
  },
  name: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20
  }
});
