﻿#pragma strict
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
						5, 
						-5
						));

	// Level bounds
	if(transform.position.x <= 4)
	{
		transform.position.x = 4;
	}
	if(transform.position.x >= 557)
	{
		transform.position.x = 557;
	}

}