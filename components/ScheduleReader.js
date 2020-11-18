import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from 'react-native';

export default class ScheduleReader extends React.Component {
  state = { file: null };

  _loadFile() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(res => {
      alert(res.base64);
    })
  }

  render() {
    return (
      <View>
        <Text onPress={this._loadFile}>Upload Schedule</Text>
      </View>
    )
  }
}