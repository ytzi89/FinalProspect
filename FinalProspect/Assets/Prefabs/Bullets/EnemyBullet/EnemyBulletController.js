#pragma strict

// Private Variables

private var life: float;
private var elapsedLife: float;
private var damage: float = 0.0;
private var speed: float = 0.5;

private var direction: Vector3 = Vector3.zero;

function Start () {

	life = 3.0;
	elapsedLife = 0.0;

}

function Update () {

	elapsedLife += Time.deltaTime;
	
	if(elapsedLife >= life)
	{
		Destroy(gameObject);
	}
	
	// Move bullet
	transform.Translate(speed * direction);
	
	CheckCollision();

}

function CheckCollision()
{
	var playerTarget: GameObject = GameObject.FindGameObjectWithTag("Player");
	
	if(collider.bounds.center.x <= playerTarget.collider.bounds.center.x + playerTarget.collider.bounds.extents.x
		&& collider.bounds.center.x >= playerTarget.collider.bounds.center.x - playerTarget.collider.bounds.extents.x)
		{
			if(collider.bounds.center.z <= playerTarget.collider.bounds.center.z + playerTarget.collider.bounds.extents.z
				&& collider.bounds.center.z >= playerTarget.collider.bounds.center.z - playerTarget.collider.bounds.extents.z)
				{
					if(collider.bounds.center.y <= playerTarget.collider.bounds.center.y + playerTarget.collider.bounds.extents.y
						&& collider.bounds.center.y >= playerTarget.collider.bounds.center.y - playerTarget.collider.bounds.extents.y)
						{
							playerTarget.gameObject.GetComponent(PlayerController).Damage(damage);
						
							Destroy(gameObject);
						}
				}
		}
		
	if(transform.position.y < 0)
	{
		Destroy(gameObject);
	}
		
}

function SetDamage(dmg: float)
{
	damage = dmg;
}

function GetDamage(): float
{
	return damage;
}

function SetDirection(dir: Vector3)
{
	direction = dir;
}