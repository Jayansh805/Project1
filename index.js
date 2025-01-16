
const pages = ["mainid", "main_resumeid"];



function change(page){
    for(let i=0;i<pages.length;i++){

        if(pages[i]!=page){
            document.getElementById(`${pages[i]}`).style.display="none";
            //console.log(`hided ${i+1}`)
        }
        else{
            if(pages[i]=='main_resumeid'){
                document.getElementById(`${pages[i]}`).style.display="flex";
            }
            else{
                document.getElementById(`${pages[i]}`).style.display="block";
            }
        }
    }
}