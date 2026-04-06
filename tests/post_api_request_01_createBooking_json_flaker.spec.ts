/*
Test : createBooking
requestType : POST
Request Body : faker library data/random/dynamic data
 npm install luxon
  npm install @faker-js/faker
*/

import {test, expect} from "@playwright/test";
import {  faker } from "@faker-js/faker";
import {DateTime} from "luxon";
import fs from 'fs';
test("POST API Request Test", async ({request}) => {
    //request body 
    //data generation using faker library

    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
   const totalprice = faker.number.int({ min: 100, max: 1000 });
const depositpaid = faker.datatype.boolean();
    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({days:5}).toFormat("yyyy-MM-dd");
    const additionalneeds = "Breakfast";
    const requestBody = {
  firstname,
  lastname,
  totalprice,
  depositpaid,
  bookingdates: {
    checkin,
    checkout
  },
  additionalneeds
};
console.log("Request Body:", requestBody);
    
    //send POST request
    const response = await request.post("https://restful-booker.herokuapp.com/booking", { data : requestBody });    
    //assert the response status code       
    expect(response.status()).toBe(200);
    //assert the response body
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.booking).toMatchObject(requestBody);        
    // validate the response body contains a bookingid
    expect(responseBody).toHaveProperty("bookingid");
    expect(typeof responseBody.bookingid).toBe("number");   
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

                
});
