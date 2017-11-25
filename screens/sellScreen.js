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
  Input,
  Spinner
} from "native-base";
import { NavigationActions } from "react-navigation";
import { ImagePicker } from "expo";
import b64 from "base64-js";
import * as firebase from "firebase";

const uploadImage = result => {
  return new Promise((resolve, reject) => {
    const byteArray = b64.toByteArray(result.base64);
    const metadata = { contentType: "image/jpg" };
    const sessionId = new Date().getTime();
    const storage = firebase.storage();
    const imageRef = storage.ref("images").child(`${sessionId}`);
    imageRef
      .put(byteArray, metadata)
      .then(snapshot => {
        console.log("uploaded image!");
      })
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default class SellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      itemPrice: "",
      itemCategory: "",
      imageUrl: null,
      downloadUrl: null,
      imageLoading: false,
      imageObj: null
    };
    this.itemsRef = firebase.database().ref();
  }

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    console.log("result", result);
    if (result["cancelled"]) {
      this.setState({ imageLoading: false });
    } else {
      this.setState({ imageUrl: result["uri"], imageObj: result });
    }
  };

  _addItem() {
    if (this.state.imageObj) {
      if (
        this.state.itemName &&
        this.state.itemCategory &&
        this.state.itemPrice
      ) {
        uploadImage(this.state.imageObj)
          .then(url => {
            console.log("url", url);
            this.setState({ downloadUrl: url });
            const user = firebase.auth().currentUser;

            firebase
              .database()
              .ref("/ads")
              .push({
                postedBy: user["email"],
                description: this.state.itemName,
                price: this.state.itemPrice,
                category: this.state.itemCategory,
                image: this.state.imageUrl
              });
          })
          .then(() => {
            alert("Ad successfully posted");
          })
          .catch(error => console.log(error));
      } else {
        alert("please fill all the details");
      }
    } else {
      alert("please select an image");
    }
  }

  showImage() {
    if (this.state.imageUrl) {
      return (
        <Image
          source={{ uri: this.state.imageUrl }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      );
    } else if (this.state.imageLoading) {
      return <Spinner color="gray" />;
    }
  }

  render() {
    const user = firebase.auth().currentUser;
    console.log("current user ", user["email"]);
    console.log("render:url", this.state.imageUrl);
    console.log("itemName: ", this.state.itemName);
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
            <Title>Sell</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.signup}>
          {this.showImage()}
          {/* {this.state.imageUrl && (
            <Image
              source={{ uri: this.state.imageUrl }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          )} */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%"
            }}
          >
            <Button
              info
              style={{
                alignSelf: "center",
                marginBottom: Dimensions.get("window").height / 40 + 15
              }}
              onPress={() => {}}
            >
              <Icon name="camera" />
            </Button>
            <Button
              info
              style={{
                alignSelf: "center",
                marginBottom: Dimensions.get("window").height / 40 + 15
              }}
              onPress={() => {
                this.setState({ imageLoading: true });
                this._pickImage();
              }}
            >
              <Icon name="images" />
            </Button>
          </View>
          <Item style={{ marginBottom: 10 }}>
            <Input
              placeholder="Set Name"
              onChangeText={text => this.setState({ itemName: text })}
            />
          </Item>
          <Item style={{ marginBottom: 10 }}>
            <Input
              placeholder="Set Category"
              onChangeText={text => this.setState({ itemCategory: text })}
            />
          </Item>
          <Item style={{ marginBottom: 10 }}>
            <Input
              placeholder="Set Price"
              onChangeText={text => this.setState({ itemPrice: text })}
            />
          </Item>
          <Button
            info
            style={{
              alignSelf: "center",
              marginBottom: Dimensions.get("window").height / 40 + 15
            }}
            /* onPress={this._addItem} */
            onPress={() => this._addItem()}
          >
            <Text>Post Ad</Text>
          </Button>
        </View>
      </View>
    );
  }
}

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
