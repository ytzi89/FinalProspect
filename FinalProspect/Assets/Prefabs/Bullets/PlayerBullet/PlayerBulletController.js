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

}

function OnCollisionEnter(collision: Collision)
{
	if(collision.gameObject.tag == "AlienFS")
	{
		collision.gameObject.GetComponent(AFSController).Damage(damage);
	
		Destroy(gameObject);
	}
	else if(collision.gameObject.tag == "HoverBot")
	{
		collision.gameObject.GetComponent(HBController).Damage(damage);
		
		Destroy(gameObject);
	}
	
	if(collision.gameObject.tag == "Ground")
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