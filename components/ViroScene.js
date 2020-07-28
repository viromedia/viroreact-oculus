/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import { requireNativeComponent, findNodeHandle, View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkMisnamedProps } from './Utilities/ViroProps';
var NativeModules = require('react-native').NativeModules;
var createReactClass = require('create-react-class');

var ViroScene = createReactClass({
  propTypes: {
    ...View.propTypes,
    onHover: PropTypes.func,
    onAnyHover: PropTypes.func,
    onClick: PropTypes.func,
    onAnyClick: PropTypes.func,
    onAnyClicked: PropTypes.func,
    onPlatformUpdate: PropTypes.func,
    onCameraTransformUpdate: PropTypes.func,
    ignoreEventHandling: PropTypes.bool,

    /**
     * Describes the acoustic properties of the room around the user
     */
    soundRoom: PropTypes.shape({
      // The x, y and z dimensions of the room
      size: PropTypes.arrayOf(PropTypes.number).isRequired,
      wallMaterial: PropTypes.string,
      ceilingMaterial: PropTypes.string,
      floorMaterial: PropTypes.string,
    }),
    physicsWorld: PropTypes.shape({
      gravity: PropTypes.arrayOf(PropTypes.number).isRequired,
      drawBounds: PropTypes.bool,
    }),
    postProcessEffects: PropTypes.arrayOf(PropTypes.string),
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
  _onPlatformUpdate: function(event: Event) {
    /**
     * ##### DEPRECATION WARNING - 'vrPlatform' is deprecated in favor of 'platform'! Support
     * for 'vrPlatform' may be removed in the future.
     */
    event.nativeEvent.platformInfoViro.vrPlatform = event.nativeEvent.platformInfoViro.platform
    this.props.onPlatformUpdate && this.props.onPlatformUpdate(event.nativeEvent.platformInfoViro);
  },

  _onCameraTransformUpdate: function(event: Event) {
    var cameraTransform = {
      // ** DEPRECATION WARNING ** The cameraTransform key will be deprecated in a future release,
      cameraTransform: {
        position: [event.nativeEvent.cameraTransform[0], event.nativeEvent.cameraTransform[1], event.nativeEvent.cameraTransform[2]],
        rotation: [event.nativeEvent.cameraTransform[3], event.nativeEvent.cameraTransform[4], event.nativeEvent.cameraTransform[5]],
        forward: [event.nativeEvent.cameraTransform[6], event.nativeEvent.cameraTransform[7], event.nativeEvent.cameraTransform[8]],
        up: [event.nativeEvent.cameraTransform[9], event.nativeEvent.cameraTransform[10], event.nativeEvent.cameraTransform[11]]
      },
      position: [event.nativeEvent.cameraTransform[0], event.nativeEvent.cameraTransform[1], event.nativeEvent.cameraTransform[2]],
      rotation: [event.nativeEvent.cameraTransform[3], event.nativeEvent.cameraTransform[4], event.nativeEvent.cameraTransform[5]],
      forward: [event.nativeEvent.cameraTransform[6], event.nativeEvent.cameraTransform[7], event.nativeEvent.cameraTransform[8]],
      up: [event.nativeEvent.cameraTransform[9], event.nativeEvent.cameraTransform[10], event.nativeEvent.cameraTransform[11]]
    };
    this.props.onCameraTransformUpdate && this.props.onCameraTransformUpdate(cameraTransform);
  },

  async findCollisionsWithRayAsync(from, to, closest, viroTag) {
    return await NativeModules.VRTSceneModule.findCollisionsWithRayAsync(findNodeHandle(this), from, to, closest, viroTag);
  },

  async findCollisionsWithShapeAsync(from, to, shapeString, shapeParam, viroTag) {
    return await NativeModules.VRTSceneModule.findCollisionsWithShapeAsync(findNodeHandle(this), from, to, shapeString, shapeParam, viroTag);
  },

  /**
   * ##### DEPRECATION WARNING - this prop may be removed in future releases #####
   */
  async getCameraPositionAsync() {
    console.warn("[Viro] ViroScene.getCameraPositionAsync has been DEPRECATED. Please use getCameraOrientationAsync instead.");
    var orientation = await NativeModules.VRTCameraModule.getCameraOrientation(findNodeHandle(this));
    position = [orientation[0], orientation[1], orientation[2]];
    return position;
  },

  async getCameraOrientationAsync(){
    var orientation = await NativeModules.VRTCameraModule.getCameraOrientation(findNodeHandle(this));
    return {
      position: [orientation[0], orientation[1], orientation[2]],
      rotation: [orientation[3], orientation[4], orientation[5]],
      forward: [orientation[6], orientation[7], orientation[8]],
      up: [orientation[9], orientation[10], orientation[11]],
    }
  },

  getChildContext: function() {
    return {
      cameraDidMount: function(camera) {
        if (camera.props.active) {
          NativeModules.VRTCameraModule.setSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
      cameraWillUnmount: function(camera) {
        if (camera.props.active) {
          NativeModules.VRTCameraModule.removeSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
      cameraDidUpdate: function(camera, active) {
        if (active) {
          NativeModules.VRTCameraModule.setSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
        else {
          NativeModules.VRTCameraModule.removeSceneCamera(findNodeHandle(this), findNodeHandle(camera));
        }
      }.bind(this),
    };
  },

  render: function() {
    // Uncomment this line to check for misnamed props
    //checkMisnamedProps("ViroScene", this.props);

    return (
      <VRTScene
        {...this.props}
        ref={ component => {this._component = component; }}
        enabledClick={this.props.onClick != undefined ||
                      this.props.onAnyClick != undefined ||
                      this.props.onAnyClicked != undefined}
        enabledHover={this.props.onHover != undefined ||
                      this.props.onAnyHover != undefined}
        onClickViro={this._onClick}
        onAnyClickViro={this._onAnyClick}
        onHoverViro={this._onHover}
        onAnyHoverViro={this._onAnyHover}
        canCameraTransformUpdate={this.props.onCameraTransformUpdate != undefined}
        onPlatformUpdateViro={this._onPlatformUpdate}
        onCameraTransformUpdateViro={this._onCameraTransformUpdate}
        />
    );
  },
});

ViroScene.childContextTypes = {
  cameraDidMount: PropTypes.func,
  cameraWillUnmount: PropTypes.func,
  cameraDidUpdate: PropTypes.func,
};

var VRTScene = requireNativeComponent(
    'VRTScene', ViroScene, {
        nativeOnly: {
          canCollide:true,
          canCameraTransformUpdate:true,
          enabledClick:true,
          enabledHover:true,
          onClickViro:true,
          onAnyClickViro:true,
          onHoverViro:true,
          onAnyHoverViro:true,
          onPlatformUpdateViro:true,
          onCameraTransformUpdateViro:true,
          physicsBody:true,
          onCollisionViro:true,
        }
    }
);

module.exports = ViroScene;
