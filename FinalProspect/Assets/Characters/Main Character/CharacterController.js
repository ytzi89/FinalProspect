#pragma strict

// Public variables



// Private variables

private var pHealth: float;
private var pSpeed: float;
private var pJumpSpeed: float; //control how fast the main character jumps

function Start () {

	pHealth = 100;
	pSpeed = 8;
	pJumpSpeed = 7; //set the speed at which the player jumps 

}

function Update () {
	
	Movement();
	
}

// Player movement
function Movement()
{
	
	//setting both the horizontal and vertical movement of our character 
	var horizontalMovement = Input.GetAxis("Horizontal") * pSpeed * Time.deltaTime;
	var verticalMovement = Input.GetAxis("Vertical") * pSpeed * Time.deltaTime * 0.75;
	//store the horizont and vertical movement into on 3d vector variable
	var movement = Vector3(horizontalMovement, 0, verticalMovement);
	
		
	
	//if the space bar is pressed jump 
	if(Input.GetKeyDown(KeyCode.Space) && IsGrounded())
	{
		rigidbody.velocity += Vector3.up * pJumpSpeed;
	}
	
		
		
	
	
	transform.position += movement;
		
}

function IsGrounded(): boolean
{
	return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1);
}