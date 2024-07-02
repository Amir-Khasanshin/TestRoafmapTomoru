// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3RJsmW-CGKngqYYBvTMXLTR2oNp-O1so",
    authDomain: "exupery-b6ae2.firebaseapp.com",
    projectId: "exupery-b6ae2",
    storageBucket: "exupery-b6ae2.appspot.com",
    messagingSenderId: "957987569243",
    appId: "1:957987569243:web:f69c3a3ee3f8035841497e",
    measurementId: "G-K1202QMMVN"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const columns = ['C2', 'Platform', 'RobotTemplates', 'Discussion', 'Rejected'];

// Load tasks from Firebase
function loadTasks() {
    columns.forEach(column => {
        const columnTasks = document.getElementById(`tasks-${column}`);
        columnTasks.innerHTML = '';
        db.collection(column).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `<h3>${task.title}</h3><p>${task.content}</p>`;
                columnTasks.appendChild(taskDiv);
            });
        });
    });
}

// Add a new task
function addTask(columnId) {
    const taskTitle = prompt("Enter task title:");
    const taskContent = prompt("Enter task content:");
    
    if (taskTitle && taskContent) {
        const task = {
            title: taskTitle,
            content: taskContent
        };
        
        db.collection(columnId).add(task).then(() => {
            loadTasks();
        });
    }
}

// Load tasks on page load
window.onload = loadTasks;
