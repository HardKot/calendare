function Events(){
    let days = document.getElementsByClassName("events");
    for(let i = 0; i < days.length; i++){
        days[i].onclick = addEvent;
    }
}

async function addEvent(){
    document.getElementById('id_date').value = this.id;;
    let form = document.getElementById('addEvent'),
        url = document.getElementById("main__URL").value;
    console.log(form);
    let response = await fetch('/calendare/addevent/' + url, {
        method: 'POST',
        body: new FormData(form)
    });
    console.log('ok 2.0')
}
Events()