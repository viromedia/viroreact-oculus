/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import {
  ViroVRSceneNavigator,
} from 'react-viro';

var createReactClass = require('create-react-class');

var vrScenes = {
    '360PhotoTour': require('./js/360PhotoTour/MainScene'),
    'HumanBody': require('./js/HumanBody/MainScene'),
    'ProductShowcase': require('./js/ProductShowcase/ProductShowcase'),
    'ViroMediaPlayer': require('./js/ViroMediaPlayer/ViroTheatre'),
    'ParticleEmitters': require('./js/ParticleEmitters/ViroParticleTemplates'),
    'PhysicsSample': require('./js/PhysicsSample/BasicPhysicsSample'),
}

var ViroCodeSamplesSceneNavigator = createReactClass({
  render: function() {
    return (
      <ViroVRSceneNavigator
        initialScene={{
          scene: vrScenes['360PhotoTour'],
        }}/>
    );
  }
});

module.exports = ViroCodeSamplesSceneNavigator;
