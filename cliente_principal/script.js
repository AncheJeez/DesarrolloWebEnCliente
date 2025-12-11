const sidebar = document.getElementById('sidebar');
const profileButton = document.getElementById('profile-button');

profileButton.addEventListener('click', () => {
    sidebar.classList.add('active');
});