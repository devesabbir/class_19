const skills = document.getElementById('skills')
const add_form = document.getElementById('add_form')
const addtd = document.getElementById('addtd')



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
      age: age.value,
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
           <td>${item.skillsId}</td>
           <td><img style="width:100px;height:70px;object-fit:cover;" src="${item.photo}" alt="img"></td>
           <td>
             <a class="btn text-white bg-info" data-bs-toggle="modal" href="#viewModal" onclick="viewData(${item.id})"><i class="fas fa-eye"></i></a>
             <a class="btn text-white bg-info" href=""><i class="fas fa-edit"></i></a>
             <a class="btn text-white bg-info" href=""><i class="fas fa-trash"></i></a>
           </td>
         </tr>
           
           
           `
    })

  }).then(res => {
    addtd.innerHTML = trtd
  })
}

addData()

function viewData(id) {
  let viewField = document.querySelector('.viewitem')

  axios.get('http://localhost:7090/developers/'+ id).then(res => {
    
     viewField.innerHTML = `
          <div class="viewdata">
          <img src="${res.data.photo}" alt="">
          <div class="caption">
               <p>${res.data.name}</p>
               <p>${res.data.age}</p>
               <p>${res.data.skillsId}</p>
          </div>
     </div>

    `
  })
}



