#pragma strict

// Public variables



// Private variables

private var pHealth: float;
private var pSpeed: float;

function Start () {

	pHealth = 100;
	pSpeed = 8;

}

function Update () {
	
	Movement();
	
}

// Player movement
function Movement()
{

	var horizontalMovement = Input.GetAxis("Horizontal") * pSpeed * Time.deltaTime;
	var verticalMovement = Input.GetAxis("Vertical") * pSpeed * Time.deltaTime * 0.75;
	
	var movement = Vector3(horizontalMovement, 0, verticalMovement);
	
	transform.position += movement;
		
}