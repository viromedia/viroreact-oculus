<p align="center">
<img src="https://github.com/dthian/viroreact-oculus/blob/master/Logo.png">
</p>

# Viro React Oculus
Viro React is a platform for developers to rapidly build augmented reality (AR) and virtual reality (VR) experiences. Developers write in React Native, and Viro runs their code natively across all mobile VR (including Google Daydream, Samsung Gear VR, and Google Cardboard for iOS and Android) and AR (iOS ARKit and Android ARCore) platforms. [More info here](http://docs.viromedia.com/).

This project contains the Viro framework specifically for the Oculus Quest.

The platform is free to use with no limits on distribution.

To report Oculus-Quest specific bugs/issues with Viro, please file new issues on this repository.

## Instructions for running sample code as a stand alone project:
1. Follow directions on our [Quick start guide](https://docs.viromedia.com/docs/quick-start) to setup dependencies for trying these sample projects with the Viro Media App.
2. Clone the repo into your workspace with git: `git clone https://github.com/viromedia/viro.git`.
3. Go into the code-samples directory.
4. Run `npm install` from the test directory of this project. This should pull down all the dependencies for a default viro workspace.
4A. NOTE: This will be installing a pre-built version of the viro framework. In particular (as shown in the package.json file within code samples), it is targeting the .TGZ prebuilt viro package. This .tgz file represents the Viro React platform (see instructions below on how to rebuild it if needed), in particular, the  `npm install ../react-viro-2.17.0.tgz`.
4B. *Important* if re-installing the viro frame work for the second time, ensure that you remove the previously installed viro package. Do this from within the sample code directory: `rm -rf node_modules/react-viro/`
5. For Android, make sure you have downloaded and installed Android Studio from [here](https://developer.android.com/studio/install) to get required SDK and platform-tools for building android apps
    Make sure you have the required environment variables set - `$ANDROID_HOME`, and added `platform-tools` to `$PATH` variable. If not,
    ```
    export ANDROID_HOME=/YOUR_PATH_TO/Android/sdk
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    export PATH=$ANDROID_HOME/tools:$PATH
    ```
    Build and launch android app by executing the following from the root of the project
    ```
    react-native run-android --variant=ovrDebug
    ```

**Changing Between Samples**
1. Open App.js in a text editor.
3. Modify [scene: scenes['360 Photo Tour']](https://github.com/dthian/viroreact-oculus/blob/master/code-samples/App.js#L37) to a scene defined in the `scenes` dictionary on line 23.
3. Reload/restart the application.

## Instructions for rebuilding the Viro React platform (rebuilding the .TGZ):
1. (Step 1 is Optional) Follow these intstructions if you have re-built the renderer for viro react, in particular, you should have the file "viro_renderer-release.aar". Copy and replace this file from viro/android/viro_renderer/viro_renderer-release.aar to viroreact-oculus/android/viro_renderer/viro_renderer-release.aar.
2. If you haven't already, run npm install within the test directory - make sure all our dependencies are pulled in.
2. Under the viro directory, run `./prepareRelease.sh`.
3. Your android bridge should now be built under release. You should see the .tgz file in the main directory. Something like `../react-viro-2.17.0.tgz`.
4. This .tgz is the new library that all your code samples / tests / etc will be using.

## Instructions for rebuilding the Release Tests:
1. To build android release tests:
   ```
   $ cd test/android
   $ ./gradlew assembleOvrRelease
   ```
2. Install app-gvr-release.apk from `test/android/app/build/output/gvr/app-ovr-release.apk` onto your plugged in Android device.

### Bundling and using built Android bridge into a single npm tar package:
1. The `./prepareRelease.sh` you ran above builds android react bridge and bundles both iOS and Android bridge into a `react-viro-*.tgz` file. * for current version from `package.json` file.


## More information

Check out our [website](http://www.viromedia.com/).

Look at our [documentation](http://docs.viromedia.com/).

Join our Slack group [here](https://join.slack.com/t/virodevelopers/shared_invite/enQtMzI3MzgwNDM2NDM5LTdhMjg5OTJkZGEwYmI0Yzg0N2JkMzJhODVmNmY4YmUyOGY4YjMyZmFmMGFhMTMyMzZiYzU0MGUxMGIzZDFiNjY).

## Sample Code
### Sample Code Overview

A scene with a 360 photo that displays "Hello World".

### [360 Photo Tour](https://github.com/viromedia/viro/tree/master/code-samples/js/360PhotoTour)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/HelloWorld">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/360PhotoTour/360_photo_tour.gif">
</a>

360 photo tour example that shows you how to display a 360 photo with clickable hot spots.

### [Human Body](https://github.com/viromedia/viro/tree/master/code-samples/js/HumanBody)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/HumanBody">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/HumanBody/heart_demo.gif">
</a>

This example showcases 3d objects. Orbit around a 3d Heart to see it from different angles!

### [VR MediaPlayer](https://github.com/viromedia/viro/tree/master/code-samples/js/ViroMediaPlayer)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ViroMediaPlayer">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ViroMediaPlayer/movie_theater.gif">
</a>

Learn how to display and play 2d and 360 video with interactive play controls that can play, pause and stop.

### [Product Showcase](https://github.com/viromedia/viro/tree/master/code-samples/js/ProductShowcase)

<a href="https://github.com/viromedia/viro/tree/master/code-samples/js/ProductShowcase">
<img src="https://raw.githubusercontent.com/viromedia/viro/master/code-samples/js/ProductShowcase/product_showcase.gif">
</a>

Learn how to display and play 2d and 360 video with interactive play controls that can play, pause and stop.
A demonstration on how to do an interactive shopping app for TV's. Uses flexbox for UI and 3d objects with animations.

