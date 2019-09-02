private var origins:Vector3;
var scriptObj:GameObject;
var smokeball:ParticleSystem;
var AudioS:AudioSource;
var rocksOnFloorSFX:AudioClip;


function Start () {
    origins = transform.position;
}


function Update () {

}


function OnCollisionEnter(col:Collision){
    if (col.gameObject.tag == "Player")
        scriptObj.SendMessage("hitPlayer");

    if (col.gameObject.tag != "vase"){
        var objCopy = Instantiate( smokeball, transform.position,
        Quaternion.identity);
        objCopy.Play();
        AudioS.PlayOneShot(rocksOnFloorSFX);
        Destroy(objCopy.gameObject, 2);
        replaceObj();
    }

}


function replaceObj(){
    transform.rotation = Quaternion.Euler(Vector3.zero);
    origins.x = Random.Range(0.5, 7.0);
    transform.position = origins;
    GetComponent.<Rigidbody>().velocity = Vector3.zero;
}