//
//  VRTARScene.mm
//  ViroReact
//
//  Created by Andy Chu on 6/13/17.
//  Copyright © 2017 Viro Media. All rights reserved.
//

#import <ViroKit/ViroKit.h>
#import "VRTARScene.h"
#import "VRTARNode.h"
#import "VRTARPlane.h"

@implementation VRTARScene {
    std::shared_ptr<VROARScene> _vroArScene;
}

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithBridge:bridge];
    return self;
}

- (void)initSceneController {
    // Create VROARSceneController.
    self.sceneController = std::make_shared<VROARSceneController>();
    
    // Create and attach delegate
    self.delegate = std::make_shared<VROSceneControllerDelegateiOS>(self);
    self.sceneController->setDelegate(self.delegate);
    
    //Set root node for this scene
    self.sceneController->getScene()->addNode(self.node);
    
    _vroArScene = std::dynamic_pointer_cast<VROARScene>(self.sceneController->getScene());
}

- (void)insertReactSubview:(UIView *)view atIndex:(NSInteger)atIndex {
    VRTView *child = (VRTView *)view;
    if ([child isKindOfClass:[VRTARPlane class]]) {
        VRTARPlane *arPlane = (VRTARPlane *)child;
        _vroArScene->addARPlane(std::dynamic_pointer_cast<VROARPlane>(arPlane.node));
    }
    [super insertReactSubview:view atIndex:atIndex];
}

@end