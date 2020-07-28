/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

import { requireNativeComponent, findNodeHandle, View, StyleSheet, Platform } from 'react-native';
import React, { Component } from 'react';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
var ViroControllerModule = require('react-native').NativeModules.VRTControllerModule;
import { checkMisnamedProps } from './Utilities/ViroProps';

var ViroController = createReactClass({

  propTypes: {
    ...View.propTypes,
    onMove: PropTypes.func,
    onThumbstick: PropTypes.func,
    onTrigger: PropTypes.func,
    onHover: PropTypes.func,
    onAnyHover: PropTypes.func,
    onClick: PropTypes.func,
    onAnyClick: PropTypes.func,
    onAnyClicked: PropTypes.func,
    onControllerStatus: PropTypes.func,
    reticleVisibility: PropTypes.bool,
    controllerVisibility: PropTypes.bool,
    lightReceivingBitMask : PropTypes.number,
    stickyReticle: PropTypes.bool,
    forceRender: PropTypes.bool,
  },

  _onMove: function(event: Event) {
    this.props.onMove && this.props.onMove(event.nativeEvent);
  },

  _onThumbstick: function(event: Event) {
    this.props.onThumbstick && this.props.onThumbstick(event.nativeEvent);
  },

  _onTrigger: function(event: Event) {
    this.props.onTrigger && this.props.onTrigger(event.nativeEvent);
  },

  _onControllerStatus: function(event: Event) {
    this.props.onControllerStatus && this.props.onControllerStatus(event.nativeEvent);
  },
  _onHover: function(event: Event) {
    this.props.onHover && this.props.onHover(event.nativeEvent);
  },

  _onAnyHover: function(event: Event) {
    this.props.onAnyHover && this.props.onAnyHover(event.nativeEvent.isHovering, event.nativeEvent.position, event.nativeEvent.source);
  },

  _onClick: function(event: Event) {
    this.props.onClick && this.props.onClick(event.nativeEvent);
  },

  _onAnyClick: function(event: Event) {
    this.props.onAnyClick && this.props.onAnyClick(event.nativeEvent.clickState, event.nativeEvent.position, event.nativeEvent.source);
    let CLICKED = 3; // Value representation of Clicked ClickState within EventDelegateJni.
    if (event.nativeEvent.clickState == CLICKED){
          this._onAnyClicked(event)
    }
  },

  _onAnyClicked: function(event: Event) {
    this.props.onAnyClicked && this.props.onAnyClicked(event.nativeEvent.position, event.nativeEvent.source);
  },

  async getControllerForwardAsync() {
    return await ViroControllerModule.getForwardVectorAsync(findNodeHandle(this));
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {
    return (
      <VRTController
        {...this.props}
        ref={ component => {this._component = component; }}
        enabledClick={this.props.onClick != undefined
                        || this.props.onAnyClick != undefined
                        || this.props.onAnyClicked != undefined}
        enabledHover={this.props.onHover != undefined || this.props.onAnyHover != undefined}
        enabledMove={this.props.onMove != undefined}
        enabledThumbstick={this.props.onThumbstick != undefined}
        enabledTrigger={this.props.onTrigger != undefined}
        enabledControllerStatus={this.props.onControllerStatus != undefined}
        onMoveViro={this._onMove}
        onThumbstickViro={this._onThumbstick}
        onTriggerViro={this._onTrigger}
        onControllerStatusViro={this._onControllerStatus}
        onHoverViro={this._onHover}
        onAnyHoverViro={this._onAnyHover}
        onClickViro={this._onClick}
        onAnyClickViro={this._onAnyClick}
      />
    );
  }
});

var VRTController = requireNativeComponent(
  'VRTController', ViroController, {
          nativeOnly: {
              enabledClick: true,
              enabledHover: true,
              enabledMove: true,
              enabledThumbstick: true,
              enabledTrigger: true,
              enabledControllerStatus: true,
              onClickViro:true,
              onAnyClickViro:true,
              onHoverViro:true,
              onAnyHoverViro:true,
              onMoveViro:true,
              onThumbstickViro:true,
              onTriggerViro:true,
              onControllerStatusViro:true,
            }
      }
);

module.exports = ViroController;
