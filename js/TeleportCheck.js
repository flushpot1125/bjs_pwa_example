var canvas = document.getElementById("renderCanvas");

var createScene = function () {
    var scene = new BABYLON.Scene(engine);
  //  scene.debugLayer.show();

    var camera = new BABYLON.ArcRotateCamera('MainCamera1', 0, 0, 3, BABYLON.Vector3(0, 1.2, 0), scene, true);
    camera.position = new BABYLON.Vector3(0, 1.2, -1.1); //3,-1.8,5
  //  camera.position = new BABYLON.Vector3(3, -1.8, 5);
    camera.attachControl(canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);
    
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);


    var plane = BABYLON.Mesh.CreatePlane("plane", 1);
    plane.position = new BABYLON.Vector3(0, 1, 0)
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var panel = new BABYLON.GUI.StackPanel();    
    advancedTexture.addControl(panel);  
    var header = new BABYLON.GUI.TextBlock();
  //  header.text = "GUIのテスト中";
    header.height = "100px";
    header.color = "black";
    header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    header.fontSize = "120"
    panel.addControl(header); 

   var museumMesh;
   
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


    //no need for teleport
/*
    vrHelper.onControllerMeshLoaded.add((webVRController)=>{
        //left:Y, right:B
        webVRController.onSecondaryButtonStateChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                if(stateObject.pressed === true){
                    console.error("Left Y button  pushed"); 
                              
                }
            }else{
                if(stateObject.pressed === true){
                    console.error("Right B button pushed"); 
                     
                }
                
            }
                
        });
        //left:X, right:A
        webVRController.onMainButtonStateChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
                if(stateObject.pressed === true){
                                  
                }
                
            }else{
                if(stateObject.pressed === true){
                    if(stateObject.pressed === true){
                          
                    }
                    }
                
            }
                
        });
        
        //Trigger button
        var leftLastTriggerValue,rightLastTriggerValue;
        webVRController.onTriggerStateChangedObservable.add((stateObject)=>{
            
            if(webVRController.hand ==='left'){
                if(leftLastTriggerValue < 0.9 && stateObject.value >= 0.9){
                    
                }
                leftLastTriggerValue = stateObject.value;
            }else{
                if(rightLastTriggerValue < 0.9 && stateObject.value >= 0.9){
                    
                }
                rightLastTriggerValue = stateObject.value;
            }
            
                
        });
        
        //secondary trigger button
        var leftLastSecondaryTriggerValue,rightLastSecondaryTriggerValue;
        webVRController.onSecondaryTriggerStateChangedObservable.add((stateObject)=>{
            
            if(webVRController.hand ==='left'){
                if(leftLastSecondaryTriggerValue < 0.9 && stateObject.value >= 0.9){    
                               
                }
                leftLastSecondaryTriggerValue = stateObject.value;
            }else{
                if(rightLastSecondaryTriggerValue < 0.9 && stateObject.value >= 0.9){
                                      
                }
                rightLastSecondaryTriggerValue = stateObject.value;
            }
            
                
        });

        //stick
        
        webVRController.onPadValuesChangedObservable.add((stateObject)=>{
            if(webVRController.hand ==='left'){
               
            }else{

            }   
        });
        
    });
    */

    // Default Environment
    var environment = scene.createDefaultEnvironment({ enableGroundShadow: false, groundYBias: 1 });
    environment.setMainColor(BABYLON.Color3.FromHexString("#74b9ff"))
    




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