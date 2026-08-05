import react from 'react';
import { Text, View ,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-web';
export default function Welcome({navigation}) {
  return (
    <View style={styles.input}>
      <Text color='red'><h1>Hello world</h1></Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Homescreen")}><Text><h3>click here</h3></Text></TouchableOpacity><Text>To Visit Homepage</Text>
    </View>
  );
}
const styles = StyleSheet.create({
      input:{
       flex: 1,
      backgroundColor: '#5dade2',
      alignItems: 'center',
      justifyContent: 'center',

  },
});

