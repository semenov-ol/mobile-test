import * as React from 'react';
import { StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';
import { inject, observer } from 'mobx-react';

function TabOneScreen(props: { store: { text: string; updateText: any; data: any; searchImages: () => {} } }) {
  const { text, updateText } = props.store;

  return (
    <SafeAreaView>
      <TextInput style={styles.input} value={text} onChangeText={updateText} />
      <Button title="Search" onPress={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default inject('store')(observer(TabOneScreen));
