# react-native-screen-keyboard

[![npm](https://img.shields.io/npm/v/react-native-screen-keyboard.svg?style=flat-square)](https://www.npmjs.com/package/react-native-screen-keyboard)
[![npm licence](http://img.shields.io/npm/l/react-native-screen-keyboard.svg?style=flat-square)](https://npmjs.org/package/react-native-screen-keyboard)
[![npm downloads](http://img.shields.io/npm/dt/react-native-screen-keyboard.svg?style=flat-square)](https://npmjs.org/package/react-native-screen-keyboard)

<img src="https://raw.githubusercontent.com/LukeBrandonFarrell/open-source-images/master/react-native-awesome-pin/keyboard.png" width="50%" /><br />

## Install

To get started install via npm:
```sh
 npm install react-native-screen-keyboard
```

#### Usage

Import:
```js
 import { VirtualKeyboard } from 'react-native-screen-keyboard';
```

Then add it to your code:
```js
<VirtualKeyboard
    onRef={ref => (this.keyboard = ref)}
    keyDown={this.keyDown.bind(this)}
/>

// Callback function which receives the key pressed
keyDown(key){
   // Key pressed
}
```

The back and custom key will pass a sting, either `"back"` or `"custom"` to the keyDown callback.

The `<VirtualKeyboard />` also has a number of functions which can be triggered through refs.
 
 - `displayMessage(message)` this will create a popup above the
keyboard displaying the given a message. The style of the popup can be customized through props.
 - `clearMessage()` this will clear the keyboard message dialog.
 - `enable()` this will enable the keyboard for input.
 - `disable()` this will disable the keyboard.

#### VirtualKeyboard

The `<VirtualKeyboard />` uses two arrays to allow you to set keys and define custom functions for each key.

| Prop            | Type          | Optional  | Default              | Description                                                                             |
| --------------- | ------------- | --------- | -------------------- | --------------------------------------------------------------------------------------- |
| onRef           | any           | No        |                      | onRef allows you to call the `throwError(message)` method.                              |
| onKeyDown         | function      | Yes        |                      | Callback function triggered when a key is pressed. Returns the key value.               |
| onChange         | function      | Yes        |                      | Callback function triggered when a key is pressed. Returns the full string.               |
| onCustomKey         | function      | Yes        |                      | Callback function triggered when custom left button is pressed, use with `onChange`               |
| keyboard        | array         | Yes       | See VirtualKeyboard.js   | 4 x 3 matrix containing the value for each key. See VirtualKeyboard.js.                     |
| keyboardFunc    | array         | Yes       | See VirtualKeyboard.js   | 4 x 3 matrix containing custom functions for each key. Pass null for no function.       |
| keyboardCustomKeyImage | number | Yes       | null                 | Image for the custom key (bottom left key)                                              |
| keyboardMessageDisplayTime | number | Yes   | 3000                 | Time in milliseconds for the message dialog to automatically clear.                     |
| vibration       | bool          | Yes       | false                | Key / Tactile vibration enabled                                                         |
| keyboardStyle   | object        | Yes       | See VirtualKeyboard.js   | Style applied to the keyboard.                                                          |
| keyboardDisabledStyle | object  | Yes       | See VirtualKeyboard.js   | Style applied when the keyboard is disabled.                                            |
| keyStyle        | object        | Yes       | See VirtualKeyboard.js   | Style applied to each key on the keyboard.                                              |
| keyTextStyle    | object        | Yes       | See VirtualKeyboard.js   | Style applied to the text inside each key.                                              |
| keyImageStyle   | object        | Yes       | See VirtualKeyboard.js   | Style applied to image in a key. If an image is passed.                                 |
| messageStyle    | object        | Yes       | See VirtualKeyboard.js   | Style applied to popup error. Can set the background colour here.                     |
| messageTextStyle| object        | Yes       | See VirtualKeyboard.js   | Style applied to the text inside the popup error.       

## Contributing

If you want to issue a PR, go ahead ;)

## Authors

* [**Luke Brandon Farrell**](https://lukebrandonfarrell.com/) - *Author*

## License

This project is licensed under the MIT License
