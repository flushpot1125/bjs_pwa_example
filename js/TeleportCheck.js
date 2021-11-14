var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = async function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
    scene.debugLayer.show();// It is no matter even if the code is not included.
    var experience = await scene.createDefaultXRExperienceAsync({
    });

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
         for (var i=0;i<6;i++){
            floor[i] = scene.getMeshByName("floor_primitive"+i);
            experience.teleportation.addFloorMesh(floor[i]);
        }
       
    };


    var meshTask = assetsManager.addMeshTask("museum", "", "./model/", "museum.glb");
    assetsManager.load();

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