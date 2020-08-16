/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import Config from 'react-native-config'
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  NativeModules,
  SectionList,
  SafeAreaView
} from 'react-native';

import {
  ViroVRSceneNavigator,
} from 'react-viro';

import renderIf from './js/release_test/renderIf';

var InitialVRScene = require('./js/release_test/ViroSkyBoxTest');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var SCENE_NAVIGATOR_TYPE = "3D Scene";
var VR_DEPRECATED_TYPE = "VR (deprecated)";
export default class ViroExperienceSelector extends Component {
  constructor() {
    super();
    console.log("Daniel constructor VR Nav please");

    var sharedProps = {
      // Enter params herawee
    }
    console.log("Config.FLAVOR - " + Config.VR_PLATFORM);
    this.state = {
      navigatorType : Config.VR_PLATFORM == "OVR_MOBILE" ? VR_NAVIGATOR_TYPE : UNSET,
      sharedProps : sharedProps,
      vrMode : true,
    }
    this._getVRNavigator = this._getVRNavigator.bind(this);
  }

  render() {
    return this._getVRNavigator();
  }
  _getVRNavigator() {
    console.log("Daniel grab VR Nav please");
    return (
      <View style={localStyles.viroContainer} >
        <ViroVRSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: require('./js/release_test/ViroGLTFTest')}}
          vrModeEnabled={this.state.vrMode}
          onExitViro={()=>{this.setState({navigatorType : UNSET, vrMode : true})}}/>
      </View>
    );
  }
}

var localStyles = StyleSheet.create({
  viroContainer : {
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  vrModeButtons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#1111aa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButtonContainer : {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    alignSelf : 'center'
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  sectionHeaderStyle: {
    backgroundColor: '#6699CC',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: "#FFF",
  },
});

AppRegistry.registerComponent('ViroSample', () => ViroExperienceSelector);

module.exports = ViroExperienceSelector;
