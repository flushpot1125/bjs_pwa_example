var canvas = document.getElementById("renderCanvas");

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
  //  scene.debugLayer.show();

    var camera = new BABYLON.ArcRotateCamera('MainCamera1', 0, 0, 3, BABYLON.Vector3(0, 1.2, 0), scene, true);
    camera.position = new BABYLON.Vector3(0, 1.2, -1.1); //3,-1.8,5

    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);
    
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);


    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
    sphere.position = new BABYLON.Vector3(0.5,1,3);
    sphere.scaling = new BABYLON.Vector3(0.5,0.5,0.5);
    var mat = new BABYLON.StandardMaterial("Material", scene);
    mat.diffuseColor = new BABYLON.Color3(0, 0.5, 0.7);
    mat.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    mat.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    sphere.material = mat;

   
   //BABYLON.SceneLoader.ImportMeshAsync("", "./model/", "museum.glb", scene).then(function(result) {

  // });

    var vrHelper = scene.createDefaultVRExperience();
    vrHelper.enableTeleportation({
       floorMeshName: "floor_primitive1"
    });
    vrHelper.enableInteractions();

    const leftHand = BABYLON.Mesh.CreateBox("leftHand",0.1, scene);
    leftHand.scaling.z = 2;
    leftHand.isVisible =false;

    const rightHand = BABYLON.Mesh.CreateBox("rightHand",0.1, scene);
    rightHand.scaling.z = 2;
    rightHand.isVisible =false;

    // Default Environment
  //  var environment = scene.createDefaultEnvironment({ enableGroundShadow: false, groundYBias: 1 });
  //  environment.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"))
    
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