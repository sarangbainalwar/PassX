//logic to fill the table
function maskpassword(pass){
  let str = ""
  for(let index=0;index<pass.length; index++){
    str +="*"
  }
  return str
}

function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () =>{
      //alert("copied to clipboard: "+txt);
      document.getElementById("alert").style.display="inline"    
    setTimeout(()=>{
      document.getElementById("alert").style.display="none"    
    }, 2000)
  },
    ()=>{
      alert("failed to copy")
    },
  );
}


const DeletePass = (website) =>{
  let data=localStorage.getItem("passwords")
  let arr=JSON.parse(data);
  arrUpdated=arr.filter((e)=>{
    return e.website != website
  })
  localStorage.setItem("passwords",JSON.stringify(arrUpdated))
  alert(`successfully Deleted ${website}'s password`)
  showPasswords()
}

const showPasswords = () =>{
let tb = document.querySelector("table")
let data = localStorage.getItem("passwords")
if (data == null || JSON.parse(data).length == 0) {
  tb.innerHTML = "No Data to show"
} else {
  tb.innerHTML = `<tr>
  <th>Website</th>
  <th>Username</th>
  <th>Password</th>
  <th>Delete</th>
</tr>`
  let arr = JSON.parse(data);
  let str = "";
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    str += `<tr>
<td>${element.website} <img src="copy.svg" alt="Copy" onClick="copyText('${element.website}')" style="cursor: pointer;">
</td>
<td>${element.username} <img src="copy.svg" alt="Copy" onClick="copyText('${element.username}')" style="cursor: pointer;">
</td>
<td>${maskpassword(element.password)} <img src="copy.svg" alt="Copy" onClick="copyText('${element.password}')" style="cursor: pointer;">
</td>
<td><button class="delbtn" onClick="DeletePass('${element.website}')">Delete</button></td>
</tr>`
  }

  tb.innerHTML = tb.innerHTML + str
}
website.value = ""
username.value = ""
password.value = ""
}

console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked....")
    console.log(username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password Saved")
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})