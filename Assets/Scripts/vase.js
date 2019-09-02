var catchParticles:ParticleSystem;
var missParticles:ParticleSystem;
private var origins:Vector3;
var scriptObj:GameObject;
var glassBreakSFX:AudioClip;
var collectItemSFX:AudioClip;
var AudioS:AudioSource;


function Start(){
    origins = transform.position;
}


function Update () {

}


function OnCollisionEnter(col:Collision){
    var objCopy:ParticleSystem;
    var particlesSelect:ParticleSystem;

    if (col.gameObject.tag == "Player"){
        particlesSelect = catchParticles;
        scriptObj.SendMessage("hitCatch");
        col.gameObject.SendMessage("catchObj");
        AudioS.PlayOneShot(collectItemSFX);
    }

    else if (col.gameObject.tag == "floor"){
        scriptObj.SendMessage("hitGround");
        particlesSelect = missParticles;
        AudioS.PlayOneShot(glassBreakSFX);
    }

    else if (col.gameObject.tag == "junk"){
        replaceObj();
        return;
    }
    
    else
        particlesSelect = missParticles;

    objCopy = Instantiate(particlesSelect,transform.position,Quaternion.identity);
    objCopy.Play();
    Destroy(objCopy.gameObject, 2);
    replaceObj();
}


function replaceObj(){
    transform.rotation = Quaternion.Euler(Vector3.zero);
    origins.x = Random.Range(0.5, 7.0);
    transform.position = origins;
    GetComponent.<Rigidbody>().velocity = Vector3.zero;
}