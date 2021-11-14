var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = async function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
//    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 9, -10), scene);
    var camera = new BABYLON.ArcRotateCamera('MainCamera1', 0, 0, 3, BABYLON.Vector3(0, 1.2, 0), scene, true);
    camera.position = new BABYLON.Vector3(0, 1.2, -1.1); 

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    const floor =[];
    var assetsManager = new BABYLON.AssetsManager(scene);
    assetsManager.onFinish = function (tasks) {
         for (var i=0;i<5;i++){
            floor[i] = scene.getMeshByName("floor_primitive"+i);
        }
        var experience = await scene.createDefaultXRExperienceAsync({
            // define the floor meshes
            floorMeshes: [floor[0], floor[1], floor[2], floor[3], floor[4]]
        });
    };

//    LoadEntity("logo", "BJS-3D-logo_light.000", "scenes/", "babylonJS_logo_v3.babylon", assetsManager, myMesh, 0);

    var meshTask = assetsManager.addMeshTask("museum", "floor_primitive0", "./model/", "museum.glb");
    assetsManager.load();

   // BABYLON.SceneLoader.ImportMeshAsync("", "./model/", "museum.glb", scene).then(function(result) {

    //});

    //const floor =[];
    //var floor_primitive0;
    //var floor_primitive1;

/*
    scene.onBeforeRenderObservable.add(() => {
           // for (var i=0;i<5;i++){
            floor_primitive0 = scene.getMeshByName("floor_primitive0");
             //   console.log(floor_primitive0);
           // }
            
        
    })
*/


  //  var experience = await scene.createDefaultXRExperienceAsync({
        // define the floor meshes
    // floorMeshes: [environment.ground]
  //  });

    //for (var i=0;i<5;i++){
     //   experience.teleportation.addFloorMesh(floor[i]);
    //}

 //   experience.teleportation.addFloorMesh(floor_primitive0);
 //   experience.teleportation.addFloorMesh(floor_primitive1);

    return scene;

};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = createScene();};
initFunction().then(() => {scene.then(returnedScene => { sceneToRender = returnedScene; });
        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});