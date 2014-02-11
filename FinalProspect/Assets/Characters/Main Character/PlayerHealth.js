#pragma strict

// Private variables
private var currentHealth: float;
private var maxHealth: float;

private var attackSpeed: float;
private var lastAttack: float;

function Start () {

	GetHealthValues();
	GetAttackValues();

}

function Update () {

	GetHealthValues();
	GetAttackValues();

}

function OnGUI()
{

	// Health bar
	var tex: Texture2D = new Texture2D(1, 1);
	tex.SetPixel(0, 0, Color.grey);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(10, 10, (Screen.width - 10) * 0.5, 20), "");
	
	tex.SetPixel(0, 0, Color.red);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect((Screen.width - 10) * 0.5 * (1 - currentHealth / maxHealth) + 10, 10, 
			((Screen.width - 10) * 0.5) * (currentHealth / maxHealth), 20), "");
	
	
	tex.SetPixel(0, 0, Color.clear);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
		
	if(currentHealth > 0)
	{
		GUI.Box(Rect(10, 10, (Screen.width - 10) * 0.5, 20), "Health: " + currentHealth + "/" + maxHealth);
	}
	else
	{
		GUI.Box(Rect(10, 10, (Screen.width - 10) * 0.5, 20), "DEAD");
	}
	
	// Attack bar
	tex.SetPixel(0, 0, Color.grey);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5, 10, (Screen.width - 10) * 0.5, 20), "");
	
	tex.SetPixel(0, 0, Color.black);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5, 10, ((Screen.width - 10) * 0.5) * (lastAttack / attackSpeed), 20), "");
	
	tex.SetPixel(0, 0, Color.clear);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Box(Rect(Screen.width * 0.5, 10, (Screen.width - 10) * 0.5, 20), "Fire Rate: " + (1 / attackSpeed) + " Per Second");

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