#pragma strict

// Public Variables
var playerTarget: GameObject;
var bulletObject: GameObject;

// Private Variables
private var speed: float = 5.0;
private var damage: float = 1.0;
private var atkSpeed: float = 0.75;
private var lastAttack: float = 0.0;
private var direction: int = -1;

private var playerSpotted: boolean = false;

function Start () {

	

}

function Update () {

	if(DistanceToPlayer() < 30.0)
		playerSpotted = true;

	// Always face the player
	if(playerTarget.transform.position.x < transform.position.x)
	{
		direction = -1;
	}
	else
	{
		direction = 1;
	}
	
	// Update attack counter
	if(lastAttack < atkSpeed)
	{
		lastAttack += Time.deltaTime;
	}

	// Player within range
	if(playerSpotted)
	{
		var movement: Vector3 = Vector3.zero;
	
		// Line up with player
		if(playerTarget.transform.position.z > transform.position.z)
			movement.z = speed * Time.deltaTime;
		else
			movement.z = -speed * Time.deltaTime;
			
		if(playerTarget.transform.position.z - transform.position.z >= -1
			&& playerTarget.transform.position.z - transform.position.z <= 1)
		{
			if(CanAttack())
				Shoot();
		}
		
		// Stay within reasonable distance from player
		if(DistanceToPlayer() < 10.0)
		{
			movement.x = speed * (-direction) * Time.deltaTime;
		}
		else if(DistanceToPlayer() > 20.0)
		{
			movement.x = speed * direction * Time.deltaTime;
		}
	}
	
	// Apply movement
	transform.Translate(movement);

}

function DistanceToPlayer()
{
	return (playerTarget.transform.position - transform.position).magnitude;;
}

function CanAttack(): boolean
{
	if(lastAttack >= atkSpeed)
		return true;
		
	return false;
}

function Shoot()
{		
	lastAttack = 0.0;
	
	var xpos: float = transform.position.x + (1 * direction);

	var newBullet: GameObject = Instantiate(bulletObject.gameObject, Vector3(xpos, transform.position.y, transform.position.z), Quaternion.identity) as GameObject;
								
	newBullet.rigidbody.AddForce(Vector3(direction * 1000, 0, 0));
	
}