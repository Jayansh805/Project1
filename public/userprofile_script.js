
let data = [0,0,0,0,0,0,0,0,0,0];

function plus(id,n,d){
    data[n]++;
    document.getElementById(`${id}`).innerHTML= `${data[n]}/${data[n]+data[d]}`;
}

function minus(id,n,d){
    data[d]++;
    document.getElementById(`${id}`).innerHTML= `${data[n]}/${data[n]+data[d]}`;
}

function send_data(){
    fetch('http://localhost:3000/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numbers: data }) // Send array inside an object
    })
    .then(response => response.json())
    .then(data => console.log("Response from server:", data))
    .catch(error => console.error("Error:", error));

    alert('Your attendance stats are updated. To view kindly re-login.');
    window.location.reload(); 
}


// console.log(`success`);
// console.log(data);



