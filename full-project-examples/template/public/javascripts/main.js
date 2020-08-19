import envoiInfosAnomyniseesSurUtilisation from './statistiques.js'
import controllerModals from './modals.js'

controllerModals()

/* Fenetre d'information des cookies ET la laisser fermée si validée */
const acceptationCGU = document.querySelector('.notification-cookie')
const buttonCookie = document.querySelector('.button-cookie')
const decodedCookie = decodeURIComponent(document.cookie)
buttonCookie.addEventListener('click', () => {
  acceptationCGU.classList.add('is-hidden')
  document.cookie = 'acceptationCGU=1'
})
if (decodedCookie.split('; ')
  .includes('acceptationCGU=1')) {
  acceptationCGU.classList.add('is-hidden')
}

/* Menu en mobile */
const burger = document.querySelector('.burger')
const menuDeroulant = () => {
  document.querySelector('.burger')
    .classList.toggle('is-active')
  document.querySelector('.burger-dropdown')
    .classList.toggle('is-active')
}
burger.addEventListener('click', menuDeroulant)

/* Boutton retour en haut apparait au scroll */
window.onscroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.button-backtotop')
      .style.display = 'block'
  } else {
    document.querySelector('.button-backtotop')
      .style.display = 'none'
  }
}

/* Fermeture des notifications */
const allDeleteNotif = document.querySelectorAll('.delete-notif')
allDeleteNotif.forEach(element => {
  element.parentNode.addEventListener('click', () => element.parentNode.style.display = 'none')
})

/* affichage des aides dans la page */
const aideButtons = document.querySelectorAll('#aide')
aideButtons.forEach(element => {
  element.addEventListener('click', async () => {
    const intitule = element.getAttribute('data-value')
    const texteAide = await recuperationAPIaide(intitule)
    const insertPage = document.querySelector('#texteAide')
    const modalAide = document.querySelector('.modal-aide')
    modalAide.classList.add('is-active')
    insertPage.innerHTML = texteAide
  })
})

const recuperationAPIaide = async (intitule) => {
  try {
    const recuperation = await fetch(`/aide/${intitule}`)
    if (recuperation.ok) {
      const data = await recuperation.json()
      return data
    }
  } catch (error) {
    console.error(error)
    return 'Il semble y avoir eu une erreur ou cette aide n\'est pas encore disponible.'
  }
}

/* statistiques sur l'utilisation du site */
const listCookies = document.cookie.split('; ')
const cookiesSansValeurs = []
listCookies.forEach(element => {
  const search = element.split('=')[0]
  cookiesSansValeurs.push(search)
})
if (!cookiesSansValeurs.includes('uuidStatsAnonym')) {
  const uuid = Math.random()
    .toString(16)
    .slice(2)
  document.cookie = `uuidStatsAnonym=${uuid}`
}
envoiInfosAnomyniseesSurUtilisation()

/* accès aux api internes (TEST) */
const lienNavBar = document.querySelector('#apisecure')
lienNavBar.addEventListener('mouseenter', async () => {
  const data = await fetch('/apisecure')
  const message = await data.json()
  console.log(message)
})
