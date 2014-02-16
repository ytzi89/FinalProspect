#pragma strict

// Public variables

var tHealthBar: Texture2D;
var tCooldownBar: Texture2D;
var tScoreBar: Texture2D;

// Gun icons
var pistolGun: Texture2D;
var machineGun: Texture2D;
var laserGun: Texture2D;

// Private variables
private var currentHealth: float;
private var maxHealth: float;

private var attackSpeed: float;
private var lastAttack: float;

private var playerScore: float;

function Start () {

	GetHealthValues();
	GetAttackValues();
	GetPlayerScore();

}

function Update () {

	GetHealthValues();
	GetAttackValues();
	GetPlayerScore();

}

function OnGUI()
{

	// Health bar
	var tex: Texture2D = new Texture2D(1, 1);
	GUI.skin.box.normal.background = tHealthBar;
	GUI.Box(Rect(25, 35, (Screen.width - 150) * 0.5, 55), "");
	
	tex.SetPixel(0, 0, Color.gray);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(35, 50, (Screen.width - 190) * 0.5, 25), "");
	
	tex.SetPixel(0, 0, Color.red);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect((Screen.width - 190) * 0.5 * (1 - currentHealth / maxHealth) + 35, 50, 
			((Screen.width - 190) * 0.5) * (currentHealth / maxHealth), 25), "");
	
	
	tex.SetPixel(0, 0, Color.clear);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
		
	if(currentHealth > 0)
	{
		GUI.Box(Rect(35, 50, (Screen.width - 190) * 0.5, 25), "Health: " + currentHealth + "/" + maxHealth);
	}
	else
	{
		GUI.Box(Rect(35, 50, (Screen.width - 190) * 0.5, 25), "DEAD");
	}
	
	// Attack bar
	GUI.skin.box.normal.background = tCooldownBar;
	GUI.Box(Rect(Screen.width * 0.5 + 50, 35, (Screen.width - 150) * 0.5, 55), "");
	
	tex.SetPixel(0, 0, Color.gray);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5 + 60, 50, (Screen.width - 190) * 0.5, 25), "");
	
	tex.SetPixel(0, 0, Color.black);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5 + 60, 50, ((Screen.width - 190) * 0.5) * (lastAttack / attackSpeed), 25), "");
	
	tex.SetPixel(0, 0, Color.clear);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5 + 60, 50, (Screen.width - 190) * 0.5, 25), "Fire Rate: " + (1 / attackSpeed) + " Per Second");
	
	// Score
	GUI.skin.box.normal.background = tScoreBar;
	GUI.Box(Rect(Screen.width * 0.5 - 60, 10, 120, 100), "");
	
	var style: GUIStyle = new GUIStyle();
	style.fontSize = 25;
	style.alignment = TextAnchor.MiddleCenter;
	style.normal.textColor = Color.white;
	
	GUI.Label(Rect(Screen.width * 0.5 - 50, 30, 100, 25), "Score", style);
	
	GUI.Label(Rect(Screen.width * 0.5 - 50, 60, 100, 25), playerScore.ToString(), style);
	
	var currWeapon: int = gameObject.GetComponent(PlayerController).GetCurrentWeapon();
	
	// Weapon inventory
	CreateIcon(Screen.width * 0.5 - 258, Screen.height * 0.9, currWeapon == 0 ? true : false, pistolGun);
	CreateIcon(Screen.width * 0.5 - 64, Screen.height * 0.9, currWeapon == 1 ? true : false, machineGun);
	CreateIcon(Screen.width * 0.5 + 128, Screen.height * 0.9, currWeapon == 2 ? true : false, laserGun);

}

function CreateIcon(xpos: int, ypos: int, current: boolean, gunTex: Texture2D)
{
	var newTex: Texture2D = new Texture2D(1, 1);
	
	if(current)
		newTex.SetPixel(0, 0, Color.red);
	else
		newTex.SetPixel(0, 0, Color.black);
	newTex.Apply();
	GUI.skin.box.normal.background = newTex;
	GUI.Box(Rect(xpos, ypos, 138, 74), "");
	
	GUI.skin.box.normal.background = gunTex;
	GUI.Box(Rect(xpos + 5, ypos + 5, 128, 64), "");
}

function GetHealthValues()
{
	currentHealth = gameObject.GetComponent(PlayerController).GetCurrentHealth();
	maxHealth = gameObject.GetComponent(PlayerController).GetMaxHealth();
}

function GetAttackValues()
{
	attackSpeed = gameObject.GetComponent(PlayerController).GetAttackSpeed();
	lastAttack = gameObject.GetComponent(PlayerController).GetLastAttack();
	
	if(lastAttack > attackSpeed)
		lastAttack = attackSpeed;
}

function GetPlayerScore()
{
	playerScore = gameObject.GetComponent(PlayerController).GetScore();
}