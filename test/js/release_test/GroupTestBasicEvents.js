/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ViroAnimatedComponent,
  ViroScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroImage,
  ViroVideo,
  ViroFlexView,
  ViroUtils,
  ViroText,
  ViroQuad,
  ViroSkyBox,
  ViroSphere,
  Viro3DObject,
  ViroButton,
  ViroSpinner,
  ViroOmniLight,
  ViroAnimations,
  ViroDirectionalLight,
  ViroController,
  ViroPolyline,
  ViroAnimatedImage
} from 'react-viro';

let polarToCartesian = ViroUtils.polarToCartesian;
var LocalButtonImage = require("./res/icon_live.jpg");
var ReleaseMenu = require("./ReleaseMenu.js");

var createReactClass = require('create-react-class');

var GroupTestBasicEvents = createReactClass({
  getInitialState() {
    return {
        showImage:true,
        consoleText:"Test text here? \n Line 2? \n Line 3? \n Line 4? \n Line 5?",
        currentEvent:"None",
        testController:false,
        isRightController:true,
        currentController:"1"
    };
  },
  onClick(objectTag) {
    return (events)  => {
        if (this.state.currentEvent != "onClick") {
          return;
        }
        if ((!this.state.testController && objectTag == "ViroController") ||
            (this.state.testController && objectTag != "ViroController")) {
          return;
        }

       this.setState({consoleText:"GroupTest JS onClick " + objectTag
                           + " source: " + events[this.state.currentController].source  + " , "
                           + "clickState: " + events[this.state.currentController].clickState  + " , "
                           + "intersecPos: " + events[this.state.currentController].intersecPos
                         });
        }
  },

  onAnyClick(objectTag) {
      return (clickstate, position, source) => {
        if (this.state.currentEvent != "onAnyClick") {
          return;
        }
        if ((!this.state.testController && objectTag == "ViroController") ||
            (this.state.testController && objectTag != "ViroController")) {
          return;
        }
         this.setState({consoleText:"GroupTest onAnyClickState: " + objectTag + " , " + source + " position " + position+ " onClickState: " + clickstate});
      }
    },

    onAnyClicked(objectTag) {
      return (position, source) => {
        if (this.state.currentEvent != "onAnyClicked") {
          return;
        }
        if ((!this.state.testController && objectTag == "ViroController") ||
            (this.state.testController && objectTag != "ViroController")) {
          return;
        }
        this.setState({consoleText:"GroupTest onAnyClicked: " + objectTag + " , " + source + " onClick position:" + position});
      }
    },

    onHover(objectTag) {
       return (events)  => {
         if (this.state.currentEvent != "onHover") {
           return;
         }
         if ((!this.state.testController && objectTag == "ViroController") ||
             (this.state.testController && objectTag != "ViroController")) {
           return;
         }
         this.setState({consoleText:"GroupTest JS _onHover " + objectTag
                                    + ", source: " + events[this.state.currentController].source  + " , "
                                    + "isHovering: " + events[this.state.currentController].isHovering  + " , "
                                    + "intersecPos: " + events[this.state.currentController].intersecPos
                                  });
       }
     },

     onAnyHover(objectTag) {
       return (isHovering, position, source)  => {
         if (this.state.currentEvent != "onAnyHover") {
           return;
         }
         if ((!this.state.testController && objectTag == "ViroController") ||
             (this.state.testController && objectTag != "ViroController")) {
           return;
         }
         this.setState({consoleText:"GroupTest onAnyHover: " + objectTag + " , " + source + " isHovering" + isHovering+ " position: " + position});
       }
     },

     onThumbstick(objectTag) {
       return (events)  => {
         if (this.state.currentEvent != "onThumbstick") {
           return;
         }

         if ((!this.state.testController && objectTag == "ViroController") ||
             (this.state.testController && objectTag != "ViroController")) {
           return;
         }

        this.setState({consoleText:"GroupTest JS _onThumbstick "
            + "source: " + events[this.state.currentController].source  + " , "
            + "isPressed: " + events[this.state.currentController].isPressed  + " , "
            + "axisLocation: " + events[this.state.currentController].axisLocation
          });
       }
     },

     onMove(objectTag) {
       return (events)  => {
         if (this.state.currentEvent != "onMove") {
           return;
         }
         if ((!this.state.testController && objectTag == "ViroController") ||
             (this.state.testController && objectTag != "ViroController")) {
           return;
         }
          this.setState({consoleText:"GroupTest JS _onMove "
                      + "source: " + events[this.state.currentController].source  + " , "
                      + "pos: " + events[this.state.currentController].position  + " , "
                      + "rot: " + events[this.state.currentController].rotation
                    });
       }
     },

     onTrigger(objectTag) {
       return (events)  => {
         if (this.state.currentEvent != "onTrigger") {
           return;
         }
         if ((!this.state.testController && objectTag == "ViroController") ||
             (this.state.testController && objectTag != "ViroController")) {
           return;
         }
         this.setState({consoleText:"GroupTest JS _onTrigger "
                  + "source: " + events[this.state.currentController].source  + " , "
                  + "weight: " + events[this.state.currentController].weight
                });
       }
     },

     onControllerStatus(objectTag) {
        return (events)  => {
          if (this.state.currentEvent != "onControllerStatus") {
            return;
          }
          if ((!this.state.testController && objectTag == "ViroController") ||
              (this.state.testController && objectTag != "ViroController")) {
            return;
          }
        this.setState({consoleText:"GroupTest JS _onControllerStatus "
              + "isConnected: " + events[this.state.currentController].isConnected  + " , "
              + "is6Dof: " + events[this.state.currentController].is6Dof  + " , "
              + "batteryPercentage: " + events[this.state.currentController].batteryPercentage
            });
        }
     },

  render: function() {
    return (
      <ViroScene onClick={this.onClick("ViroScene")}
                 onAnyClick={this.onAnyClick("ViroScene")}
                 onAnyClicked={this.onAnyClicked("ViroScene")}
                 onHover={this.onHover("ViroScene")}
                 onAnyHover={this.onAnyHover("ViroScene")}>
        <ViroController
                  onClick={this.onClick("ViroController")}
                  onAnyClick={this.onAnyClick("ViroController")}
                  onAnyClicked={this.onAnyClicked("ViroController")}
                  onHover={this.onHover("ViroController")}
                  onAnyHover={this.onAnyHover("ViroController")}
                  onThumbstick={this.onThumbstick("ViroController")}
                  onMove={this.onMove("ViroController")}
                  onTrigger={this.onTrigger("ViroController")}
                  onControllerStatus={this.onControllerStatus("ViroController")} />
        <ReleaseMenu sceneNavigator={this.props.sceneNavigator}/>
        <ViroOmniLight position={[0, 0, 0]}
                       color={"#FFFFFF"}
                       attenuationStartDistance={30}
                       attenuationEndDistance={40}/>

        <ViroNode position={[0, 0, -3.5]}>
            <Viro3DObject source={require('../res/heart.obj')}
                          scale={[1.8, 1.8, 1.8]}
                          position={[-3.2, 2.5, -4.5]}
                          materials={["heart"]}
                          type="OBJ"
                          onClick={this.onClick("Viro3DObject")}
                          onAnyClick={this.onAnyClick("Viro3DObject")}
                          onAnyClicked={this.onAnyClicked("Viro3DObject")}
                          onHover={this.onHover("Viro3DObject")}
                          onAnyHover={this.onAnyHover("Viro3DObject")}/>

            <ViroBox
                position={[-1, 1, 0]}
                scale={[0.4 , 0.4 , 0.4]}
                materials={["redColor","blue","redColor","blue","redColor","blue"]}
                height={1}
                width={1}
                length={1}
                onClick={this.onClick("ViroBox")}
                           onAnyClick={this.onAnyClick("ViroBox")}
                           onAnyClicked={this.onAnyClicked("ViroBox")}
                           onHover={this.onHover("ViroBox")}
                           onAnyHover={this.onAnyHover("ViroBox")}/>

            <ViroButton
                position={[0, 1, 0]}
                scale={[0.08, 0.08, 0.1]}
                source={LocalButtonImage}
                hoverSource={LocalButtonImage}
                clickSource={LocalButtonImage}
                onClick={this.onClick("ViroButton")}
                           onAnyClick={this.onAnyClick("ViroButton")}
                           onAnyClicked={this.onAnyClicked("ViroButton")}
                           onHover={this.onHover("ViroButton")}
                           onAnyHover={this.onAnyHover("ViroButton")}/>

            <ViroFlexView
                position={[1, 1, 0]}
                scale={[0.2, 0.2, 0.1]}
                materials={["redColor"]}
                width={3}
                height={2}
                onClick={this.onClick("ViroFlexView")}
                onAnyClick={this.onAnyClick("ViroFlexView")}
                onAnyClicked={this.onAnyClicked("ViroFlexView")}
                onHover={this.onHover("ViroFlexView")}
                onAnyHover={this.onAnyHover("ViroFlexView")}/>

          <ViroPolyline
                position={[2, 1, 0]}
                points={[[0,0,0], [-.5, 0, 0], [0, 0.5, 0], [0.5, 0, 0]]}
                closed={true}
                thickness={.05}
                onClick={this.onClick("ViroPolyline")}
                onAnyClick={this.onAnyClick("ViroPolyline")}
                onAnyClicked={this.onAnyClicked("ViroPolyline")}
                onHover={this.onHover("ViroPolyline")}
                onAnyHover={this.onAnyHover("ViroPolyline")}/>


            <ViroImage
                width={1} height={1}
                format="RGBA8" mipmap={true}
                position={[-2, 0, 0]}
                scale={[0.5, 0.5, 0.1]}
                source={{uri: "https://upload.wikimedia.org/wikipedia/commons/7/74/Earth_poster_large.jpg"}}
                onClick={this.onClick("ViroImage")}
                           onAnyClick={this.onAnyClick("ViroImage")}
                           onAnyClicked={this.onAnyClicked("ViroImage")}
                           onHover={this.onHover("ViroImage")}
                           onAnyHover={this.onAnyHover("ViroImage")}/>

            <ViroNode
                position={[-1, 0, 0]}
                scale={[0.5, 0.5, 0.1]}
                rotation={[0,0,0]}
                onClick={this.onClick("ViroNode")}
                           onAnyClick={this.onAnyClick("ViroNode")}
                           onAnyClicked={this.onAnyClicked("ViroNode")}
                           onHover={this.onHover("ViroNode")}
                           onAnyHover={this.onAnyHover("ViroNode")}>

                <ViroText
                  style={styles.baseTextTwo}
                  text="This is a text in a ViroNode"/>
            </ViroNode>

            <ViroSphere
                position={[0, 0, 0]}
                scale={[0.3, 0.3, 0.3]}
                widthSegmentCount={5}
                heightSegmentCount={5}
                radius={1}
                materials={["redColor"]}
                onClick={this.onClick("ViroSphere")}
                           onAnyClick={this.onAnyClick("ViroSphere")}
                           onAnyClicked={this.onAnyClicked("ViroSphere")}
                           onHover={this.onHover("ViroSphere")}
                           onAnyHover={this.onAnyHover("ViroSphere")}
                />

            <ViroSpinner
                position={[1, 0, 0]}
                scale={[0.3, 0.3, 0.1]}
                onClick={this.onClick("ViroSpinner")}
                           onAnyClick={this.onAnyClick("ViroSpinner")}
                           onAnyClicked={this.onAnyClicked("ViroSpinner")}
                           onHover={this.onHover("ViroSpinner")}
                           onAnyHover={this.onAnyHover("ViroSpinner")}/>

        <ViroAnimatedImage
                  position={[2, 0, 0]}
                             width={1.0} height={0.95} scale={[1, 1, 1]}
                             paused={false}
                             source={require("./res/testingGifplz2.gif")}
                             loop={true}
                             placeholderSource={require("./res/grid_bg.jpg")}
                             onClick={this.onClick("ViroAnimatedImage")}
                                        onAnyClick={this.onAnyClick("ViroAnimatedImage")}
                                        onAnyClicked={this.onAnyClicked("ViroAnimatedImage")}
                                        onHover={this.onHover("ViroAnimatedImage")}
                                        onAnyHover={this.onAnyHover("ViroAnimatedImage")} />

            <ViroQuad
                position={[-2, -1, 0]}
                scale={[0.5, 0.5, 0.1]}
                materials={["redColor"]}
                width={1}
                height={1}
                onClick={this.onClick("ViroQuad")}
                           onAnyClick={this.onAnyClick("ViroQuad")}
                           onAnyClicked={this.onAnyClicked("ViroQuad")}
                           onHover={this.onHover("ViroQuad")}
                           onAnyHover={this.onAnyHover("ViroQuad")}/>

            <ViroText
                position={[-1, -1, 0]}
                scale={[0.5 , 0.5, 0.1]}
                style={styles.baseTextTwo}
                text="This is a Viro Text"
                onClick={this.onClick("ViroText")}
                           onAnyClick={this.onAnyClick("ViroText")}
                           onAnyClicked={this.onAnyClicked("ViroText")}
                           onHover={this.onHover("ViroText")}
                           onAnyHover={this.onAnyHover("ViroText")}/>

            <ViroVideo
                position={[0 , -1,0]}
                scale={[0.1, 0.1, 0.1]}
                height={4} width={4}
                onClick={this.onClick("ViroVideo")}
                           onAnyClick={this.onAnyClick("ViroVideo")}
                           onAnyClicked={this.onAnyClicked("ViroVideo")}
                           onHover={this.onHover("ViroVideo")}
                           onAnyHover={this.onAnyHover("ViroVideo")}
                source={{"uri":"https://s3-us-west-2.amazonaws.com/viro/Climber1Top.mp4"}} />

            <ViroText
                    position={[-0.5, -1.5, 0]}
                    scale={[0.5 , 0.5, 0.1]}
                    width={3}
                    style={styles.baseTextTwo}
                    onAnyClicked={this._toggleEvent()}
                    text={"Toggle Text here to: " + this.state.currentEvent}/>
            <ViroText
                    position={[0.8, -1.5, 0]}
                    scale={[0.5 , 0.5, 0.1]}
                    width={3}
                    style={styles.baseTextTwo}
                    onAnyClicked={this._toggleController()}
                    text={"Test Controller: " + this.state.testController}/>
            <ViroText
                    position={[2.0, -1.5, 0]}
                    scale={[0.5 , 0.5, 0.1]}
                    width={3}
                    style={styles.baseTextTwo}
                    onAnyClicked={this._toggleControllerType()}
                    text={"Is Right Controller: " + this.state.isRightController}/>

            <ViroText
                    position={[0, -2.2, 0]}
                    scale={[0.5 , 0.5, 0.1]}
                    width={3}
                    style={styles.baseTextTwo}
                    text={this.state.consoleText}/>

        </ViroNode>
      </ViroScene>

    );
  },
  _toggleController() {
    return() => {
       this.setState({testController:!this.state.testController});
    }
  },

  _toggleControllerType() {
    return() => {

      var isRight = !this.state.isRightController;
      var currentMap = isRight ? "1": "0";
      this.setState({isRightController:isRight,
                      currentController:currentMap});
    }
  },

  _toggleEvent() {
    return() => {
      if (this.state.currentEvent == "None") {
         this.setState({currentEvent:"onClick"});
      } else if (this.state.currentEvent == "onClick") {
         this.setState({currentEvent:"onAnyClick"});
      } else if (this.state.currentEvent == "onAnyClick") {
         this.setState({currentEvent:"onAnyClicked"});
      } else if (this.state.currentEvent == "onAnyClicked") {
         this.setState({currentEvent:"onHover"});
      } else if (this.state.currentEvent == "onHover") {
         this.setState({currentEvent:"onAnyHover"});
      } else if (this.state.currentEvent == "onAnyHover") {
         this.setState({currentEvent:"onThumbstick"});
      } else if (this.state.currentEvent == "onThumbstick") {
         this.setState({currentEvent:"onMove"});
      } else if (this.state.currentEvent == "onMove") {
         this.setState({currentEvent:"onTrigger"});
      } else if (this.state.currentEvent == "onTrigger") {
         this.setState({currentEvent:"onControllerStatus"});
      } else if (this.state.currentEvent == "onControllerStatus") {
         this.setState({currentEvent:"None"});
      }
    }
  },

  _showNext() {
    this.props.sceneNavigator.replace({scene:require('./GroupTestDragEvents')});
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 30,
    color: '#ffffff',
    textAlign: 'center',
  },
  baseTextTwo: {
      fontFamily: 'Arial',
      fontSize: 20,
      color: '#ffffff',
      flex: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  redColor: {
      fresnelExponent: .5,
      shininess: 2.0,
      diffuseColor: "#ff0000"
  },
  blue: {
      shininess: 2.0,
      lightingModel: "Lambert",
      diffuseColor: "#0000ff"
  },
  heart: {
      lightingModel: "Constant",
      diffuseTexture: require('../res/heart_d.jpg'),
    },

  geometryRed: {
    diffuseColor: "#FF0000FF",
  },
 });

module.exports = GroupTestBasicEvents;
