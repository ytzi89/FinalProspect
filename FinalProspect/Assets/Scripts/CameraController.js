#pragma strict

// Public variables

var cameraTarget: GameObject;
var offset: float;

// Private variables

function Start () {

}

// Use LateUpdate for camera
function LateUpdate () {

	// Update camera position
	transform.position = Vector3(
							cameraTarget.transform.position.x,
							cameraTarget.transform.position.y + 50, 
							-100 //- offset
							);
							
	// Update camera rotation
	transform.LookAt(Vector3(
						transform.position.x, 
						cameraTarget.transform.position.y + cameraTarget.collider.bounds.extents.y, 
						cameraTarget.transform.position.z
						));

}