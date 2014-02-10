#pragma strict

// Private variables
private var currentHealth: float;
private var maxHealth: float;

function Start () {

	GetHealthValues();

}

function Update () {

	GetHealthValues();

}

function OnGUI()
{

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
		GUI.Box(Rect(10, 10, (Screen.width - 10) * 0.5, 20), currentHealth + "/" + maxHealth);
	}
	else
	{
		GUI.Box(Rect(10, 10, (Screen.width - 10) * 0.5, 20), "DEAD");
	}

}

function GetHealthValues()
{
	currentHealth = gameObject.GetComponent(PlayerController).GetCurrentHealth();
	maxHealth = gameObject.GetComponent(PlayerController).GetMaxHealth();
}