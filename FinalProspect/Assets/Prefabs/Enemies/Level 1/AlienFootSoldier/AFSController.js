#pragma strict

// Public Variables
var playerTarget: GameObject;
var bulletObject: GameObject;

// Private Variables
private var speed: float = 5.0;
private var damage: float = 5.0;
private var atkSpeed: float = 0.75;
private var lastAttack: float = 0.0;
private var direction: int = -1;

private var playerSpotted: boolean = false;

private var health: float = 10.0;

private var scoreValue: float = 10.0;

// AlienFS Array
var afsArray: GameObject[];

function Start () {

	transform.localScale.x *= -1;

	playerTarget = GameObject.FindGameObjectWithTag("Player");

	afsArray = GameObject.FindGameObjectsWithTag("AlienFS");

}

function Update () {

	if(health <= 0)
	{
		Death();
	}

	if(DistanceToPlayer() < 20.0)
		playerSpotted = true;

	// Always face the player
	if(playerTarget.transform.position.x < transform.position.x)
	{
		direction = -1;
		
		if(transform.localScale.x > 0)
			transform.localScale.x *= -1;
	}
	else
	{
		direction = 1;
		
		if(transform.localScale.x < 0)
			transform.localScale.x *= -1;
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
		if(playerTarget.transform.position.z != transform.position.z)
		{
			if(playerTarget.transform.position.z > transform.position.z)
				movement.z = speed * 1.5 * Time.deltaTime;
			else
				movement.z = -speed * 1.5 * Time.deltaTime;
		}
			
		if(playerTarget.transform.position.z - transform.position.z >= -.25
			&& playerTarget.transform.position.z - transform.position.z <= .25)
		{
			if(CanAttack())
				Shoot();
		}
		
		// Stay within reasonable distance from player
		if(DistanceToPlayer() < 10.0)
		{
			movement.x = speed * (-direction) * Time.deltaTime;
		}
		else if(DistanceToPlayer() > 15.0)
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
	if(lastAttack >= atkSpeed
		&& playerTarget.transform.position.x - transform.position.x <= 15
		&& playerTarget.transform.position.x - transform.position.x >= -15)
		return true;
		
	return false;
}

function Shoot()
{		
	lastAttack = 0.0;
	
	var xpos: float = transform.position.x + (1 * direction);

	var newBullet: GameObject = Instantiate(bulletObject.gameObject, Vector3(xpos, transform.position.y, transform.position.z), Quaternion.identity) as GameObject;
	
	newBullet.gameObject.GetComponent(EnemyBulletController).SetDamage(damage);
	newBullet.gameObject.GetComponent(EnemyBulletController).SetDirection(Vector3(direction, 0, 0));
	
	newBullet.transform.localScale.x *= 1.0;
	newBullet.transform.localScale.y *= 0.5;
	newBullet.transform.localScale.z *= 0.5;
	
}

function Damage(amount: float)
{
	if(amount > 0)
		health -= amount;
}

function Death()
{
	playerTarget.GetComponent(PlayerController).AddScore(scoreValue);

	Destroy(gameObject);
}