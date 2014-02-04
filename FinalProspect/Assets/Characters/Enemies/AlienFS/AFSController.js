#pragma strict

// Public Variables
var playerTarget: GameObject;


// Private Variables
private var speed: float = 3.0;
private var damage: float = 1.0;
private var atkspeed: float = 1.0;
private var canAttack: int = 1;
private var lastAttack: float = 0.0;
private var direction: int = 0;

var bulletObject: Transform;
private var bullets = new Array();

function Start () {

	

}

function Update () {

	// Player within range
	if((playerTarget.transform.position - transform.position).magnitude < 50.0)
	{
		var movement: Vector3 = Vector3.zero;
	
		// Line up with player
		if(playerTarget.transform.position.z > transform.position.z)
			movement.z = speed * Time.deltaTime;
		else
			movement.z = -speed * Time.deltaTime;
			
		if(playerTarget.transform.position.z - transform.position.z >= -5
			&& playerTarget.transform.position.z - transform.position.z <= 5)
		{
			if(canAttack)
				Shoot();
		}
	}
	
	// Apply movement
	transform.Translate(movement);

}

function Shoot()
{

	canAttack = 0;

	var zpos: float;
	if(direction == 0)
		zpos = transform.position.x - 1;
	else
		zpos = transform.position.x + 1;
		
	var newBullet: Transform = GameObject.Instantiate(bulletObject, 
											Vector3(zpos, 
											transform.position.y + (collider.bounds.extents.y * 0.5), 
											transform.position.z), 
											Quaternion.identity);
							
	// Add to array
	bullets.Push(newBullet);
		
}