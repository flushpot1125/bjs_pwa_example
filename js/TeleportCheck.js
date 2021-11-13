var canvas = document.getElementById("renderCanvas");

var createScene = async function () {
    var scene = new BABYLON.Scene(engine);
  //  scene.debugLayer.show();

    var camera = new BABYLON.ArcRotateCamera('MainCamera1', 0, 0, 3, BABYLON.Vector3(0, 1.2, 0), scene, true);
    camera.position = new BABYLON.Vector3(0, 1.2, -1.1); 

    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);
    
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);


   BABYLON.SceneLoader.ImportMeshAsync("", "./model/", "museum.glb", scene).then(function(result) {

   });

   const xrHelper = await scene.createDefaultXRExperienceAsync({
    floorMeshes: [environment.ground]
    });



    return scene;
};

var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene = createScene();

engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});