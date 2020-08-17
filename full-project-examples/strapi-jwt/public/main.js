function getAll(selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document

    return Array.prototype.slice.call(parent.querySelectorAll(selector), 0)
}

// Modals
var rootEl = document.documentElement
var $modals = getAll('.modal')
var $modalButtons = getAll('.modal-button')
var $modalCloses = getAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button')

if ($modalButtons.length > 0) {
    $modalButtons.forEach(function ($el) {
        $el.addEventListener('click', function () {
            var target = $el.dataset.target
            openModal(target)
        })
    })
}

if ($modalCloses.length > 0) {
    $modalCloses.forEach(function ($el) {
        $el.addEventListener('click', function () {
            closeModals()
        })
    })
}

function openModal(target) {
    var $target = document.getElementById(target)
    rootEl.classList.add('is-clipped')
    $target.classList.add('is-active')
}

function closeModals() {
    rootEl.classList.remove('is-clipped')
    $modals.forEach(function ($el) {
        $el.classList.remove('is-active')
    })
}

document.addEventListener('keydown', function (event) {
    var e = event || window.event
    if (e.keyCode === 27) {
        closeModals()
        closeDropdowns()
    }
})

// tag si connexion
const tagConnect = document.querySelector('.tag-connect')

// Connexion
const demandeConnexion = async () => {
    const champsConnexion = {
        identifier: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    }
    try {
        const poster = await fetch('http://localhost:1337/auth/local', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(champsConnexion)
        })
        if (poster.ok) {
            const data = await poster.json()
            localStorage.setItem('jwt', data.jwt)
            tagConnect.classList.remove('is-hidden')
            closeModals()
        }
    } catch (error) {
        console.error(error)
    }
}
document.querySelector('.button-connexion').addEventListener('click', demandeConnexion)

// Deconnexion
document.querySelector('.button-deconnexion').addEventListener('click', () => {
    tagConnect.classList.add('is-hidden')
    localStorage.removeItem('jwt')
})

// si connecté au chargement de la page
if (localStorage.jwt) {
    tagConnect.classList.remove('is-hidden')
}

// chargement des posts

const postsEmplacement = document.querySelector('.posts')

const recupPosts = async () => {
    try {
        const recup = await fetch('http://localhost:1337/posts', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (recup.ok) {
            const data = await recup.json()
            data.forEach(post => {
                const postTexte = `
                <div class='box'>
                ${post.textepost}
                <span class='is-italic'>${post.created_at}</span>
                <span class='is-italic is-pulled-right'>${post.user.username}</span>
                </div>`
                const chaquepost = document.createElement('div')
                postsEmplacement.appendChild(chaquepost)
                chaquepost.innerHTML = postTexte
            })
        }
    } catch (error) {
        console.error(error)
    }
}
recupPosts()

// poster un message
// curl -X POST "http://localhost:1337/posts" -H "accept: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTkzMjYxMTEyLCJleHAiOjE1OTU4NTMxMTJ9.4z9fmSPYJrWI3uLM8ieGv2Z1mxB0bg5QaOghXrYRmWk" -H "Content-Type: application/json" -d "{\"textepost\":\"string\",\"user\":\"string\"}"
const posterMessage = async () => {
    const messageAposter = document.querySelector('.messageAposter').value
    const jwt = localStorage.getItem('jwt')
    const infosPosts = { "textepost": `${messageAposter}`, "user": "2" }
    try {
        const poster = await fetch('http://localhost:1337/posts', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(infosPosts)
        })
        if (poster.ok) {
            const data = await poster.json()
            closeModals()
            postsEmplacement.innerHTML = ''
            recupPosts()
        }
    } catch (error) {
        console.error(error)
    }
}
document.querySelector('.button-poster').addEventListener('click', posterMessage)
