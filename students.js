// This object represents a registered class that a student would take

class RegisteredClass {
    constructor(name, section, professor, grade) {
        this.name = name;
        this.section = section;
        this.professor = professor;
        this.grade = grade;
    }
}


// This object represents a student

class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.registeredClasses = [];
    }

    addRegisteredClass(registeredClass) {
        this.registeredClasses.push(registeredClass);
    }

    deleteRegisteredClass(registeredClass) {
        let index = this.registeredClasses.indexOf(registeredClass);
        this.registeredClasses.splice(index, 1);
    }
}


// We start out with an empty array of students and initialize the field that will be used to assign an id to each student

let students = [];
let studentId = 0;


/* This is calling the onClick function. It's setting up an event listener for the "Create" buttton. When 
   someone clicks on the "Create" button, the new student will be added to the student array and the 
   studentId field will be incremented for the next new student */

onClick('new-student', () => {
    students.push(new Student(studentId++, getValue('new-student-name')));
    drawDOM();
})


/*  This is the onClick function that sets up an event listener for the element that gets passed. When the element
    gets clicked, the requested action will be taken */

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

// This function retrieves the value of the element that gets passed to it

function getValue(id) {
    return document.getElementById(id).value;
}


// This function rebuilds all the tables of students and their registered classes

function drawDOM() {
    let studentDiv = document.getElementById('students');
    clearElement(studentDiv);
    for (student of students) {
        let table = createStudentTable(student);
        let title = document.createElement('h2');
        title.innerHTML = student.name;
        title.appendChild(createDeleteStudentButton(student));
        studentDiv.appendChild(title);
        studentDiv.appendChild(table);
        for (registeredClass of student.registeredClasses) {
            createRegisteredClassRow(student, table, registeredClass);
        }
    }
}

/* This function inserts a new registered class row for a given student.  It inserts the new row above
    any prior row of a registered class, but below the data entry row */

function createRegisteredClassRow(student, table, registeredClass) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = registeredClass.name;
    row.insertCell(1).innerHTML = registeredClass.section;
    row.insertCell(2).innerHTML = registeredClass.professor;
    row.insertCell(3).innerHTML = registeredClass.grade;
    let actions = row.insertCell(4);
    actions.appendChild(createDeleteRowButton(student, registeredClass));
}


/*  This function builds the delete button of a given registered class row of a student.
    It sets up an event handler for when the button gets clicked.  When the button gets clicked,
    the registered class gets deleted from the list of the student's registered classes */

function createDeleteRowButton(student, registeredClass) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = student.registeredClasses.indexOf(registeredClass);
        student.registeredClasses.splice(index, 1);
        drawDOM();
    };
    return btn;
}


/*  This function creates the Delete button for a student.  It creates an event handler that will
    delete the student from the list of students when clicked */

function createDeleteStudentButton(student) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.style.marginLeft = '50px';
    btn.innerHTML = 'Delete Student';
    btn.onclick = () => {
        let index = students.indexOf(student);
        students.splice(index, 1);
        drawDOM();
    };
    return btn;
}


/*  This function creates a button that is used to add a new registered class for a student. It creates an event handler
    that will add the registered class to the student's list of registered classes when clicked */

function createNewRegisteredClassButton(student) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        student.registeredClasses.push(new RegisteredClass(getValue(`name-input-${student.id}`), getValue(`section-input-${student.id}`),
                                                    getValue(`professor-input-${student.id}`),
                                                    getValue(`grade-input-${student.id}`)));
        drawDOM();
    };
    return btn;
}


/*  This function builds the initial table for a student. It builds the header row and the data entry row for entering
    a new registered class */

function createStudentTable(student) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let sectionColumn = document.createElement('th');
    let professorColumn = document.createElement('th');
    let gradeColumn = document.createElement('th');
    let createColumn = document.createElement('th');
    nameColumn.innerHTML = 'Class';
    sectionColumn.innerHTML = 'Section';
    professorColumn.innerHTML = 'Professor';
    gradeColumn.innerHTML = 'Grade';
    row.appendChild(nameColumn);
    row.appendChild(sectionColumn);
    row.appendChild(professorColumn);
    row.appendChild(gradeColumn);
    row.appendChild(createColumn);
    let formRow = table.insertRow(1);
    let nameTd = document.createElement('td');
    let sectionTd = document.createElement('td');
    let professorTd = document.createElement('td');
    let gradeTd = document.createElement('td');
    let createTd = document.createElement('td');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${student.id }`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let sectionInput = document.createElement('input');
    sectionInput.setAttribute('id', `section-input-${student.id }`);
    sectionInput.setAttribute('type', 'text');
    sectionInput.setAttribute('class', 'form-control');
    let professorInput = document.createElement('input');
    professorInput.setAttribute('id', `professor-input-${student.id }`);
    professorInput.setAttribute('type', 'text');
    professorInput.setAttribute('class', 'form-control');
    let gradeInput = document.createElement('input');
    gradeInput.setAttribute('id', `grade-input-${student.id }`);
    gradeInput.setAttribute('type', 'text');
    gradeInput.setAttribute('class', 'form-control');
    let newRegisteredClassButton = createNewRegisteredClassButton(student);
    nameTd.appendChild(nameInput);
    sectionTd.appendChild(sectionInput);
    professorTd.appendChild(professorInput);
    gradeTd.appendChild(gradeInput);
    createTd.appendChild(newRegisteredClassButton);
    formRow.appendChild(nameTd);
    formRow.appendChild(sectionTd);
    formRow.appendChild(professorTd);
    formRow.appendChild(gradeTd);
    formRow.appendChild(createTd);
    return table;
}


/* This function is called by the function that rebuilds all the student tables.  Before rebuilding
    this function deletes the entire contents of the "students" div.  This div is what contains all the tables */

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}