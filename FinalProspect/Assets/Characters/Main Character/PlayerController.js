#pragma strict

// Public variables

var boundObject: GameObject;
var lastBoundObject: GameObject;

var playerBullet: GameObject;

var sfxDamaged: AudioClip;
var sfxPistol: AudioClip;
var sfxMachineGun: AudioClip;
var sfxLaser: AudioClip;

// Private variables

private var cameraObject: Camera;

private var pMaxHealth: float;
private var pCurrentHealth: float;
private var pSpeed: float;
private var pJumpSpeed: float; //control how fast the main character jumps
private var direction: float;

// Player damage/gun variables
private var pWeapon: int;
private var pDamage: float;
private var pAttackSpeed: float;
private var pLastAttack: float;

private var northBound: float;
private var southBound: float;
private var westBound: float;
private var eastBound: float;

// Score
private var playerScore: float;

// Animation
var sprites: Sprite[];
private var walkTimer: float = 0.0;

var gameOver: boolean = false;


function Start () {

	pWeapon = 0;	// Starter weapon (pistol)

	playerScore = 0.0;

	cameraObject = GameObject.FindGameObjectWithTag("MainCamera").camera;

	direction = 1;	// Start right

	// Default attack settings
	pDamage = 5.0;
	pAttackSpeed = 0.5;
	pLastAttack = pAttackSpeed;

	// Increase gravity
	Physics.gravity *= 5;

	pMaxHealth = pCurrentHealth = 100;
	pSpeed = 12;
	pJumpSpeed = 20; //set the speed at which the player jumps
	
	northBound = boundObject.transform.position.z + boundObject.collider.bounds.extents.z;
	southBound = boundObject.transform.position.z - boundObject.collider.bounds.extents.z; 
	westBound = boundObject.transform.position.x - boundObject.collider.bounds.extents.x;
	eastBound = lastBoundObject.transform.position.x + boundObject.collider.bounds.extents.x;

}

function Update () {
	
	if(!gameOver)
	{
		if(pCurrentHealth <= 0)
			Death();
	
		Movement();
	
		PlayerActions();
	}
	else
	{
		if(Input.GetKeyDown(KeyCode.Return))
		{
			Application.LoadLevel("Main Menu");
		}
	}
}

function PlayerActions()
{
	if(pLastAttack < pAttackSpeed)
		pLastAttack += Time.deltaTime;

	if(Input.GetMouseButton(0))
	{
		if(pLastAttack >= pAttackSpeed)
			Shoot();
	}
	
	// Switch weapon
	if(Input.GetKeyDown(KeyCode.Alpha1) && pWeapon != 0)
	{
		ChangeWeapon(0);
	}
	if(Input.GetKeyDown(KeyCode.Alpha2) && pWeapon != 1)
	{
		ChangeWeapon(1);
	}
	if(Input.GetKeyDown(KeyCode.Alpha3) && pWeapon != 2)
	{
		ChangeWeapon(2);
	}
}

function Shoot()
{
	if(pWeapon == 0)		// Pistol
		audio.PlayOneShot(sfxPistol, 1.0f);
	else if(pWeapon == 1)	// Machin Gun
		audio.PlayOneShot(sfxMachineGun, 1.0f);
	else if(pWeapon == 2)	// Laser
		audio.PlayOneShot(sfxLaser, 1.0f);

	var mp = Input.mousePosition;
	mp = cameraObject.ScreenToWorldPoint(mp);
	
	var dir:float = mp.x;
	if(dir >= transform.position.x)
		dir = 1;
	else
		dir = -1;

	var xpos = collider.bounds.center.x + (dir * 2);

	var newBullet: GameObject = Instantiate(playerBullet.gameObject,
											Vector3(xpos, transform.position.y, transform.position.z), 
											Quaternion.identity) as GameObject;
											
	newBullet.gameObject.GetComponent(PlayerBulletController).SetDamage(pDamage);
	
	newBullet.gameObject.GetComponent(PlayerBulletController).SetDirection(dir);										
	//newBullet.rigidbody.AddForce(Vector3(dir * 1500, 0, 0));
	
	pLastAttack = 0.0;
}

