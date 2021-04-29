'use strict'

const { server } = require('../src/server.js')
const supergoose = require('@code-fellows/supergoose')

const mockRequest = supergoose(server);

let foodItems = [
  {name: 'apple', calories: '40', type: 'FRUIT'},
  {name: 'tomato', calories: '20', type: 'VEGETABLE'},
  {name: 'cookie', calories: '200'},
  {name: 'salmon', type: 'PROTEIN'}
] 

describe('v1 server routes', () => {
  it('can create a new food item', async () => {
    const response = await mockRequest.post('/api/v1/food').send(foodItems[0])
    // console.log(response.body)
    expect(response.status).toBe(201)
    expect(response.body._id).toBeDefined()
  })

  it('can read one item from database', async () => {
    const newItem = await mockRequest.post('/api/v1/food').send(foodItems[1]);
    const id = newItem.body._id
    const response = await mockRequest.get(`/api/v1/food/${id}`)
   
    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(newItem.body.name)
   
   })

  it('can read all items from database', async () => {
    const response = await mockRequest.get('/api/v1/food')
   
    expect(response.status).toBe(200)
    expect(response.body.length).toEqual(2)
   
   })

   it('can update an item in database', async () => {
    const foodToUpdate = await mockRequest.post('/api/v1/food').send(foodItems[2])
    const newFood = {name: 'burger', calories: '1000'}
    const id = foodToUpdate.body._id
    console.log(id)
    const response = await mockRequest.put(`/api/v1/food/${id}`).send(newFood)
   
    expect(response.status).toBe(200)
    expect(response.body.name).toEqual(newFood.name)
   
   })

   it('can delete an item from database', async() => {
     const allProducts = await mockRequest.get('/api/v1/food');
     expect(allProducts.body.length).toEqual(3)
     const id = allProducts.body[0]._id
     const response = await mockRequest.delete(`/api/v1/food/${id}`)
     expect(response.status).toBe(200)
   })

})

