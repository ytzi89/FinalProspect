﻿#pragma strict

// Public Variables
var playerTarget: GameObject;
var bulletObject: GameObject;

// Private Variables
private var speed: float = 6.0;
private var damage: float = 15.0;
private var atkSpeed: float = 0.4;
private var atkCounter: float = 0.0;
private var direction: int = -1;

private var playerSpotted: boolean = false;

private var isAttacking: boolean = false;

private var health: float = 5.0;

private var permanentY: float;

function Start () {

	playerTarget = GameObject.FindGameObjectWithTag("Player");

	permanentY = transform.position.y = playerTarget.collider.bounds.extents.y * 4;

}

function Update () {

	// Ensure height is correct
	transform.position.y = permanentY;

	if(health <= 0)
		Destroy(gameObject);

	if(DistanceToPlayer() < 30.0)
		playerSpotted = true;


	// If not attacking
	if(!isAttacking)
	{
		// Always face the player
		if(playerTarget.transform.position.x < transform.position.x)
		{
			direction = -1;
		}
		else
		{
			direction = 1;
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
			
			if(playerTarget.transform.position.x != transform.position.x)
			{
				if(playerTarget.transform.position.x > transform.position.x)
					movement.x = speed * Time.deltaTime;
				else
					movement.x = -speed * Time.deltaTime;
			}
				
			if(playerTarget.collider.bounds.center.z - collider.bounds.center.z >= -.5
				&& playerTarget.collider.bounds.center.z - collider.bounds.center.z <= .5
				&& playerTarget.collider.bounds.center.x - collider.bounds.center.x >= -.5
				&& playerTarget.collider.bounds.center.x - collider.bounds.center.x <= .5)
			{
				isAttacking = true;
			}
			
			// Apply movement
			transform.Translate(movement);
		}
	}
	else	// Charge up and shoot
	{
		atkCounter += Time.deltaTime;
		
		if(atkCounter >= atkSpeed)
		{
			Shoot();
			
			isAttacking = false;
			
			atkCounter = 0.0;
		}
	}

}

function DistanceToPlayer()
{
	return (playerTarget.transform.position - transform.position).magnitude;;
}

function Shoot()
{		

	var ypos = transform.position.y - 1;

	var newBullet: GameObject = Instantiate(bulletObject.gameObject, Vector3(transform.position.x, ypos, transform.position.z), Quaternion.identity) as GameObject;
	
	newBullet.gameObject.GetComponent(EnemyBulletController).SetDamage(damage);
	newBullet.gameObject.GetComponent(EnemyBulletController).SetDirection(Vector3(0, -1, 0));
	
	newBullet.transform.localScale.x *= 2;
	newBullet.transform.localScale.y *= 0.5;
	newBullet.transform.localScale.z *= 2;
	
}

function Damage(amount: float)
{
	if(amount > 0)
		health -= amount;
}