let currentBalance = 0
let savedCardData = null

function getBonus(goinsAmount) {
    if (goinsAmount === 5000) return 25
    if (goinsAmount === 3000) return 20
    if (goinsAmount === 2000) return 16
    if (goinsAmount === 1000) return 14
    if (goinsAmount === 500) return 12
    return 0
}

async function loadBalance() {
    try {
        const resp = await fetch('http://localhost:3000/api/user/balance')
        if (!resp.ok) throw new Error('Failed to fetch balance')
        const data = await resp.json()
        currentBalance = data.balance
        document.getElementById('balance').innerText = `Current balance: ${currentBalance} Goins`
        if (data.cardNumber) {
            savedCardData = {
                cardNumber: data.cardNumber,
                cardHolder: data.cardHolderName,
                cardCode: '',
                country: data.cardCountry
            }
        } else {
            savedCardData = null
        }
    } catch (e) {
        console.error(e)
        alert('Неуспешно зареждане на баланса.')
    }
}

window.addEventListener('DOMContentLoaded', loadBalance)

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        const packageDiv = this.closest('.coin-package')
        const goinsAmount = parseInt(packageDiv.dataset.goins)
        const priceEUR = packageDiv.dataset.price
        openPopup(goinsAmount, priceEUR)
    })
})

function openPopup(goinsAmount, priceEUR) {
    const popup = document.getElementById('popup')
    popup.style.display = 'flex'
    popup.dataset.goinsAmount = goinsAmount
    popup.dataset.priceEUR = priceEUR
    const packageTitle = document.getElementById('popup-package')
    packageTitle.innerText = `Confirm Purchase: ${goinsAmount} Goins for €${priceEUR}`

    if (savedCardData) {
        document.querySelector('#payment-form input[placeholder="Card Number"]').value = savedCardData.cardNumber
        document.querySelector('#payment-form input[placeholder="Cardholder Name"]').value = savedCardData.cardHolder
        document.querySelector('#payment-form input[placeholder="3 Digit Code"]').value = savedCardData.cardCode
        document.querySelector('#payment-form input[placeholder="Country"]').value = savedCardData.country
        document.getElementById('save-card').checked = true
    } else {
        document.getElementById('payment-form').reset()
        document.getElementById('save-card').checked = false
    }
}

function closePopup() {
    document.getElementById('popup').style.display = 'none'
}

document.getElementById('confirm-yes').addEventListener('click', async function() {
    const popup = document.getElementById('popup')
    const goinsAmount = parseInt(popup.dataset.goinsAmount)
    const priceEUR = popup.dataset.priceEUR

    const cardNumber = document.querySelector('#payment-form input[placeholder="Card Number"]').value.trim()
    const cardHolder = document.querySelector('#payment-form input[placeholder="Cardholder Name"]').value.trim()
    const cardCode = document.querySelector('#payment-form input[placeholder="3 Digit Code"]').value.trim()
    const country = document.querySelector('#payment-form input[placeholder="Country"]').value.trim()
    const saveCard = document.getElementById('save-card').checked

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Card Number must be 16 digits!")
        return
    }
    if (cardHolder.length < 3) {
        alert("Cardholder Name is too short!")
        return
    }
    if (!/^\d{3}$/.test(cardCode)) {
        alert("3 Digit Code must be exactly 3 digits!")
        return
    }
    if (country.length < 2) {
        alert("Please enter a valid country!")
        return
    }

    let packageId = null
    try {
        const resp = await fetch('http://localhost:3000/api/coins')
        const allPacks = await resp.json()
        const foundPack = allPacks.find(p => p.amount === goinsAmount)
        if (!foundPack) {
            alert('Package not found on server!')
            return
        }
        packageId = foundPack.id
    } catch (e) {
        console.error(e)
        alert('Грешка при вземане на пакетите от сървъра.')
        return
    }

    try {
        const resp = await fetch('http://localhost:3000/api/user/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                packageId,
                cardNumber,
                cardHolderName: cardHolder,
                cardCountry: country,
                saveCard
            })
        })
        if (!resp.ok) {
            const errData = await resp.json()
            alert(`Purchase failed: ${errData.message || resp.statusText}`)
            return
        }
        const data = await resp.json()
        currentBalance = data.newBalance
        document.getElementById('balance').innerText = `Current balance: ${currentBalance} Goins`
        if (saveCard) {
            savedCardData = {
                cardNumber: data.cardNumber,
                cardHolder: data.cardHolderName,
                cardCode: '',
                country: data.cardCountry
            }
        } else {
            savedCardData = null
        }
        closePopup()
        document.getElementById('payment-form').reset()
    } catch (e) {
        console.error(e)
        alert('Something went wrong during purchase.')
    }
})

document.getElementById('confirm-no').addEventListener('click', function() {
    closePopup()
})
