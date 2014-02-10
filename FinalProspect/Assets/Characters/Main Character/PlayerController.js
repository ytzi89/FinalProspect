#pragma strict

// Public variables

var boundObject: GameObject;
var lastBoundObject: GameObject;

// Private variables

private var pMaxHealth: float;
private var pCurrentHealth: float;
private var pSpeed: float;
private var pJumpSpeed: float; //control how fast the main character jumps

// Player damage/gun variables
private var pDamage: float;
private var pAttackSpeed: float;

private var southBound: float;
private var westBound: float;
private var eastBound: float;

function Start () {

	// Increase gravity
	Physics.gravity *= 5;

	pMaxHealth = pCurrentHealth = 100;
	pSpeed = 12;
	pJumpSpeed = 20; //set the speed at which the player jumps
	
	southBound = boundObject.transform.position.z - boundObject.collider.bounds.extents.z; 
	westBound = boundObject.transform.position.x - boundObject.collider.bounds.extents.x;
	eastBound = lastBoundObject.transform.position.x + boundObject.collider.bounds.extents.x;

}

function Update () {
	
	Movement();
}

// Player movement
function Movement()
{
	
	//setting both the horizontal and vertical movement of our character 
	var horizontalMovement = Input.GetAxis("Horizontal") * pSpeed * Time.deltaTime;
	var verticalMovement = Input.GetAxis("Vertical") * pSpeed * Time.deltaTime;// * 0.75;
	//store the horizont and vertical movement into on 3d vector variable
	var movement = Vector3(horizontalMovement, 0, verticalMovement);
	
		
	//if the space bar is pressed jump 
	if(Input.GetKeyDown(KeyCode.Space) && IsGrounded())
	{
		rigidbody.velocity += Vector3.up * pJumpSpeed;
	}
	
	
	transform.position += movement;
	
	// Check bounds
	if(transform.position.z - (collider.bounds.extents.z * 0.5) <= southBound)
	{
		transform.position.z = southBound + (collider.bounds.extents.z * 0.5);
	}
	if(transform.position.x - (collider.bounds.extents.x * 0.5) <= westBound)
	{
		transform.position.x = westBound + (collider.bounds.extents.x * 0.5);
	}
	if(transform.position.x + (collider.bounds.extents.x * 0.5) >= eastBound)
	{
		transform.position.x = eastBound - (collider.bounds.extents.x * 0.5);
	}
		
}

function IsGrounded(): boolean
{
	return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1);
}

function GetMaxHealth(): float
{
	return pMaxHealth;
}

function GetCurrentHealth(): float
{
	return pCurrentHealth;
}

function Heal(amount: float)
{
	if(amount > 0)
	{
		pCurrentHealth += amount;
		
		if(pCurrentHealth > pMaxHealth)
		{
			pCurrentHealth = pMaxHealth;
		}
	}
}

function Damage(amount: float)
{
	if(amount > 0)
	{
		pCurrentHealth -= amount;
		
		if(pCurrentHealth < 0)
		{
			pCurrentHealth = 0;
		}
	}
}