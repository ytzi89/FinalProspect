#pragma strict

// Public variables



// Private variables

private var pHealth: float;
private var pSpeed: float;
private var pjumpspeed: float; //control how fast the main character jumps
private var gravity: float; //set the gravity 

function Start () {

	pHealth = 100;
	pSpeed = 8;
	pjumpspeed = 2; //set the speed at which the player jumps 
	gravity = 5;  //set gravity which controls how fast or slow the main character falls

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
			if(Input.GetButton("Jump"))
			{
				movement.y = pjumpspeed;
				
			}
			    //apply the effects of gravity 
				movement.y -= gravity*Time.deltaTime;
		
		
		
	
	
	transform.position += movement;
		
}