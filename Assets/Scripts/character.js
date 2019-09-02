static var currentBaseState:AnimatorStateInfo;
private var anim:Animator;
var lockmouse:boolean = true;
var speed:float = 30;
var faceDefault:GameObject;
var faceHappy:GameObject;
var faceSad:GameObject;
var faceStressed:GameObject;
var faceSurprised:GameObject;


function Start () {

}


function Update () {
    currentBaseState = anim.GetCurrentAnimatorStateInfo(0);

    if (!lockmouse){
        var trans_X = Input.GetAxis("Mouse X") * speed;
        trans_X = trans_X * Time.deltaTime;
        anim.SetFloat("horizontal", Input.GetAxis("Mouse X"));
        transform.Translate (-trans_X, 0,0);
        
        if (transform.position.x > 7.5){
            transform.position.x = 7.5;
        }
        
        if (transform.position.x < 0){
            transform.position.x = 0;
        }

    }

    else if (currentBaseState.IsName("Base Layer.locomotion"))
        lockmouse = false;   

}


function Awake(){
    anim = GetComponent.<Animator>();
    changeFace("");
}


function catchObj(){
    anim.SetTrigger("catch");

    if (currentBaseState.IsName("Base Layer.locomotion"))
        changeFace("happy");

    else
        changeFace("surprise");

    yield WaitForSeconds(1);
    changeFace("stress");
}


function sadFace(){
    changeFace("sad");
    yield WaitForSeconds(1);
    changeFace("stress");
}


function changeFace(emotion:String){
    faceDefault.SetActive(false);
    faceSad.SetActive(false);
    faceHappy.SetActive(false);
    faceSurprised.SetActive(false);
    faceStressed.SetActive(false);
    
    switch (emotion){
        case "sad":
            faceSad.SetActive(true);
            break;
        case "happy":
            faceHappy.SetActive(true);
            break;
        case "surprise":
            faceSurprised.SetActive(true);
            break;
        case "stress":
            faceStressed.SetActive(true);
            break;
        default:
            faceDefault.SetActive(true) ;
            break;
    }
}