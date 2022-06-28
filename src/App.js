import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

function App() {
  var arr = [
    {
      name: "Jack",
      age: 20,
      worthUnit: "billion",
      netWorth: 20
    },
    {
      name: "Nice",
      age: 29,
      worthUnit: "billion",
      netWorth: 8
    },
    {
      name: "Tim",
      age: 23,
      worthUnit: "billion",
      netWorth: 3
    },
    {
      name: "Jonathan",
      age: 27,
      worthUnit: "billion",
      netWorth: 2
    },
    {
      name: "Billz",
      age: 32,
      worthUnit: "billion",
      netWorth: 7
    },
    {
      name: "Marry Jim",
      age: 37,
      worthUnit: "billion",
      netWorth: 20
    },
    {
      name: "Jerry",
      age: 39,
      worthUnit: "billion",
      netWorth: 10
    },
    {
      name: "Chris",
      age: 35,
      worthUnit: "billion",
      netWorth: 15
    },
    {
      name: "Ronald",
      age: 21,
      worthUnit: "billion",
      netWorth: 15
    }
  ];
  let total = 0;
  let leftSum = 0;
  arr.forEach((e) => {
    total += e.netWorth;
  });
  const [pivots, setPivots] = useState({});
  const pivot = () => {
    for (let e = 0; e < arr.length; e++) {
      if (total - leftSum - arr[e].netWorth === leftSum) {
        return setPivots(arr[e]);
      }
      leftSum += arr[e].netWorth;
    }
    return -1;
  };
  console.log("jj", pivots);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState(true);
  const onChangeHandle = async (value, key) => {
    let name = value;
    if (name) {
      let isFound = data.filter((e) => e.name === name);
      if (isFound.length === 0) {
        setLoading(true);
        setInputState(false);
        let response = await axios.get(`https://api.agify.io/?name=${name}`);
        let responseData = [];
        if (data) {
          data.forEach((e) => {
            responseData.push(e);
          });
        }
        responseData.push(response.data);
        setData(responseData);
        setInputState(true);
        setLoading(false);
      }
    } else {
      setData([]);
    }
  };

  return (
    <SafeAreaView>
      <Button onPress={() => pivot()} title="Click To Find Pivot" />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text>{pivots.name}</Text>
        <Text>{pivots.age}</Text>
        <Text>{pivots.worthUnit}</Text>
        <Text>{pivots.netWorth}</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          maxLength={15}
          editable={inputState}
          onChangeText={(e) => {
            onChangeHandle(e);
          }}
          placeholder="Enter text to search"
          placeholderTextColor="grey"
        />
      </View>
      <FlatList
        data={data}
        renderItem={(items) => {
          return (
            <View style={styles.container}>
              <Text style={styles.textedition}>
                Name: {items.item.name}
                {"   "}
              </Text>
              <Text style={styles.textedition}>
                Age: {items.item.age ? items.item.age : "Not Available"}
                {"   "}
              </Text>
              <Text style={styles.textedition}>
                Count: {items.item.count ? items.item.count : "Not Available"}
              </Text>
            </View>
          );
        }}
      />
      {loading ? <ActivityIndicator visible={loading} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    height: 50,
    margin: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "lightblue",
    fontFamily: "Roboto"
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    borderWidth: 1,
    backgroundColor: "black",
    flexDirection: "row",
    borderRadius: 20
  },
  textedition: {
    fontSize: 15,
    color: "white",
    fontFamily: "Cochin"
  }
});

export default App;
