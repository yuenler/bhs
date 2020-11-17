import React from 'react';
import * as DocumentPicker from 'expo-document-picker';

// this doesn't work yet, since the render function returns nothing - don't use it please
export default class ScheduleReader extends React.Component {
  state = { file: null };

  render() {
    DocumentPicker.getDocumentAsync({ type: 'image', multiple: false })
      .then(res => {
        
      })
  }
}