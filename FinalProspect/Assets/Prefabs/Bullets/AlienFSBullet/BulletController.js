#pragma strict

// Private Variables

private var life: float;
private var elapsedLife: float;

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

}

function OnCollisionEnter(collision: Collision)
{
	if(collision.gameObject.tag == "Player")
	{
		collision.gameObject.GetComponent(PlayerController).Damage(5);
	
		Destroy(gameObject);
	}
}