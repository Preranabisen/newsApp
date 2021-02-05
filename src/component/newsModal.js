import React, {Component} from 'react';
import {Dimensions, Modal, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Header,
  Content,
  Body,
  Right,
  Title,
  Button,
} from 'native-base';

const webViewHeight = Dimensions.get('window').height - 80;

class NewsModal extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose();
  };
  Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="#00f0ff" />
      <Text style={{marginTop: 10}} children="Please Wait.." />
    </View>
 );
  render() {
    const {showModal, articleData} = this.props;
    const {url} = articleData;
    return (
      <Modal
        animationType="none"
        transparent
        visible={showModal}
        onRequestClose={this.handleClose}>
        <Container style={{backgroundColor: '#fff'}}>
          <Header>
            <Body style={{flex: 2}}>
              <Title children={articleData.title} style={{color: 'white'}} />
            </Body>
            <Right style={{flex: 0.5}}>
              <Button onPress={this.handleClose} transparent>
                <Ionicon name="close-sharp" size={32} color="#fff"></Ionicon>
              </Button>
            </Right>
          </Header>
          <Content contentContainerStyle={{height: webViewHeight}}>
            <WebView
              source={{uri: url}}
              style={{flex: 1}}
              onError={this.handleClose}
              bounces={false}
              startInLoadingState={true}
              renderLoading={this.Spinner}
            />
          </Content>
        </Container>
      </Modal>
    );
  }
}
export default NewsModal;

const styles = StyleSheet.create({
    activityContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      }
  })