// Player movement
function Movement()
{
	
	//setting both the horizontal and vertical movement of our character 
	var horizontalMovement = Input.GetAxis("Horizontal") * pSpeed * Time.deltaTime;
	var verticalMovement = Input.GetAxis("Vertical") * pSpeed * 1.5 * Time.deltaTime;// * 0.75;
	//store the horizont and vertical movement into on 3d vector variable
	var movement = Vector3(horizontalMovement, 0, verticalMovement);
	
		
	//if the space bar is pressed jump 
	if(Input.GetKeyDown(KeyCode.Space) && IsGrounded())
	{
		rigidbody.velocity += Vector3.up * pJumpSpeed;
	}
	
	
	transform.Translate(movement);
	
	// Get direction
	if(movement.x > 0.0)
		direction = 1;
	else if(movement.x < 0.0)
		direction = -1;
	
	// Check bounds
	if(transform.position.z - (collider.bounds.extents.z * 0.5) <= southBound)
	{
		transform.position.z = southBound + (collider.bounds.extents.z * 0.5);
	}
	if(transform.position.z + (collider.bounds.extents.z * 0.5) >= northBound)
	{
		transform.position.z = northBound - (collider.bounds.extents.z * 0.5);
	}
	if(transform.position.x - (collider.bounds.extents.x * 0.5) <= westBound)
	{
		transform.position.x = westBound + (collider.bounds.extents.x * 0.5);
	}
	if(transform.position.x + (collider.bounds.extents.x * 0.5) >= eastBound)
	{
		transform.position.x = eastBound - (collider.bounds.extents.x * 0.5);
	}
	
	// Set bounding box
	/*if(Input.GetKeyDown(KeyCode.LeftControl))
	{
		collider.bounds.size.y = 0.15;
		collider.bounds.center.y = -0.15;
	}
	
	if(Input.GetKeyUp(KeyCode.LeftControl))
	{
		collider.bounds.size.y = 0.4;
		collider.bounds.center.y = -0.05;
	}*/
	
	SetAnimation(movement);
		
}

function SetAnimation(move: Vector3)
{
	var spriteRenderer = renderer as SpriteRenderer;
	
	// Flip direction
	var mp = Input.mousePosition;
	mp = cameraObject.ScreenToWorldPoint(mp);
	
	if(mp.x - collider.bounds.center.x > 0)
	{
		if(transform.localScale.x < 0)
			transform.localScale.x *= -1;
	}
	else if(mp.x - collider.bounds.center.x < 0)
	{
		if(transform.localScale.x > 0)
			transform.localScale.x *= -1;
	}

	// Check state
	if(!IsGrounded())
	{
		spriteRenderer.sprite = sprites[(pWeapon * 4) + 3];
	}
	else if(Input.GetKey(KeyCode.LeftControl))
	{
		spriteRenderer.sprite = sprites[(pWeapon * 4) + 2];
	}
	else if(move.magnitude > 0)
	{
		Walk();
	}
	else
	{
		spriteRenderer.sprite = sprites[(pWeapon * 4) + 0];
	}
}

function Walk()
{
	var spriteRenderer = renderer as SpriteRenderer;

	walkTimer += Time.deltaTime;
	
	if(walkTimer >= .15)
	{
		if(spriteRenderer.sprite == sprites[(pWeapon * 4) + 0])
			spriteRenderer.sprite = sprites[(pWeapon * 4) + 1];
		else
			spriteRenderer.sprite = sprites[(pWeapon * 4) + 0];
			
		walkTimer = 0.0;
	}
}

function IsGrounded(): boolean
{
	return Physics.Raycast(transform.position, -Vector3.up, collider.bounds.extents.y + 0.1);
}

function GetAttackSpeed(): float
{
	return pAttackSpeed;
}

function GetLastAttack(): float
{
	return pLastAttack;
}

function GetMaxHealth(): float
{
	return pMaxHealth;
}

function GetCurrentHealth(): float
{
	return pCurrentHealth;
}

function Heal(amount: float)
{
	if(amount > 0)
	{
		pCurrentHealth += amount;
		
		if(pCurrentHealth > pMaxHealth)
		{
			pCurrentHealth = pMaxHealth;
		}
	}
}

function Damage(amount: float)
{
	if(amount > 0)
	{
		audio.PlayOneShot(sfxDamaged, 1.0f);
	
		pCurrentHealth -= amount;
		
		if(pCurrentHealth < 0)
		{
			pCurrentHealth = 0;
		}
	}
}

function GetScore(): float
{
	return playerScore;
}

function AddScore(amount: float)
{
	playerScore += amount;
}

function ChangeWeapon(wpn: int)
{
	pWeapon = wpn;
	
	switch(wpn)
	{
		case 0:	// Pistol
			pDamage = 5.0;
			pAttackSpeed = 0.5;
			pLastAttack = 0.0;
			break;
		case 1:	// Machine gun
			pDamage = 2.0;
			pAttackSpeed = 0.1;
			pLastAttack = 0.0;
			break;
		case 2: // Laser
			pDamage = 15.0;
			pAttackSpeed = 1.5;
			pLastAttack = 0.0;
			break;
	}
}

function GetCurrentWeapon(): int
{
	return pWeapon;
}

function Death()
{
	gameObject.GetComponent(PlayerHealth).gameOver = true;
	
	gameOver = true;
}