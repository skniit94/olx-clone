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
import MultiSlider from "@ptomasroos/react-native-multi-slider";
const categories = [
  {
    name: "Furniture"
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
    name: "Vehicle"
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
    name: "Electronics"
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
  async logout() {
    try {
      await firebase.auth().signOut();

      // Navigate to login view
    } catch (error) {
      console.log(error);
    }
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
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: "100%"
        }}
      >
        {/* <Button
          color="#841584"
          title="Back"
          onPress={() => this.props.navigation.navigate("Login")}
        /> */}
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                {
                  /* this.logout(); */
                }
                {
                  /* this.props.navigation.navigate("Login"); */
                }
                this.props.navigation.goBack();
              }}
            >
              <Icon name="log-out" />
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
        <View style={{ flex: 1 }}>{this.renderlist()}</View>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="chatboxes" />
              <Text>Chats</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                this.props.navigation.navigate("Sell");
              }}
            >
              <Icon name="camera" />
              <Text>Sell</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                this.props.navigation.navigate("MyAds");
              }}
            >
              <Icon name="albums" />
              <Text>My Ads</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
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
              /*values={[20, 500]}*/
              sliderLength={Dimensions.get("window").width - 20}
              containerStyle={{
                height: Dimensions.get("window").height / 40 + 5
              }}
              /* onValuesChange={values => {
                this.props.actions.setPriceRange(values);
              }} */
              onValuesChangeStart={() => {
                this.props.actions.togglePriceFilter(true);
              }}
              onValuesChangeFinish={values => {
                this.props.actions.setPriceRange(values);
              }}
              min={0}
              max={100000}
              step={1}
              snapped
            />
            <Text style={styles.from}>From: Rs {this.props.priceRange[0]}</Text>
            <Text style={styles.to}>To: Rs {this.props.priceRange[1]}</Text>
            <Text style={styles.chooseCategory}>Choose Category</Text>
            <View style={styles.categoryCard}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  borderWidth: 1
                }}
              >
                {/* {categories.map(item => {
                  return (
                    <Button
                      transparent
                      onPress={() => {
                        this.props.actions.setCategory(item.name);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </Button>
                  );
                })} */}
                {/* <Text>abc123</Text> */}
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Furniture");
                  }}
                >
                  <Text>Furniture</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Electronics");
                  }}
                >
                  <Text>Electronics</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Vehicle");
                  }}
                >
                  <Text>Vehicle</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Home");
                  }}
                >
                  <Text>Home</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Music");
                  }}
                >
                  <Text>Music</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Games");
                  }}
                >
                  <Text>Games</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Jewelery");
                  }}
                >
                  <Text>Jewelery</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Kids");
                  }}
                >
                  <Text>Kids</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Computers");
                  }}
                >
                  <Text>Computers</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Kitchen");
                  }}
                >
                  <Text>Kitchen</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.props.actions.setCategory("Clothing");
                  }}
                >
                  <Text>Clothing</Text>
                </Button>
              </View>
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
