
const pages = ["mainid", "main_resumeid", "login_pageid"];

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
                document.getElementById(`${pages[i]}`).style.display="flex";
            }
        }
    }
}


function cross_click() {
    document.getElementById(`cross_in_nav`).classList.toggle("change");
    document.getElementById(`cross_in_overlay`).classList.toggle("change");
}

function openNav() {
    document.getElementById("myOverlay").style.height = "100%";
  }
  
function closeNav() {
    document.getElementById("myOverlay").style.height = "0%";
  }

function instagram(){
    window.open('https://www.instagram.com/jayanshkhandelwal/');
}

function linkedin(){
    window.open('https://www.linkedin.com/in/jayansh-khandelwal-5b94b4326/');
}


const options = ["opt1","opt2","opt3","opt4"];

function change_color(x){
    for(let i=0; i<options.length; i++){
        document.getElementById(`${options[i]}`).style.color = "black";
    }
    document.getElementById(`${x}`).style.color="blue";
}


document.addEventListener('DOMContentLoaded', () => {
    let mysBtn = document.getElementById('scrollbtn');

    if (mysBtn) { //Check if the element exists!
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                mysBtn.style.display = 'block';
            } else {
                mysBtn.style.display = 'none';
            }
        });
    } else {
        console.error("Element with ID 'scrollbtn' not found.");
    }
});

const forms_right = ["login_form", "joinus_form"];
const forms_left = ["dont", "already"];

function changeform(form){
    for(let i=0;i<forms_right.length;i++){

        if(forms_right[i]!=form){
            document.getElementById(`${forms_right[i]}`).style.display="none";
            document.getElementById(`${forms_left[i]}`).style.display="none";
        }
        else{                
            document.getElementById(`${forms_right[i]}`).style.display="flex";
            document.getElementById(`${forms_left[i]}`).style.display="flex";

            if(forms_right[i]==`login_form`){
                document.getElementById(`login_img_cont`).style.top="37%";
            }
            else{
                document.getElementById(`login_img_cont`).style.top="29%";
            }

        }
    }
}