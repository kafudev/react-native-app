import React from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {FlashList} from '@shopify/flash-list';

let DATA = [];
for (let index = 0; index < 1000; index++) {
  DATA.push({
    title: 'item --- ' + index,
  });
}

const App = () => {
  return (
    <FlashList
      data={DATA}
      renderItem={({item}) => {
        return (
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: '#fcc',
              marginTop: 2,
            }}>
            <Text>{item.title}</Text>
          </View>
        );
      }}
      estimatedItemSize={200}
    />
  );
};

export default App;
