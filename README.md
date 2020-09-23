# react-native-screen-keyboard
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## License

This project is licensed under the MIT License

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.lukebrandonfarrell.com"><img src="https://avatars3.githubusercontent.com/u/18139277?v=4" width="100px;" alt=""/><br /><sub><b>Luke Brandon Farrell</b></sub></a><br /><a href="https://github.com/aspect-apps/react-native-screen-keyboard/commits?author=lukebrandonfarrell" title="Code">💻</a> <a href="https://github.com/aspect-apps/react-native-screen-keyboard/commits?author=lukebrandonfarrell" title="Documentation">📖</a> <a href="#infra-lukebrandonfarrell" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!