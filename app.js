const toDoList = document.querySelector('#toDo-list');
const form = document.querySelector('#add-List-form');

// create element & render List
function renderList(doc){
    let li = document.createElement('li');
    let toDo = document.createElement('span');
    // let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    toDo.textContent = doc.data().toDo;
    // city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(toDo);
    // li.appendChild(city);
    li.appendChild(cross);

    toDoList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('List').doc(id).delete();
    });
}

// getting data
db.collection('List').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderList(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('List').add({
        toDo: form.toDo.value,
        // city: form.city.value
    });
    form.toDo.value = '';
    // form.city.value = '';
});