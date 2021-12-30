/**
 * @author Luke Brandon Farrell
 * @description Keyboard component with message and interactive keys
 */

import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Platform, Vibration, ViewPropTypes } from "react-native";
import Ripple from "react-native-material-ripple";
import PropTypes from "prop-types";

const backAsset = require("./back.png");

class VirtualKeyboard extends Component {
  /**
   * [ Built-in React method. ]
   *
   * Setup the component. Executes when the component is created
   *
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      disabled: false,
      message: null
    };
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the component is mounted to the screen.
   */
  componentDidMount() {
    if(this.props.onRef) {
      this.props.onRef(this);
    }
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the component is unmounted from the screen
   */
  componentWillUnmount() {
    if(this.props.onRef) {
      this.props.onRef(undefined);
    }
  }

  /**
   * [ Built-in React method. ]
   *
   * Executed when the components props are updated.
   */
  componentDidUpdate(prevProps, prevState) {
    if(prevState.text !== this.state.text) {
      if (this.props.onChange) this.props.onChange(this.state.text);
    }
  }

  /**
   * [ Built-in React method. ]
   *
   * Allows us to render JSX to the screen
   */
  render() {
    /** Styles */
    const { containerStyle, keyboardDefaultStyle, keyboardRowStyle } = styles;
    /** Props */
    const {
      keyboard,
      keyboardCustomKeyImage,
      // Style Props
      keyboardStyle
    } = this.props;
    /** Variables */
        // Keyboard configuration. The default contains a key
        // for each number 0 - 9 and a back button.
    const defaultKeyboard = keyboard ?
        keyboard : [[1, 2, 3], [4, 5, 6], [7, 8, 9], [keyboardCustomKeyImage, 0, backAsset]];

    return (
        <View style={containerStyle}>
          {this.renderMessage()}
          <View style={[keyboardDefaultStyle, keyboardStyle]}>
            {// Maps each array of numbers in the keyboardValues array
              defaultKeyboard.map((row, r) => {
                return (
                    <View key={r} style={keyboardRowStyle}>
                      {// Maps each number in row and creates key for that number
                        row.map((element, k) => {
                          return this.renderKey(element, r, k);
                        })}
                    </View>
                );
              })}
          </View>
        </View>
    );
  }

  /**
   * Renders the message
   *
   * @return {*}
   */
  renderMessage() {
    // Styles
    const { messageDefaultStyle, messageTextDefaultStyle } = styles;

    // Props
    const {
      // Style Props
      messageStyle,
      messageTextStyle,
      // TestID Props
      messageTestID,
      messageTextTestID,
    } = this.props;

    // State
    const { message } = this.state;

    if (message) {
      return (
          <View testID={`VirtualKeyboard-${messageTestID}`} style={[messageDefaultStyle, messageStyle]}>
            <Text testID={`VirtualKeyboard-${messageTextTestID}`} style={[messageTextDefaultStyle, messageTextStyle]}>{message}</Text>
          </View>
      );
    }

    return null;
  }

  /**
   * Renders a key on the keyboard
   *
   * @param entity
   * @param row
   * @param column
   *
   * @return {jsx}
   */
  renderKey(entity, row, column) {
    /** Styles */
    const {
      keyContainerStyle,
      keyboardDisabledDefaultStyle,
      keyDefaultStyle,
      keyTextDefaultStyle,
      keyImageDefaultStyle
    } = styles;
    /** Props */
    const {
      keyboardFunc,
      keyboardDisabledStyle,
      vibration,
      onKeyDown,
      onChange,
      onPressFunction,
      // Style Props
      keyStyle,
      keyTextStyle,
      keyImageStyle
    } = this.props;
    /** State */
    const { disabled } = this.state;
    /** Variables */
    const keyDown = (value) => {
      this.setState({
        text: this.resolveKeyDownVirtualKeyboard(this.state.text, value),
      });

      if(onKeyDown) onKeyDown(value);
    }

    // Custom functions for the keyboard key
    const keyboardFuncSet = keyboardFunc
        ? keyboardFunc
        : [
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [() => keyDown("custom"), null, () => keyDown("back")]
        ];

    // Decide what type of element is passed as the key
    let keyJsx;
    if (React.isValidElement(entity)) {
      keyJsx = entity;
    } else if (keyboardFuncSet[row][column]) {
      keyJsx = <Image style={[keyImageDefaultStyle, keyImageStyle]} source={entity} />;
    } else {
      keyJsx = <Text style={[keyTextDefaultStyle, keyTextStyle]}>{entity}</Text>;
    }

    // We want to block keyboard interactions if it has been disabled.
    if (!disabled) {
      const onPress = () => {
        if(vibration) Vibration.vibrate(50);

        keyboardFuncSet[row][column] ? keyboardFuncSet[row][column]() : keyDown(entity)
      };
      return (
          <Ripple
              testID={`VirtualKeyboard-${entity}`}
              rippleColor={"#000"}
              key={column}
              onPress={onPressFunction === 'onPress' ? onPress : undefined}
              onPressIn={!onPressFunction || onPressFunction === 'onPressIn' ? onPress : undefined}
              onPressOut={onPressFunction === 'onPressOut' ? onPress : undefined}
              style={[keyContainerStyle, keyDefaultStyle, keyStyle]}
          >
            {keyJsx}
          </Ripple>
      );
    } else {
      return (
          <View
              testID={`VirtualKeyboard-${entity}-disabled`}
              key={column}
              style={[
                keyContainerStyle,
                keyDefaultStyle,
                keyStyle,
                keyboardDisabledDefaultStyle,
                keyboardDisabledStyle
              ]}
          >
            {keyJsx}
          </View>
      );
    }
  }
  /**
   * Resolves a key press on virtual keyboard
   *
   * @param string
   * @param char
   */
  resolveKeyDownVirtualKeyboard(string = "", char) {
    const newString = string;

    switch (char) {
      case "back": {
        return newString.substring(0, newString.length - 1);
      }
      case "custom":
        if (this.props.onCustomKey) this.props.onCustomKey(string);
        return string;
      default: {
        return newString.concat(char);
      }
    }
  }

  /**
   * Function used to display a message above the keyboard
   *
   * @param message
   */
  displayMessage(message) {
    this.setState({
      message
    }, () => {
      if(this.hideMessageTimeout) clearTimeout(this.hideMessageTimeout);

      this.hideMessageTimeout = setTimeout(() => {
        this.clearMessage();
      }, this.props.keyboardMessageDisplayTime);
    });
  }

  /**
   * Function used to clear the message on the keyboard
   */
  clearMessage() {
    this.setState({ message: null });
  }

  /**
   * Function used to disable the keyboard
   */
  disable() {
    this.setState({
      disabled: true
    });
  }

  /**
   * Function used to enable the keyboard
   */
  enable() {
    this.setState({
      disabled: false
    });
  }
}

VirtualKeyboard.propTypes = {
  onRef: PropTypes.any,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onCustomKey: PropTypes.func,
  onPressFunction: PropTypes.oneOf(['onPress', 'onPressIn', 'onPressOut']),
  keyboard: PropTypes.array,
  keyboardFunc: PropTypes.array,
  keyboardCustomKeyImage: PropTypes.number,
  keyboardMessageDisplayTime: PropTypes.number,
  vibration: PropTypes.bool,
  // Style props
  keyboardStyle: ViewPropTypes.style,
  keyboardDisabledStyle: ViewPropTypes.style,
  keyStyle: ViewPropTypes.style,
  keyTextStyle: ViewPropTypes.style,
  keyImageStyle: ViewPropTypes.style,
  messageStyle: ViewPropTypes.style,
  messageTextStyle: ViewPropTypes.style,
  // TestID props
  messageTestID: PropTypes.string,
  messageTextTestID: PropTypes.string,
};

VirtualKeyboard.defaultProps = {
  // Keyboard functions. By default the text (number) in the
  // keyboard array will be passed via the keyDown callback.
  // Use this array to set custom functions for certain keys.
  keyboardFunc: null,
  keyboardMessageDisplayTime: 3000,
  onPressFunction: 'onPressIn',
  vibration: false,
  messageTestID: 'MessageContainer',
  messageTextTestID: 'Message',
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: null,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  // Style applied to the keyboard. Must contain a height or
  // the keyboard will not be displayed.
  keyboardDefaultStyle: {
    height: 250,
    backgroundColor: "#FFF"
  },
  keyboardRowStyle: {
    flex: 1,
    flexDirection: "row"
  },
  keyContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  // Style applied to keyboard when it is disabled.
  keyboardDisabledDefaultStyle: {
    backgroundColor: "#FFF"
  },
  // Style the individual keys
  keyDefaultStyle: {
    backgroundColor: "#FFF",
    borderRightColor: "#e8e8e8",
    borderRightWidth: 1,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1
  },
  // Style for the text inside a key
  keyTextDefaultStyle: {
    ...Platform.select({
      ios: {
        fontFamily: "HelveticaNeue"
      },
      android: {
        fontFamily: "Roboto"
      }
    }),
    fontWeight: "400",
    fontSize: 25,
    textAlign: "center",
    color: "#222222"
  },
  // Style for an image inside a key
  keyImageDefaultStyle: {
    width: 28,
    height: 28
  },
  messageDefaultStyle: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8e8e8"
  },
  messageTextDefaultStyle: {
    color: "#222222",
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default VirtualKeyboard;
