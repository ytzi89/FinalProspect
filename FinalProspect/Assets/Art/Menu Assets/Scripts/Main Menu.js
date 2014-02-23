var isQuit: boolean;

var buttonText: GameObject;

function OnMouseEnter(){
	//change text color
	buttonText.gameObject.GetComponent(TextMesh).color = Color.red;
}

function OnMouseExit(){
	//change text color
	buttonText.gameObject.GetComponent(TextMesh).color = Color.blue;
}

function OnMouseUp(){
	//is this quit
	if (isQuit==true) {
		//quit the game
		Application.Quit();
	}
	else {
		//load level
		Application.LoadLevel("Level1");
	}
}

function Update(){
	//quit game if escape key is pressed
	if (Input.GetKey(KeyCode.Escape)) { 
		Application.Quit();
	}
}