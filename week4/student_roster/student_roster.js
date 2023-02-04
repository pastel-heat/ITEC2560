const studentNameInput = document.querySelector('#student-name')
const studentIDInput = document.querySelector('#student-id')
const studentGPAInput = document.querySelector('#student-gpa')
const addStudentButton = document.querySelector('#add-student')
const listOfStudents = document.querySelector('#student-list')
const studentCount = document.querySelector('#student-count')
let numberOfStudents = 0
studentCount.innerHTML = numberOfStudents
const removeStudentsButton = document.querySelector("#remove-selected-students")

addStudentButton.addEventListener("click", function(){
    let name = studentNameInput.value
    let id = studentIDInput.value
    let gpa = studentGPAInput.value

    if (name.length == 0){
        alert("Please enter a name.")
        return
    }

    if (id.length == 0){
        alert("Please enter your student ID.")
        return
    }

    if (gpa.length == 0){
        alert("Please enter your GPA.")
        return
    }

    if (gpa < 0 || gpa > 4){
        alert("Please enter a GPA value between 0 and 4.")
        return
    }
    
    let newListItem = document.createElement("li")

    newListItem.innerHTML = `${name}, ID: ${id}, ${gpa} GPA`

    newListItem.addEventListener("click", function(){
        newListItem.classList.toggle("selected")
    })

    listOfStudents.appendChild(newListItem)

    studentNameInput.value = ""
    studentIDInput.value = ""
    studentGPAInput.value = ""

    numberOfStudents ++
    studentCount.innerHTML = numberOfStudents
})

removeStudentsButton.addEventListener("click", function(){
    let selectedStudents = document.querySelectorAll(".selected")
    selectedStudents.forEach(function(student){
        student.remove()
        numberOfStudents --
    })

    studentCount.innerHTML = numberOfStudents
})