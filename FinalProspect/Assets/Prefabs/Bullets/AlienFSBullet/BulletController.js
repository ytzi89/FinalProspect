#pragma strict

// Private Variables
private var speed: float = 6.0;

function Start () {

}

function Update () {

	// Move bullet
	transform.Translate(Vector3(speed, 0 ,0));

}

function GetSpeed()
{
	return speed;
}

function SetSpeed(spd)
{
	speed = spd;
}