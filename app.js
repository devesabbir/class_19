const skills = document.getElementById('skills')
const add_form = document.getElementById('add_form')
const addtd = document.getElementById('addtd')
const edit_form = document.getElementById('edit_form')
const editskills = document.getElementById('editskills')



function skillsAdd() {
  axios.get('http://localhost:7090/skills').then(res => {
    let skills_item = '';
    res.data.map(item => {
      skills_item += ` <option value="${item.id}">${item.name}</option> `

    })

    skills.insertAdjacentHTML('beforeend', skills_item)
  })

}

skillsAdd()


add_form.addEventListener('submit', function (e) {
  e.preventDefault()
  let name = this.querySelector('input[placeholder="Name"]')
  let age = this.querySelector('input[placeholder="Age"]')
  let photo = this.querySelector('input[placeholder="Photo"]')
  let skillselect = this.querySelector('#skills')

  if (name.value == '' || age == '' || skillselect.value == '' || photo.value == '') {
    alert('All Field are Required !')
  } else {

    axios.post('http://localhost:7090/developers', {
      id: '',
      name: name.value,
      age: parseFloat(age.value),
      photo: photo.value,
      skillsId: skillselect.value
    }).then(res => {
      addData()
    })


  }

})


function addData() {


  let trtd = '';
  axios.get('http://localhost:7090/developers').then(data => {
    data.data.map((item, index) => {
      trtd += `
           <tr>
           <td>${index + 1}</td>
           <td>${item.name}</td>
           <td>${item.age}</td>
           <td><img style="width:100px;height:70px;object-fit:cover;" src="${item.photo}" alt="img"></td>
           <td>
             <a class="btn text-white bg-info" data-bs-toggle="modal" href="#viewModal" onclick="viewData(${item.id},${item.skillsId})"><i class="fas fa-eye"></i></a>
             <a class="btn text-white bg-info" data-bs-toggle="modal" onclick="editData(${item.id})" href="#editModal"><i class="fas fa-edit"></i></a>
             <button class="btn text-white bg-info" onclick="dltData(${item.id})"><i class="fas fa-trash"></i></button>
           </td>
         </tr>
           
           
           `
    })
     addtd.innerHTML = trtd
  })
}

addData()

function viewData(id,sid) {
  let viewField = document.querySelector('.viewitem')
  let skilitem = ''
  axios.get(`http://localhost:7090/skills/${sid}`).then( res => {
      skilitem = res.data.name
  })

  axios.get('http://localhost:7090/developers/'+id).then(res => {
    
    viewField.innerHTML = `
         <div class="viewdata">
         <img src="${res.data.photo}" alt="">
         <div class="caption mt-5">
              <p><span>Name:</span>${res.data.name}</p>
              <p><span>Age:</span>${res.data.age}</p>
              <p><span>Skill:</span>${skilitem}</p>
         </div>
    </div>

   `
   })
 
}



// Edit Data
function editData(id){
    let ename = document.querySelector('input[placeholder="eName"]')
    let eid = document.querySelector('input[placeholder="eid"]')
    let eage = document.querySelector('input[placeholder="eAge"]')
    let ephoto = document.querySelector('input[placeholder="ephoto"]')
    let getphoto = document.querySelector('#editphoto')
  
    axios.get(`http://localhost:7090/developers/${id}`).then( res => {
       
         ename.value = res.data.name
         eid.value = res.data.id
         eage.value = res.data.age
         ephoto.value = res.data.photo
         getphoto.setAttribute('src',res.data.photo)
    })
}

edit_form.addEventListener('submit',function(e){
   e.preventDefault()
   let ename = this.querySelector('input[placeholder="eName"]')
   let eid = this.querySelector('input[placeholder="eid"]')
   let eage = this.querySelector('input[placeholder="eAge"]')
   let ephoto = this.querySelector('input[placeholder="ephoto"]')
   let eskillid = this.querySelector('input[placeholder="eskillid"]')


   axios.patch(`http://localhost:7090/developers/${eid.value}`, {
      id: '',
      name : ename.value,
      age : parseFloat(eage.value),
      photo : ephoto.value,
      skillsId : parseFloat(eskillid.value)
    }).then( res => {
      addData()
    })
})


// delete data 
function dltData(id){
  
    axios.delete(`http://localhost:7090/developers/${id}`).then( res => {
      addData()
    })
}




