// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')
// const geocode = require('./utils/geocode.js')
// const forecast = require('./utils/forecast.js')

const url = 'http://api.weatherstack.com/current?access_key=d0a7f8f3a0a9885ae9015b9fe1c38ca7&query=40,40.json?&limit=1'

console.log('Client side javascript file is loaded')


    // geocode('Warsaw', (error, {latitude, longitude, location} = {}) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     forecast({latitude, longitude}, (error, forecastData) => {
    //         if (error) {
    //             return console.log(error)
    //         }
    //     if(error){
    //         return console.log('big mistake!')
    //     } else {
    //         response.json().then((data) => {
    //             console.log({data})
    //             //console.log({forecastData, location})
    //         })
    //     }
 
    //     })
    // })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)                
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'Temperature: ' + data.forecast.temperature
                console.log(data.forecast)
            }
        })
    })

})