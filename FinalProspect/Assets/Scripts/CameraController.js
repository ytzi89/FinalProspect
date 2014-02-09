#pragma strict
//erics commit
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
							50, 
							-120 //- offset
							);
							
	// Update camera rotation
	transform.LookAt(Vector3(
						transform.position.x, 
						7, 
						-5
						));

	// Level bounds
	if(transform.position.x <= -2)
	{
		transform.position.x = -2;
	}
	if(transform.position.x >= 562)
	{
		transform.position.x = 562;
	}

}