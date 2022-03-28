document.addEventListener('user-selected', (e) => replaceSelected(e.detail));

const users = [
    {name: 'Andrea', mail: 'popolo@grr.la'},
    {name: 'Francesca', mail: 'paperina@grr.la'},
    {name: 'Simone', mail: 'pluto@grr.la'},
    {name: 'Marco', mail: 'pippo@grr.la'}
];

for (const user of users) {
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    pippoTag.setAttribute('hasButton', true);
    document.body.appendChild(pippoTag);
}

function replaceSelected(user) {
    const selectedContainer = document.getElementById('selected-user');
    selectedContainer.innerHTML = "";
    const pippoTag = document.createElement('pippo-tag');
    pippoTag.setAttribute('pippo-user', JSON.stringify(user));
    selectedContainer.appendChild(pippoTag);
}