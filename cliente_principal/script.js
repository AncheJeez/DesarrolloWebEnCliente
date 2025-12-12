const sidebar = document.getElementById('sidebar');
// const profileButton = document.getElementById('profile-button');

// profileButton.addEventListener('click', () => {
//     sidebar.classList.add('active');
// });

document.getElementById("profile-button").onclick = () => {
    sidebar.classList.toggle('active');
};

document.getElementById("back-button").onclick = () => {
    sidebar.classList.toggle('active');
}