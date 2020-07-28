/**
 * Copyright (c) 2015-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViroText
 * @flow
 */
'use strict';

import { requireNativeComponent, View, findNodeHandle} from 'react-native';
import React, { Component } from 'react';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
import PropTypes from 'prop-types';
import { checkMisnamedProps } from './Utilities/ViroProps';
var StyleSheet = require('react-native/Libraries/StyleSheet/StyleSheet');
var ColorPropType = require('react-native').ColorPropType;
var processColor = require('react-native').processColor;
var StyleSheetPropType = require('react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType');
var TextStylePropTypes = require('./Styles/ViroTextPropTypes');

var stylePropType = StyleSheetPropType(TextStylePropTypes);

/**
 * Used to render a ViroText
 */
var ViroText = createReactClass({
  propTypes: {
    ...View.propTypes,
    position: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    text: PropTypes.string.isRequired,
    rotationPivot: PropTypes.arrayOf(PropTypes.number),
    color: ColorPropType,
    extrusionDepth: PropTypes.number,
    outerStroke: PropTypes.shape({
      type: PropTypes.oneOf(['None', 'Outline', 'DropShadow']),
      width: PropTypes.number,
      color: ColorPropType
    }),
    width: PropTypes.number,
    height: PropTypes.number,
    maxLines: PropTypes.number,
    textClipMode: PropTypes.oneOf(['None', 'ClipToBounds']),
    textLineBreakMode: PropTypes.oneOf(['WordWrap','CharWrap','Justify','None']),
    renderingOrder: PropTypes.number,
    visible: PropTypes.bool,
    style: stylePropType,
    materials: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    animation: PropTypes.shape({
      interruptible: PropTypes.bool,
      name: PropTypes.string,
      delay: PropTypes.number,
      loop: PropTypes.bool,
      onStart: PropTypes.func,
      onFinish: PropTypes.func,
      run: PropTypes.bool,
    }),
    transformBehaviors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    highAccuracyEvents : PropTypes.bool,
    lightReceivingBitMask : PropTypes.number,
    shadowCastingBitMask : PropTypes.number,
    ignoreEventHandling: PropTypes.bool,
    onTransformUpdate: PropTypes.func,
    onHover: PropTypes.func,
    onAnyHover: PropTypes.func,
    onClick: PropTypes.func,
    onAnyClick: PropTypes.func,
    onAnyClicked: PropTypes.func,
    physicsBody: PropTypes.shape({
      type: PropTypes.oneOf(['Dynamic','Kinematic','Static']).isRequired,
      mass: PropTypes.number,
      restitution: PropTypes.number,
      shape: PropTypes.shape({
        type: PropTypes.oneOf(["Box", "Sphere", "Compound"]).isRequired,
        params: PropTypes.arrayOf(PropTypes.number)
      }),
      friction: PropTypes.number,
      useGravity: PropTypes.bool,
      enabled: PropTypes.bool,
      velocity: PropTypes.arrayOf(PropTypes.number),
      force: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.arrayOf(PropTypes.number),
          position: PropTypes.arrayOf(PropTypes.number)
        })),
        PropTypes.shape({
          value: PropTypes.arrayOf(PropTypes.number),
          position: PropTypes.arrayOf(PropTypes.number)
        }),
      ]),
      torque: PropTypes.arrayOf(PropTypes.number)
    }),

    viroTag: PropTypes.string,
    onCollision: PropTypes.func,
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

  _onAnimationStart: function(event: Event) {
    this.props.animation && this.props.animation.onStart && this.props.animation.onStart();
  },

  _onAnimationFinish: function(event: Event) {
    this.props.animation && this.props.animation.onFinish && this.props.animation.onFinish();
  },

  async getTransformAsync() {
    return await NativeModules.VRTNodeModule.getNodeTransform(findNodeHandle(this));
  },

  async getBoundingBoxAsync() {
    return await NativeModules.VRTNodeModule.getBoundingBox(findNodeHandle(this));
  },

  applyImpulse: function(force, position) {
    NativeModules.VRTNodeModule.applyImpulse(findNodeHandle(this), force, position);
  },

  applyTorqueImpulse: function(torque) {
    NativeModules.VRTNodeModule.applyTorqueImpulse(findNodeHandle(this), torque);
  },

  setVelocity: function(velocity) {
    NativeModules.VRTNodeModule.setVelocity(findNodeHandle(this), velocity);
  },

  _onCollision: function(event: Event){
    if (this.props.onCollision){
      this.props.onCollision(event.nativeEvent.viroTag, event.nativeEvent.collidedPoint,
                                                           event.nativeEvent.collidedNormal);
    }
  },

  // Called from native on the event a positional change has occured
  // for the underlying control within the renderer.
  _onNativeTransformUpdate: function(event: Event){
    var position =  event.nativeEvent.position;
    if (this.props.onTransformUpdate){
      this.props.onTransformUpdate(position);
    }
  },

  setNativeProps: function(nativeProps) {
    this._component.setNativeProps(nativeProps);
  },

  render: function() {
    checkMisnamedProps("ViroText", this.props);

    // Since materials and transformBehaviors can be either a string or an array, convert the string to a 1-element array.
    let materials = typeof this.props.materials === 'string' ? new Array(this.props.materials) : this.props.materials;
    let transformBehaviors = typeof this.props.transformBehaviors === 'string' ?
        new Array(this.props.transformBehaviors) : this.props.transformBehaviors;

    let outerStroke = undefined;
    if (this.props.outerStroke) {
      let outerStrokeColor = this.props.outerStroke.color;
      let processedColor = processColor(outerStrokeColor);
      outerStroke = {
        type: this.props.outerStroke.type,
        width: this.props.outerStroke.width,
        color: processedColor
      }
    }

    let transformDelegate = this.props.onTransformUpdate != undefined ? this._onNativeTransformUpdate : undefined;

    return (
      <VRTText
        {...this.props}
        enabledClick={this.props.onClick != undefined ||
                      this.props.onAnyClick != undefined ||
                      this.props.onAnyClicked != undefined}
        enabledHover={this.props.onHover != undefined ||
                      this.props.onAnyHover != undefined}
        onClickViro={this._onClick}
        onAnyClickViro={this._onAnyClick}
        onHoverViro={this._onHover}
        onAnyHoverViro={this._onAnyHover}
        ref={ component => {this._component = component; }}
        onNativeTransformDelegateViro={transformDelegate}
        hasTransformDelegate={this.props.onTransformUpdate != undefined}
        style={[this.props.style]}
        onAnimationStartViro={this._onAnimationStart}
        onAnimationFinishViro={this._onAnimationFinish}
        materials={materials}
        transformBehaviors={transformBehaviors}
        outerStroke={outerStroke}
        canCollide={this.props.onCollision != undefined}
        onCollisionViro={this._onCollision}
      />
    );
  }
});

var VRTText = requireNativeComponent(
  'VRTText',
  ViroText, {
    nativeOnly: {
                enabledClick:true,
                enabledHover:true,
                onClickViro:true,
                onAnyClickViro:true,
                onHoverViro:true,
                onAnyHoverViro:true,
                scale:[1,1,1],
                scalePivot:[0,0,0],
                canCollide:true,
                onCollisionViro:true,
                onNativeTransformDelegateViro:true,
                hasTransformDelegate:true,
                onAnimationStartViro:true,
                onAnimationFinishViro:true
      }
});

module.exports = ViroText;
