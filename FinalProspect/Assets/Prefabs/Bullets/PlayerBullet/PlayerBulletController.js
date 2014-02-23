#pragma strict

// Private Variables

private var life: float;
private var elapsedLife: float;
private var damage: float = 0.0;
private var speed: float = 1.0;

private var direction: float = 0.0;

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
	transform.Translate(Vector3(speed * direction, 0, 0));
	
	CheckCollision();

}

function CheckCollision()
{
	var afsArray: GameObject[] = GameObject.FindGameObjectsWithTag("AlienFS");
	var hbArray: GameObject[] = GameObject.FindGameObjectsWithTag("HoverBot");
	
	for(var afs: GameObject in afsArray)
	{
		if((transform.position - afs.transform.position).magnitude < 40.0f)
		{
			if(collider.bounds.center.x <= afs.collider.bounds.center.x + afs.collider.bounds.extents.x
				&& collider.bounds.center.x >= afs.collider.bounds.center.x - afs.collider.bounds.extents.x)
				{
					if(collider.bounds.center.z <= afs.collider.bounds.center.z + afs.collider.bounds.extents.z
						&& collider.bounds.center.z >= afs.collider.bounds.center.z - afs.collider.bounds.extents.z)
						{
							if(collider.bounds.center.y <= afs.collider.bounds.center.y + afs.collider.bounds.extents.y
								&& collider.bounds.center.y >= afs.collider.bounds.center.y - afs.collider.bounds.extents.y)
								{
									afs.gameObject.GetComponent(AFSController).Damage(damage);

									Destroy(gameObject);
								}
						}
				}
		}
	}
	
	for(var hb: GameObject in hbArray)
	{
		if((transform.position - hb.transform.position).magnitude < 40.0f)
		{
			if(collider.bounds.center.x <= hb.collider.bounds.center.x + hb.collider.bounds.extents.x
				&& collider.bounds.center.x >= hb.collider.bounds.center.x - hb.collider.bounds.extents.x)
				{
					if(collider.bounds.center.z <= hb.collider.bounds.center.z + hb.collider.bounds.extents.z
						&& collider.bounds.center.z >= hb.collider.bounds.center.z - hb.collider.bounds.extents.z)
						{
							if(collider.bounds.center.y <= hb.collider.bounds.center.y + hb.collider.bounds.extents.y
								&& collider.bounds.center.y >= hb.collider.bounds.center.y - hb.collider.bounds.extents.y)
								{
									hb.gameObject.GetComponent(HBController).Damage(damage);
								
									Destroy(gameObject);
								}
						}
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

function SetDirection(dir:float)
{
	direction = dir;
}