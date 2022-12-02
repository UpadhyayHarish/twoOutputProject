import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function App() {
const [input1, setInput1] = useState("");
const [input2, setInput2] = useState("");
const [input1List, setInput1List] = useState([]);
const [input2List, setInput2List] = useState([]);
const [output1list, setOutput1List] = useState([]);
const [output2list, setOutput2List] = useState([]);

const pushOutput = (value, num) => {
if (num === 1) setInput1List([...input1List, value]);
else setInput2List([...input2List, value]);
};
const updateOutput1List = () => {
if (input1List?.length && input2List?.length) {
let index = output1list.length;
if (index < input2List.length) {
if (index === 0) setOutput1List([input1List[0]]);
else if (output1list.length % 2 === 0) {
if (input1List[index])
setOutput1List((list) => [...list, input1List[index]]);
} else {
if (input2List[index])
setOutput1List((list) => [...list, input2List[index]]);
}
}
}
};
const updateOutput2List = () => {
let isBothAvailable = input1List?.length && input2List?.length;
let inputLength = input1List.length + input2List.length;
let outputLength = output2list.length;
if (isBothAvailable && inputLength > outputLength) {
let list = output2list;
if (outputLength === 0) list.push(input2List[0]);
else if (outputLength % 2 === 0) list.push(input2List[outputLength / 2]);
else list.push(input1List[Math.floor(outputLength / 2)]);
setOutput2List(list);
}
};

useEffect(() => {
updateOutput1List();
let minLength = input1List.length < input2List.length ?
input1List.length : input2List.length;
while ( output2list.length < minLength * 2) {
updateOutput2List();
}
}, [input1List, input2List]);

return (
<View style={styles.app}>
<View style={styles.inputBox}>
<Text key="firstinput">Input 1</Text>
<input
value={input1}
onChange={(e) => setInput1(e.target.value)}
onKeyDown={(evt) => {
if (evt.key === "Enter" && evt.target.value) {
pushOutput(evt.target.value, 1);
setInput1("");
}
}}
/>
<View style={styles.row}>
{input1List.map((item) => (
<Text key={item}>{item} </Text>
))}
</View>
</View>
<View style={styles.inputBox}>
<Text key="secondinput">Input 2</Text>
<input
value={input2}
onChange={(e) => setInput2(e.target.value)}
onKeyDown={(evt) => {
if (evt.key === "Enter" && evt.target.value) {
pushOutput(evt.target.value, 2);
setInput2("");
}
}}
/>
<View style={styles.row}>
{input2List.map((item) => (
<Text key={item}>{item} </Text>
))}
</View>
</View>
<View style={styles.rowOutput} >
<View style={styles.outputBox}>
<View>
<Text key="output1"> Output 1 </Text>
<View style={{ marginTop: 10 }}>
{output1list.map((item) => (
<Text key={item}>{item}</Text>
))}
</View>
</View>
</View>
<View style={styles.outputBox}>
<View>
<Text key="output1"> Output 2 </Text>
<View style={{ marginTop: 10 }}>
{output2list.map((item) => (
<Text key={item}>{item}</Text>
))}
</View>
</View>
</View>
</View>
</View>
);
}

const styles = StyleSheet.create({
app: {
marginHorizontal: "auto",
width: '100%',
},
outputBox: {
marginTop: "20px",
border: "0.11px solid black",
display: "flex",
textAlign: 'center'
},
row: {
display: "flex",
flexDirection: "row"
},
rowOutput:{
width: '100%',
display: "flex",
flexDirection: "row" ,
justifyContent: 'space-around'
},
inputBox: {
width: '30%',
alignSelf: 'center'
}
});

export default App;