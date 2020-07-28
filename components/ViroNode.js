/**
 * Copyright (c) 2016-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViroNode
 */

'use strict';

import { requireNativeComponent, View, StyleSheet, findNodeHandle } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');
import { checkMisnamedProps } from './Utilities/ViroProps';

/**
 * Absolute container for Viro Controls
 */
var ViroNode = createReactClass({
  propTypes: {
    ...View.propTypes,
    position: PropTypes.arrayOf(PropTypes.number),
    scale: PropTypes.arrayOf(PropTypes.number),
    rotation: PropTypes.arrayOf(PropTypes.number),
    scalePivot: PropTypes.arrayOf(PropTypes.number),
    rotationPivot: PropTypes.arrayOf(PropTypes.number),
    animation: PropTypes.shape({
      name: PropTypes.string,
      delay: PropTypes.number,
      loop: PropTypes.bool,
      onStart: PropTypes.func,
      onFinish: PropTypes.func,
      run: PropTypes.bool,
      interruptible: PropTypes.bool,
    }),
    transformBehaviors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    onTransformUpdate: PropTypes.func,
    renderingOrder: PropTypes.number,
    visible: PropTypes.bool,
    opacity: PropTypes.number,
    ignoreEventHandling: PropTypes.bool,
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
      }).isRequired,
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

    checkMisnamedProps("ViroNode", this.props);

    // Since transformBehaviors can be either a string or an array, convert the string to a 1-element array.
    let transformBehaviors = typeof this.props.transformBehaviors === 'string' ?
        new Array(this.props.transformBehaviors) : this.props.transformBehaviors;

    let transformDelegate = this.props.onTransformUpdate != undefined ? this._onNativeTransformUpdate : undefined;

    return (
      <VRTViewContainer
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
        transformBehaviors={transformBehaviors}
        onAnimationStartViro={this._onAnimationStart}
        onAnimationFinishViro={this._onAnimationFinish}
        canCollide={this.props.onCollision != undefined}
        onCollisionViro={this._onCollision}
        />
    );
  }
});


var VRTViewContainer = requireNativeComponent(
  'VRTViewContainer', ViroNode, {
    nativeOnly: {
            enabledClick:true,
            enabledHover:true,
            onClickViro:true,
            onAnyClickViro:true,
            onHoverViro:true,
            onAnyHoverViro:true,
            materials: [],
            canCollide:true,
            onCollisionViro:true,
            onNativeTransformDelegateViro:true,
            hasTransformDelegate:true,
            onAnimationStartViro:true,
            onAnimationFinishViro:true
          }
  }
);


module.exports = ViroNode;
