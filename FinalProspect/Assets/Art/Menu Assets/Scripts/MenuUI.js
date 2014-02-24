#pragma strict

function Start () {

}

function Update () {

}

function OnGUI()
{
	var style: GUIStyle = new GUIStyle();
	style.fontSize = 25;
	style.alignment = TextAnchor.MiddleCenter;
	style.normal.textColor = Color.white;
	
	var tex: Texture2D = new Texture2D(1, 1);
	tex.SetPixel(0, 0, Color.clear);
	tex.Apply();
	GUI.skin.box.normal.background = tex;
	GUI.Label(Rect(Screen.width * 0.5 - 150, Screen.height * 0.8f, 300, Screen.height * 0.2), "Move: 'ASDW'\tShoot: 'LeftMouse'\tJump: 'Space'\tWeapon: 'Number keys'", style);
}