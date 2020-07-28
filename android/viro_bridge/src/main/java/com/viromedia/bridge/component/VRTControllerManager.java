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

package com.viromedia.bridge.component;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.viromedia.bridge.component.node.control.VRTVideoSurface;
import com.viromedia.bridge.utility.ViroEvents;

import java.util.Map;

public class VRTControllerManager extends VRTViroViewGroupManager<VRTController> {

    public VRTControllerManager(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "VRTController";
    }

    @Override
    public VRTController createViewInstance(ThemedReactContext reactContext) {
        return new VRTController(reactContext);
    }

    @ReactProp(name = "controllerVisibility", defaultBoolean = VRTController.DEFAULT_CONTROLLER_VISIBILITY)
    public void setControllerVisibility(VRTController view, boolean controllerVisibility) {
        view.setControllerVisibility(controllerVisibility);
    }

    @ReactProp(name = "enabledClick", defaultBoolean = VRTController.DEFAULT_ENABLED_CLICK)
    public void setEnabledClick(VRTController view, boolean clickEnabled) {
        view.setClickEnabled(clickEnabled);
    }

    @ReactProp(name = "enabledHover", defaultBoolean = VRTController.DEFAULT_ENABLED_HOVER)
    public void setEnabledHover(VRTController view, boolean hoverEnabled) {
        view.setHoverEnabled(hoverEnabled);
    }

    @ReactProp(name = "enabledMove", defaultBoolean = VRTController.DEFAULT_ENABLED_MOVE)
    public void setEnabledMove(VRTController view, boolean moveEnabled) {
        view.setMoveEnabled(moveEnabled);
    }

    @ReactProp(name = "enabledThumbstick", defaultBoolean = VRTController.DEFAULT_ENABLED_THUMBSTICK)
    public void setEnabledThumbstick(VRTController view, boolean thumstickEnabled) {
        view.setThumbstickEnabled(thumstickEnabled);
    }

    @ReactProp(name = "enabledTrigger", defaultBoolean = VRTController.DEFAULT_ENABLED_TRIGGER)
    public void setEnabledTrigger(VRTController view, boolean triggerEnabled) {
        view.setTriggerEnabled(triggerEnabled);
    }

    @ReactProp(name = "enabledControllerStatus", defaultBoolean = VRTController.DEFAULT_ENABLED_GET_CONTROLLER_STATUS)
    public void setEnabledControllerStatus(VRTController view, boolean canGetControllerStatus) {
        view.setControllerStatusEnabled(canGetControllerStatus);
    }

    @ReactProp(name = "lightReceivingBitMask", defaultInt = -1)
    public void setLightReceivingBitMask(VRTController view, int bitMask) {
        view.setLightReceivingBitMask(bitMask);
    }

    @ReactProp(name = "reticleVisibility", defaultBoolean = VRTController.DEFAULT_RETICLE_VISIBILITY)
    public void setReticleVisibility(VRTController view, boolean reticleVisibility) {
        view.setReticleVisibility(reticleVisibility);
    }

    @ReactProp(name = "stickyReticle", defaultBoolean = true)
    public void setStickyReticle(VRTController view, boolean sticky) {
        view.setReticleSticky(sticky);
    }

    @ReactProp(name = "forceRender", defaultBoolean = true)
    public void setForceRender(VRTController view, boolean forced) {
        view.setForceRender(forced);
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        Map events = super.getExportedCustomDirectEventTypeConstants();
        events.put(ViroEvents.ON_ANY_CLICK, MapBuilder.of("registrationName", ViroEvents.ON_ANY_CLICK));
        events.put(ViroEvents.ON_ANY_HOVER, MapBuilder.of("registrationName", ViroEvents.ON_ANY_HOVER));
        events.put(ViroEvents.ON_CLICK, MapBuilder.of("registrationName", ViroEvents.ON_CLICK));
        events.put(ViroEvents.ON_HOVER, MapBuilder.of("registrationName", ViroEvents.ON_HOVER));
        events.put(ViroEvents.ON_MOVE, MapBuilder.of("registrationName", ViroEvents.ON_MOVE));
        events.put(ViroEvents.ON_THUMBSTICK, MapBuilder.of("registrationName", ViroEvents.ON_THUMBSTICK));
        events.put(ViroEvents.ON_TRIGGER, MapBuilder.of("registrationName", ViroEvents.ON_TRIGGER));
        events.put(ViroEvents.ON_CONTROLLER_STATUS, MapBuilder.of("registrationName", ViroEvents.ON_CONTROLLER_STATUS));
        return events;
    }
}
