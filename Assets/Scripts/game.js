var BtnRejouer:GameObject;
var playerObj:GameObject;
var GUIScore:UI.Text;
var GUIMiss:UI.Text;
var GUIGameOver:UI.Text;
private var score = -1;
private var miss = 0;
private var gameover = false;
var crunchedDeathSFX:AudioClip;
var debutIncendieSFX:AudioClip;
var incendieLoopSFX:AudioClip;
var MCamera:AudioSource;


function Start(){
    Cursor.lockState = CursorLockMode.Locked;
    Cursor.visible = false;
    MCamera.PlayOneShot(debutIncendieSFX);
    Invoke ("PlayLoop", MCamera.clip.length);
    BtnRejouer.SetActive(false);
    gameover = false;
    GUIGameOver.text = "";
    GUIMiss.text = "MISS: 0";
    GUIScore.text = "CATCH: 0";
}


function Update () {
    if (Input.GetButtonUp("Cancel")){
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }
}


function hitCatch(){
    if (!gameover){
        score++;
        GUIScore.text = "CATCH: "+ score.ToString();
    }
}
function hitGround(){
    if (!gameover){
        miss++;
        GUIMiss.text = "MISS: "+ miss.ToString();
        playerObj.SendMessage("sadFace");
    }
}


function hitPlayer(){
    GUIGameOver.text = "GAME OVER";
    gameover = true;
    playerObj.SetActive(false);
    BtnRejouer.SetActive(true);
    MCamera.PlayOneShot(crunchedDeathSFX);
    Cursor.lockState = CursorLockMode.None;
    Cursor.visible = true;
}


function restart(){
    Application.LoadLevel(Application.loadedLevel);
}


function PlayLoop (){
    MCamera.clip = incendieLoopSFX;
    MCamera.loop = true;
    MCamera.Play();
}