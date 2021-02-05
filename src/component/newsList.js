import React, {Component} from 'react';
import { ListItem, Left, Right, Thumbnail, Body, View, Text, Button } from 'native-base';
import { StyleSheet } from 'react-native';

class NewsList extends Component {

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    handlePress = () => {
      const {url, title} = this.data;
      this.props.onPress({url, title});
    }

    render() {
        return(
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: this.data.urlToImage}} />
              </Left>
              <Body>
                <Text numberOfLines={2} style={styles.newsTitle}>{this.data.title}</Text>
                <Text note numberOfLines={2}>{this.data.description}</Text>
                <Button transparent onPress={this.handlePress}>
                  <Text style={styles.readMoreText}>Read more</Text>
                </Button>
              </Body>
            </ListItem>
        );
    }
}

export default NewsList;

const styles = StyleSheet.create({
    readMoreText: {
        paddingLeft: 0,
        fontSize: 18
    },
    newsTitle: {
        fontSize: 20
    }
})