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

}

function OnCollisionEnter(collision: Collision)
{
	if(collision.gameObject.tag == "Player")
	{
		collision.gameObject.GetComponent(PlayerController).Damage(damage);
	
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

function SetDirection(dir: Vector3)
{
	direction = dir;
}