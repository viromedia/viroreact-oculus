//  Copyright © 2017 Viro Media. All rights reserved.
//
//  Permission is hereby granted, free of charge, to any person obtaining
//  a copy of this software and associated documentation files (the
//  "Software"), to deal in the Software without restriction, including
//  without limitation the rights to use, copy, modify, merge, publish,
//  distribute, sublicense, and/or sell copies of the Software, and to
//  permit persons to whom the Software is furnished to do so, subject to
//  the following conditions:
//
//  The above copyright notice and this permission notice shall be included
//  in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
//  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
//  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
//  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

package com.viromedia.bridge.utility;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.viro.core.EventDelegate;
import com.viro.core.Node;
import com.viro.core.ClickState;
import com.viro.core.Quaternion;
import com.viro.core.Vector;
import com.viromedia.bridge.component.VRTComponent;
import com.viromedia.bridge.component.node.VRTScene;

import java.lang.ref.WeakReference;
import java.util.ArrayList;

/**
 * Represents all java-to-javascript calls that can be triggered from an EventDelegate.
 */
public class ComponentEventDelegate implements EventDelegate.EventDelegateCallback {
    private WeakReference<VRTComponent> weakComponent;
    public ComponentEventDelegate(VRTComponent component){
        weakComponent = new WeakReference<VRTComponent>(component);
    }

    @Override
    public void onHover(int source, Node node, boolean isHovering, float position[]) {
        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableArray positionArray = Arguments.createArray();
        if (position != null && position.length == 3) {
            positionArray.pushDouble(position[0]);
            positionArray.pushDouble(position[1]);
            positionArray.pushDouble(position[2]);
        }

        WritableMap event = Arguments.createMap();
        event.putInt("source", source);
        event.putBoolean("isHovering", isHovering);
        event.putArray("position", positionArray);
        Log.e("Molly"," onAnyHover : " + isHovering + " src: " + node.getTag() + " this: " + this.toString());

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_ANY_HOVER,
                event);
    }

    @Override
    public void onHover(ArrayList<EventDelegate.HoverEvent> arrayList) {
        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.HoverEvent event : arrayList) {
            WritableArray positionArray = Arguments.createArray();
            Vector position = event.intersecPos;
            if (position != null) {
                positionArray.pushDouble(position.x);
                positionArray.pushDouble(position.y);
                positionArray.pushDouble(position.z);
            }

            WritableMap eventOut = Arguments.createMap();
            eventOut.putInt("source", event.source);
            eventOut.putBoolean("isHovering", event.isHovering);
            eventOut.putArray("intersecPos", positionArray);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_HOVER,
                eventsOut);
    }

    @Override
    public void onClick(int source, Node node, ClickState clickState, float position[]) {
        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableArray positionArray = Arguments.createArray();
        if (position != null && position.length == 3) {
            positionArray.pushDouble(position[0]);
            positionArray.pushDouble(position[1]);
            positionArray.pushDouble(position[2]);
        }

        WritableMap event = Arguments.createMap();
        event.putInt("source", source);
        event.putInt("clickState", clickState.getTypeId());
        event.putArray("position", positionArray);

   //     Log.e("Daniel"," onAnyClick : " + clickState + " src: " + node.getTag() + " this: " + this.toString());

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_ANY_CLICK,
                event);
    }

    @Override
    public void onClick(ArrayList<EventDelegate.ButtonEvent> arrayList) {
        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.ButtonEvent event : arrayList) {
            WritableArray positionArray = Arguments.createArray();
            Vector position = event.intersecPos;
            if (position != null) {
                positionArray.pushDouble(position.x);
                positionArray.pushDouble(position.y);
                positionArray.pushDouble(position.z);
            }
            Log.e("Molly"," Component Delegate onClick Java fire " + event.deviceId);

            WritableMap eventOut = Arguments.createMap();
            eventOut.putInt("source", event.source);
            eventOut.putInt("clickState", event.state.getTypeId());
            eventOut.putArray("intersecPos", positionArray);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_CLICK,
                eventsOut);
    }

    @Override
    public void onThumbStickEvent(ArrayList<EventDelegate.ThumbStickEvent> arrayList) {
        Log.e("Molly"," Component Delegate onThumbStickEvent Java fire");

        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.ThumbStickEvent event : arrayList) {
            WritableArray positionArray = Arguments.createArray();
            Vector position = event.axisLocation;
            if (position != null) {
                positionArray.pushDouble(position.x);
                positionArray.pushDouble(position.y);
                positionArray.pushDouble(position.z);
            }

            WritableMap eventOut = Arguments.createMap();
            eventOut.putInt("source", event.source);
            eventOut.putBoolean("isPressed", event.isPressed);
            eventOut.putArray("axisLocation", positionArray);
            Log.e("Startrek", "Startrek deviceId thumbstick: " + event.deviceId);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_THUMBSTICK,
                eventsOut);
    }

    @Override
    public void onWeightedTriggerEvent(ArrayList<EventDelegate.TriggerEvent> arrayList) {
        Log.e("Molly"," Component Delegate onWeightedTriggerEvent Java fire");

        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.TriggerEvent event : arrayList) {
            WritableMap eventOut = Arguments.createMap();
            eventOut.putInt("source", event.source);
            eventOut.putDouble("weight", event.weight);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
            Log.e("Startrek", "Startrek deviceId onWeightedTriggerEvent: " + event.deviceId);

        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_TRIGGER,
                eventsOut);
    }

    @Override
    public void onMove(ArrayList<EventDelegate.MoveEvent> arrayList) {
        //Log.e("Molly"," Component Delegate onMove Java fire");

        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.MoveEvent event : arrayList) {
            WritableArray positionArray = Arguments.createArray();
            Vector position = event.pos;
            if (position != null) {
                positionArray.pushDouble(position.x);
                positionArray.pushDouble(position.y);
                positionArray.pushDouble(position.z);
            }

            WritableArray rotationArray = Arguments.createArray();
            Quaternion rotation = event.rot;
            if (rotation != null) {
                rotationArray.pushDouble(rotation.x);
                rotationArray.pushDouble(rotation.y);
                rotationArray.pushDouble(rotation.z);
                rotationArray.pushDouble(rotation.w);
            }

            WritableMap eventOut = Arguments.createMap();
            eventOut.putInt("source", event.source);
            eventOut.putArray("position", positionArray);
            eventOut.putArray("rotation", rotationArray);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_MOVE,
                eventsOut);
    }

    @Override
    public void onControllerStatus(ArrayList<EventDelegate.ControllerStatus> arrayList) {
        Log.e("Molly"," Component Delegate onControllerStatus Java fire");

        VRTComponent component = weakComponent.get();
        if (component == null){
            return;
        }

        WritableMap eventsOut = Arguments.createMap();
        for (EventDelegate.ControllerStatus event : arrayList) {
            WritableMap eventOut = Arguments.createMap();
            eventOut.putBoolean("isConnected", event.isConnected);
            eventOut.putBoolean("is6Dof", event.is6Dof);
            eventOut.putInt("batteryPercentage", event.batteryPercentage);
            eventsOut.putMap(String.valueOf(event.deviceId), eventOut);
        }

        component.getReactContext().getJSModule(RCTEventEmitter.class).receiveEvent(
                component.getId(),
                ViroEvents.ON_CONTROLLER_STATUS,
                eventsOut);
    }
}
