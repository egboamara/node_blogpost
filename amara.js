const express = require('express') //importing our express libary

const app = new express()

const PORT = 5000

// app.listen(PORT,()=>{
//     'life is easy on port:'+PORT
// })
app.use(express.json())//helps us access json

app.get('/', (request, response) =>{
    return response.send('communication is a necessity in life')
})
app.get('/login', (request, response) =>{
    const user = {
        username: 'Amara'.toLocaleLowerCase(),
        skillevel: '10',
        height: 6,
        password:'pmara',
        userId: 'amaraegbo',
        address: '10 anifowoshe street',
        complexion: 'dark',
        laptop: 'Hp',
        gender:'female'
    }
    const data = request.query

    if(data.username.toLocaleLowerCase()==user.username && data.password==user.password){
        return response.json(user)
    }
    else{
        return response.send('wrong auth details')
    }
    //console.log(request);

    //return response.json(request.query)

})


app.post('/login', (request, response) =>{
    const user = {
        username: 'amara'.toLocaleLowerCase(),
        skilevel: '10',
        height: '6',
        password:'pmara',
        userId: 'amaraegbo',
        address: '10 anifowoshe street',
        complexion: 'dark',
        laptop: 'Hp',
        gender:'female'
    }
    const data = request.body

    if(data.username.toLocaleLowerCase()==user.username && data.password==user.password){
        return response.send(user)
    }
    else{
        return response.send(`wrong auth details`)
    }
    //console.log(request);

   // return response.json(request.query)

})

app.get('/Register', (request, response) => {
    const user ={
        username:'amarachi',
        password:'pmara',
        surname: 'Egbo',
        age: '23',
        height: '6',
        password:'pmara',
        userId: 'amaraegbo',
        address: '10 anifowoshe street',
        complexion: 'dark',
        laptop: 'Hp',
        gender:'female'
    }
    const data = request.query
}) 
if(data.username.toLocaleLowerCase()==user.username && data.password==user.password){
    return response.send(user)
}
else{
    return response.send(`wrong auth details`)
}


app.get('/profile', (request, response) => {
    return response.send('Welcome to your profile space. what do you know about communication?')
})

app.get('/feed', (request, response) => {
    return response.send('Communication is defined asthe imparting or exchanging of information by speaking, writing, or using some other medium.')
})

app.get('/postfeedroute', (request, response) => {
    return response.send('In your understanding what can you say about communication?')
})


app.get('/logout', (request, response) => {
    return response.send('Thank you for logging in. logout from communication')
})


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('communication is a key factor in all relationship');
    }
})