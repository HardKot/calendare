//URL = document.getElementById("main__URL").value;

async function Rename(){
    let form = document.getElementById("new_name"),
        url = document.getElementById("main__URL").value;
    if (document.getElementById('id_name').value == document.getElementById('header_name').textContent){
        return 0
    }
    let response = await fetch('/calendare/rename_user/'+ url,{
        method: 'POST',
        body: new FormData(form)
    });
    let new_name = document.getElementById('id_name').value;
    document.getElementsByTagName('title')[0].textContent = new_name;
    document.getElementById('header_name').textContent = new_name;
    document.getElementById('new_name').style.display = "none";
    document.getElementById("header_name").style.display = "block";
}

function change() {
    document.getElementById("new_name").style.display = "block";
    this.style.display = "none";
    document.getElementById("id_name").placeholder = "Новое название календаря";
    document.getElementById("id_name").onblur = function (){
        console.log('lol');
        document.getElementById("new_name").style.display = "none";
        document.getElementById("header_name").style.display = "block";
        document.getElementById("id_name").onblur  = null;
    }
}
document.getElementById("rename").onclick = Rename;
document.getElementById("header_name").onclick = change;