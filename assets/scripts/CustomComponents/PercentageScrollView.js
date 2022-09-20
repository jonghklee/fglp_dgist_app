import React from 'react';
import {ScrollView, Text, View} from 'react-native';

const scrollPercentage = ({layoutMeasurement, contentOffset, contentSize}) => {
  return ((layoutMeasurement.height + contentOffset.y)/contentSize.height) * 100;
};

function PercentageScrollView({onReadPercentageChanged, contentContainerStyle, refreshControl, children}) {
  return <ScrollView
    contentContainerStyle={contentContainerStyle}
    refreshControl={refreshControl}
    onScroll={({nativeEvent}) => {
      onReadPercentageChanged(scrollPercentage(nativeEvent));
    }}
    scrollEventThrottle={400}
  >
    {children}
  </ScrollView>
}

export default PercentageScrollView;