import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content, List, Text, Header, Body, Title } from 'native-base';

import NewsList from './src/component/newsList';
import NewsModal from './src/component/newsModal';

import { getArticles } from './src/api/newsApi';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {}
    }
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  }

  componentDidMount() {
    this.getArticlesData();
  }
  getArticlesData(){
    getArticles()
    .then((res) => {
      this.setState({
        isLoading: false,
        data: res
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  render() {
    console.log(this.state.data);

    let view = this.state.isLoading ? (
      <View style={styles.loadingView}>
        <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
        <Text style={{marginTop: 10}} children="Please Wait.." />
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={(item) => {
            return (
              <NewsList onPress={this.handleItemDataOnPress} data={item} />
            )
        }} />
    )

    return (
      <Container>
        <Header>
          <Body style={styles.headerBody}>
            <Title style={styles.headerTitle}>Daily NEWS</Title>
          </Body>
        </Header>
        <Content>
          {view}
        </Content>
        <NewsModal 
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  headerBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 22
  },
  loadingView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 300
  }
})