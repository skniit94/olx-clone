/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";
import { bindActionCreators } from "redux";
import * as productActions from "../actions/productActions";
import { connect } from "react-redux";
import ProductCard from "../components/productCard";
import Slider from "react-native-slider";

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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
const categories = [
  {
    name: "Kids"
  },
  {
    name: "Home"
  },
  {
    name: "Games"
  },
  {
    name: "Industrial"
  },
  {
    name: "Toys"
  },
  {
    name: "Clothing"
  },
  {
    name: "Computers"
  },
  {
    name: "Tools"
  },
  {
    name: "Automotive"
  },
  {
    name: "Outdoors"
  },
  {
    name: "Music"
  },
  {
    name: "Sports"
  },
  {
    name: "Movies"
  },
  {
    name: "Jewelery"
  }
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: false,
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  toggle() {
    this.setState({
      showText: !this.state.showText
    });
  }
  renderlist() {
    const products = this.props.products;
    console.log("sdfsdfsdf", products);
    console.log(this.props.category);
    const filteredProducts = products.filter(item => {
      if (!this.props.category && !this.props.applyPriceFilter) return true;
      else if (this.props.category && !this.props.applyPriceFilter)
        return item.category == this.props.category;
      else if (!this.props.category && this.props.applyPriceFilter)
        return (
          Number(item.price) >= this.props.priceRange[0] &&
          Number(item.price) <= this.props.priceRange[1]
        );
      else
        return (
          item.category == this.props.category &&
          Number(item.price) >= this.props.priceRange[0] &&
          Number(item.price) <= this.props.priceRange[1]
        );
    });
    console.log(filteredProducts, "&*&**&*&");
    return (
      <FlatList
        data={filteredProducts}
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Product", {
                  product: item
                })}
            >
              <ProductCard product={item} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  }

  componentWillMount() {
    this.props.actions.fetchProducts();
  }

  render() {
    // const { state } = this.props.navigation;
    console.log("render //////");
    console.log(this.props);
    return (
      <View>
        {/* <Button
          color="#841584"
          title="Back"
          onPress={() => this.props.navigation.navigate("Login")}
        /> */}
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.setModalVisible(true);
              }}
            >
              <Icon name="funnel" />
            </Button>
          </Right>
        </Header>
        <View>{this.renderlist()}</View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Filters</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Apply</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.modalContent}>
            <Text style={styles.setPrice}>Set a price range</Text>
            <MultiSlider
              style={styles.mulitSlider}
              values={[this.props.priceRange[0], this.props.priceRange[1]]}
              values={[20, 500]}
              sliderLength={Dimensions.get("window").width - 20}
              containerStyle={{
                height: Dimensions.get("window").height / 40 + 5
              }}
              onValuesChange={values => {
                this.props.actions.setPriceRange(values);
              }}
              onValuesChangeStart={() => {
                this.props.actions.togglePriceFilter(true);
              }}
              /* onValuesChangeFinish={this.multiSliderOneValuesChangeFinish} */
              min={0}
              max={1000}
              step={1}
              snapped
            />
            <Text style={styles.from}>From: Rs {this.props.priceRange[0]}</Text>
            <Text style={styles.to}>To: Rs {this.props.priceRange[1]}</Text>
            <Text style={styles.chooseCategory}>Choose Category</Text>
            <View style={styles.categoryCard}>
              <FlatList
                data={categories}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
                renderItem={({ item }) => (
                  <View>
                    <Button
                      transparent
                      onPress={() => {
                        this.props.actions.setCategory(item.name);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </Button>
                  </View>
                )}
              />
            </View>
            <Footer>
              <FooterTab>
                <Button
                  full
                  onPress={() => {
                    this.props.actions.togglePriceFilter(false);
                    this.props.actions.setCategory("");
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Clear Filter</Text>
                </Button>
              </FooterTab>
            </Footer>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(
  state => ({
    products: state.products.products,
    fetchingProducts: state.products.fetchingProducts,
    fetchedProducts: state.products.fetchedProducts,
    error: state.products.error,
    category: state.products.category,
    applyPriceFilter: state.products.applyPriceFilter,
    priceRange: state.products.priceRange
  }),
  dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
  })
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: "column",
    // alignItems: "center",
    // backgroundColor: "#FFFFFF",
    marginTop: Dimensions.get("window").height / 10
  },
  modalContent: {
    marginLeft: Dimensions.get("window").width / 40,
    marginRight: Dimensions.get("window").width / 40
  },
  categoryCard: {
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  multiSlider: {
    // marginTop: Dimensions.get("window").height / 20
  },
  chooseCategory: {
    fontSize: 18,
    marginTop: Dimensions.get("window").height / 10,
    marginBottom: Dimensions.get("window").height / 40 - 5
  },
  setPrice: {
    fontSize: 18,
    marginTop: Dimensions.get("window").height / 40 + 15,
    marginBottom: Dimensions.get("window").height / 40 + 5
  },
  from: {
    // marginTop: Dimensions.get("window").height / 40 + 15
  },
  to: {
    // marginTop: Dimensions.get("window ").height / 30 + 15
  }
});
