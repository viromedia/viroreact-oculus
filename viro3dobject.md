---
title: "Viro3DObject"
slug: "viro3dobject"
hidden: false
createdAt: "2016-10-18T04:56:31.475Z"
---
A component that displays a 3D Object that is positioned in world space. 

######Example use:
[block:code]
{
  "codes": [
    {
      "code": "{/* Objects need lights to be visible! */}\n<ViroAmbientLight color=\"#ffffff\" />\n  \n<Viro3DObject\n    source={require(\"./res/spaceship.obj\")}\n    resources={[require('./res/spaceship.mtl'),\n                require('./res/texture1.jpg'),\n                require('./res/texture2.jpg'),\n                 require('./res/texture3.jpg')]}\n    highAccuracyGaze={true}\n    position={[1, 3, -5]}\n    scale={[2, 2, 2]}\n    rotation={[45, 0, 0]}\n    type=\"OBJ\"\n    transformBehaviors={[\"billboard\"]}/>",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Model Not Appearing?",
  "body": "1. Try adding a light\n\n```\n<ViroAmbientLight color=\"#FFFFFF\" />\n```\n\n2. Are your materials/textures in the right place? Most OBJ/FBX models expect their materials/textures in the same directory.\n\n3. Is your model scaled/positioned properly? Viro displays the object in a 1 to 1 mapping of vertex coordinates to world space, so if your object coordinates specify a 100x100x100 model, then it'll appear 100x100x100 in Viro."
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Props"
}
[/block]
##Required props
[block:parameters]
{
  "data": {
    "h-0": "PropKey",
    "h-1": "PropType",
    "0-1": "**PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])**\n\nThe object source, a remote URL or a local file resource. OBJ files accepted.\n\nTo invoke with remote OBJ file:\n```\n{uri:\"http://example.org/myobject.obj\"}\n```\n\nTo invoke with local source:\n```\nrequire('./myobject.obj')\n```",
    "0-0": "**source**",
    "1-0": "**type**",
    "1-1": "**type: PropTypes.oneOf(['OBJ', 'VRX'])**\n\nSpecify the 3d model file type being loaded, which can be OBJ or VRX. \n\nVRX is a custom model format for Viro. Currently, FBX files can be converted to VRX. For more information please see our [Assets](doc:importing-assets) Guide."
  },
  "cols": 2,
  "rows": 2
}
[/block]
##Optional Props
[block:parameters]
{
  "data": {
    "0-0": "**animation**",
    "12-0": "**onHover**",
    "17-0": "**onScroll**",
    "21-0": "**opacity**",
    "23-0": "**position**",
    "25-0": "**rotation**",
    "30-0": "**transformBehaviors**",
    "27-0": "**scale**",
    "h-0": "PropKey",
    "h-1": "PropType",
    "0-1": "**PropTypes.shape({\n      name: PropTypes.string,\n      delay: PropTypes.number,\n      loop: PropTypes.bool,\n      onStart: PropTypes.func,\n      onFinish: PropTypes.func,\n      run: PropTypes.bool,\n    })**\n\nA collection of parameters that determine if this component should animate. For more information on animated components please see our [Animation](doc:animation) Guide.",
    "12-1": "**PropTypes.func**\n\nCalled when the user hovers on or off the control.\n\nFor example:\n```  \n_onHover(isHovering, position, source)  {\n    if(isHovering) {\n        // user is hovering over the box\n    } else {\n        // user is no longer hovering over the box\n    }\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.",
    "17-1": "**PropTypes.func**\n\nCalled when the user performs a scroll action, while hovering on the control.\n\nFor example:\n```  \n_onScroll(scrollPos, source)  {\n    // scrollPos[0]: x scroll position from 0.0 to 1.0. \n    // scrollPos[1]: y scroll position from 0.0 to 1.0.\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.\n\nUnsupported VR Platforms: Cardboard(Android and iOS)",
    "21-1": "**PropTypes.number**\n\nA number from 0 to 1 that specifies the opacity of the object. A value of 1 translates into a fully opaque object while 0 represents full transparency.",
    "23-1": "**PropTypes.arrayOf(PropTypes.number)**\n\nCartesian position of the object in 3d world space, specified as [x, y, z].",
    "25-1": "**PropTypes.arrayOf(PropTypes.number)**\n\nThe rotation of the object around it's local axis specified as Euler angles [x, y, z]. Units for each angle are specified in degrees.",
    "27-1": "**PropTypes.arrayOf(PropTypes.number)**\n\nThe scale of the object in 3d space, specified as [x,y,z]. A scale of 1 represents the object's current size. A scale value of < 1 will make the object proportionally smaller while a value >1 will make the object proportionally bigger along the specified axis.",
    "30-1": "**PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string),PropTypes.string**\n\nAn array of transform constraints that affect the transform of the object. For example, putting the value \"billboard\" will ensure the object is facing the user as the user rotates their head on any axis. This is useful for icons or text where you'd like the object to always face the user. \n\nAllowed values(values are case sensitive):\n\n|Value|Description|\n|:------|:----------:|\n|billboard| Billboard object on x,y,z axis |\n|billboardX| Billboard object on the x axis|\n|billboardY| Billboard object on the y axis|",
    "32-0": "**visible**",
    "32-1": "**PropTypes.bool**\n\nFalse if the object should be hidden. By default the object is visible and this value is true.",
    "5-0": "**materials**",
    "5-1": "**PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string),PropTypes.string**\n\nAn array of strings that each represent a material that was created via ViroMaterials.createMaterials(). If materials are set on a Viro3DObject, then any materials in the OBJ file (e.g. materials loaded from the MTL) will be discarded and replaced with these materials.",
    "24-0": "**resources**",
    "24-1": "**PropTypes.oneOfType( [PropTypes.shape( {uri:PropTypes.string} ), PropTypes.number])**\n\nArray of resources that are required by the OBJ file. OBJ files may references MTL files for materials, and various images for textures. In order for the packager to find these resources, they must also be listed here as an array, each with the require() function.",
    "6-0": "**onClick**",
    "6-1": "**React.PropTypes.func**\n\nCalled when an object has been clicked.\n\nExample code:\n```  \n_onClick(position, source)  {\n    // user has clicked the object\n}\n```\nThe position parameter represents the position in world coordinates on the object where the click occurred. \n\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.",
    "7-0": "**onClickState**",
    "7-1": "**React.PropTypes.func**\n\nCalled for each click state an object goes through as it is clicked. Supported click states and their values are the following:\n\n|State Value|Description|\n|:------|:----------:|\n|1| Click Down: Triggered when the user has performed a click down action while hovering on this control.|\n|2| Click Up: Triggered when the user has performed a click up action while hovering on this control.|\n|3| Clicked: Triggered when the user has performed both a click down and click up action on this control sequentially, thereby having \"Clicked\" the object.|\n\nExample code:\n```  \n_onClickState(stateValue, position, source)  {\n    if(stateValue == 1) {\n        // Click Down\n    } else if(stateValue == 2) {\n        // Click Up\n    } else if(stateValue == 3) { \n        // Clicked\n    }\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.",
    "9-0": "**onDrag**",
    "9-1": "**PropTypes.func**\n\nCalled when the view is currently being dragged. The dragToPos parameter provides the current 3D location of the dragged object. \n\nExample code:\n```  \n_onDrag(dragToPos, source)  {\n    // dragtoPos[0]: x position\n    // dragtoPos[1]: y position\n    // dragtoPos[2]: z position\n}\n``` \nFor the mapping of sources to controller inputs, see the [Events](doc:events) section. \n\nUnsupported VR Platforms: Cardboard iOS",
    "10-0": "**onError**",
    "10-1": "**PropTypes.func**\n\nCallback invoked when the OBJ model fails to load. The error message is contained in event.nativeEvent.error",
    "13-0": "**onLoadEnd**",
    "13-1": "**PropTypes.func**\n\nCallback invoked when the OBJ finishes loading, whether successful or in error.",
    "14-0": "**onLoadStart**",
    "14-1": "**PropTypes.func**\n\nCallback invoked when the OBJ file starts loading.",
    "18-0": "**onSwipe**",
    "18-1": "**PropTypes.func**\n\nCalled when the user performs a swipe gesture on the physical controller, while hovering on this control. \n\nFor example:\n```  \n_onSwipe(state, source)  {\n    if(state == 1) {\n        // Swiped up\n    } else if(state == 2) {\n        // Swiped down\n    } else if(state == 3) { \n       // Swiped left\n    } else if(state == 4) { \n       // Swiped right\n    }\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.\n\nUnsupported VR Platforms: Cardboard(Android and iOS)",
    "19-0": "**onTouch**",
    "19-1": "**PropTypes.func**\n\nCalled when the user performs a touch action, while hovering on the control. Provides the touch state type, and the x/y coordinate at which this touch event has occurred.\n\n|State Value|Description|\n|:------|:----------:|\n|1| Touch Down: Triggered when the user  makes physical contact with the touch pad on the controller. |\n|2| Touch Down Move: Called when the user moves around the touch pad immediately after having performed a Touch Down action. |\n|3| Touch Up: Triggered after the user is no longer in physical contact with the touch pad after a Touch Down action. |\n\nFor example:\n```  \n_onTouch(state, touchPos, source)  {\n   var touchX = touchPos[0];\n   var touchY = touchPos[1];\n    if(state == 1) {\n        // Touch Down\n    } else if(state == 2) {\n        // Touch Down Move\n    } else if(state == 3) { \n        // Touch Up\n    }\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.\n\nUnsupported VR Platforms: Cardboard(Android and iOS).",
    "11-1": "**PropTypes.oneOfType**\n```  \nPropTypes.oneOfType([\n      React.PropTypes.shape({\n        callback: React.PropTypes.func.isRequired,\n        timeToFuse: PropTypes.number\n      }),\n      React.PropTypes.func,\n])\n```  \nAs shown above, onFuse takes one of the types - either a callback, or a dictionary with a callback and duration. \n\nIt is called after the user hovers onto and remains hovered on the control for a certain duration of time, as indicated in timeToFuse that represents the duration of time in milliseconds. \n\nWhile hovering, the reticle will display a count down animation while fusing towards timeToFuse.\n\nNote that timeToFuse defaults to 2000ms.\n\nFor example:\n```  \n_onFuse(source){\n   // User has hovered over object for timeToFuse milliseconds\n}\n```\nFor the mapping of sources to controller inputs, see the [Events](doc:events) section.",
    "11-0": "**onFuse**",
    "28-0": "**scalePivot**",
    "26-0": "**rotationPivot**",
    "3-0": "**ignoreEventHandling**",
    "2-0": "**highAccuracyGaze**",
    "2-1": "**PropTypes.bool**\n\nTrue if onHover events should use the geometry of the object to determine if the user is hovering over this object. If false, the object's axis-aligned bounding box will be used instead. High accuracy gazing is more accurate but takes more processing power, so it is set to false by default.",
    "4-0": "**lightReceivingBitMask**",
    "29-0": "**shadowCastingBitMask**",
    "20-0": "**onTransformUpdate**",
    "1-0": "**dragType**",
    "15-0": "**onPinch**",
    "16-0": "**onRotate**",
    "22-0": "**physicsBody**",
    "8-0": "**onCollision**",
    "31-0": "**viroTag**",
    "1-1": "**PropTypes.oneOf([\"FixedDistance\", \"FixedToWorld\"])**\n\nDetermines the behavior of drag if **onDrag** is specified.\n\n|Value|Description|\n|:------|:----------:|\n|FixedDistance| Dragging is limited to a fixed radius around the user|\n|FixedToWorld| Dragging is based on intersection with real world objects. **Available only in AR** |\n\nThe default value is \"FixedDistance\".",
    "3-1": "**PropTypes.bool**\n\nWhen set to true, this control will ignore events and not prevent controls behind it from receiving event callbacks.\n\nThe default value is false.",
    "4-1": "**PropTypes.number**\n\nA bit mask that is bitwise and-ed (&) with each light's influenceBitMask. If the result is > 0, then the light will illuminate this object. For more information please see the [Lighting and Materials](doc:3d-scene-lighting) Guide.",
    "15-1": "**PropTypes.func**\n\nCalled when the user performs a pinch gesture on the control. When the pinch starts, the scale factor is set to 1 is relative to the points of the two touch points.  \n\nFor example:\n```\n  _onPinch(pinchState, scaleFactor, source) {\n       if(pinchState == 3) {\n      // update scale of obj by multiplying by scaleFactor  when pinch ends.\n        return;\n       }\n     //set scale using native props to reflect pinch.\n  }\n```\npinchState can be the following values:\n\n|State Value|Description|\n|:------|:----------:|\n|1| Pinch Start: Triggered when the user has started a pinch gesture.|\n|2| Pinch Move: Triggered when the user has adjusted the pinch, moving both fingers. |\n|3| Pinch End: When the user has finishes the pinch gesture and released both touch points. |\n\n**This event is only available in AR**.",
    "16-1": "**PropTypes.func**\n\nCalled when the user performs a rotation touch gesture on the control. Rotation factor is returned in degrees.\n\nWhen setting rotation, the rotation should be relative to it's current rotation, *not* set to the absolute value of the given rotationFactor.\n\nFor example:\n\n```\n    _onRotate(rotateState, rotationFactor, source) {\n\n      if (rotateState == 3) {\n        //set to current rotation - rotationFactor.\n        return;\n      }\n     //update rotation using setNativeProps\n    },\n\n```\nrotationState can be the following values:\n\n|State Value|Description|\n|:------|:----------:|\n|1| Rotation Start: Triggered when the user has started a rotation gesture.|\n|2| Rotation Move: Triggered when the user has adjusted the rotation, moving both fingers. |\n|3| Rotation End: When the user has finishes the rotation gesture and released both touch points. |\n\n**This event is only available in AR**.",
    "26-1": "**PropTypes.arrayOf(PropTypes.number) **\n\nCartesian position in [x,y,z] about which rotation is applied relative to the component's position.",
    "28-1": "**PropTypes.arrayOf(PropTypes.number) **\n\nCartesian position in [x,y,z] from which scale is applied relative to the component's position.",
    "29-1": "**PropTypes.number**\n\nA bit mask that is bitwise and-ed (&) with each light's influenceBitMask. If the result is > 0, then this object will cast shadows from the light. For more information please see the [Lighting and Materials](doc:3d-scene-lighting) Guide.",
    "8-1": "**PropTypes.func**\n\nCalled when this component's physics body collides with another component's physics body. Also invoked by [ViroScene](doc:viroscene)/[ViroARScene](doc:viroarscene)'s `findCollisions...` functions.\n\n|Return Value | Description |\n|---|---|\n|viroTag | the given viroTag (string) of the collided component |\n|collidedPoint | an array of numbers representing the position, in world coordinates, of the point of collision|\n|collidedNormal | an array representing the normal of the collision in world coordinates. |",
    "20-1": "**PropTypes.func**\n\nA function that is invoked when the component moves and provides an array of numbers representing the component's position in world coordinates.",
    "22-1": "**PropTypes.shape({..[physics.api](https://docs.viromedia.com/docs/physics#physicsbody-api)..}),**\n\nCreates and binds a physics body that is configured with the provided collection of physics properties associated with this control.\n\nFor more information on physics components, please see the [physics.api](https://docs.viromedia.com/docs/physics#physicsbody-api).",
    "31-1": "**PropTypes.string**\n\nA tag given to other components when their physics body collides with this component's physics body. Refer to [physics](doc:physics) for more information."
  },
  "cols": 2,
  "rows": 33
}
[/block]

[block:api-header]
{
  "title": "Methods"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "async getBoundingBoxAsync()",
    "0-0": "[Async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function that returns the component's bounding box in world coordinates.\n\nReturns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will be completed with the following object:\n\n```\n{\n    `boundingBox` : {\n        `minX` : number,\n        `maxX` : number, \n        `minY` : number,\n        `maxY` : number,\n        `minZ` : number,\n        `maxZ` : number\n    }\n}\n```"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "async getTransformAsync()",
    "0-0": "[Async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) function that returns the component's transform (position, scale and rotation).\n\n|Return value | Description|\n|---|---|\n| transform | an object that contains \"position\", \"scale\" and \"rotation\" keys which point to number arrays |"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "applyImpulse(force: arrayOf(number), position: arrayOf(number))",
    "0-0": "A function used with [physics](doc:physics) to apply an impulse (instantaneous) force to an object with a physics body.\n\n|Parameter|Description|\n|---|---|\n|force |an array of magnitudes to be applied as force (N) to the object in the positive x, y and z directions|"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "applyTorqueImpulse(torque: arrayOf(number), position: arrayOf(number))",
    "0-0": "A function used with [physics](doc:physics) to apply an impulse (instantaneous) torque to an object with a physics body.\n\n|Parameter|Description|\n|---|---|\n|torque |an array of magnitudes to be applied as a torque (N * m) to the object in the positive x, y and z directions at the given position|\n|position | a position relative to the object from which to apply the given torque|"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "setVelocity(velocity: arrayOf(number))",
    "0-0": "A function used with [physics](doc:physics) to set the velocity of an object with a physics body.\n\n|Parameter|Description|\n|---|---|\n|velocity | an array of numbers corresponding to x, y, and z velocity |"
  },
  "cols": 1,
  "rows": 1
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "setNativeProps(nativeProps: object)",
    "0-0": "A wrapper function around the native component's setNativeProps which allow users to set values on the native component without changing state/setting props and re-rendering. Refer to the React Native documentation on [Direct Manipulation](https://facebook.github.io/react-native/docs/direct-manipulation.html) for more information.\n\n|Parameter|Description|\n|---|---|\n|nativeProps | an object where the keys are the properties to set and the values are the values to set  |\n\nFor example, setting position natively would look like this:\n\n```\ncomponentRef.setNativeProps({\n    position : [0, 0, -1]\n});\n```"
  },
  "cols": 1,
  "rows": 1
}
[/block]