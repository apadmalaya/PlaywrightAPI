/*
Test : createBooking
requestType : POST
Request Body : static JSON data
*/

import {test, expect} from "@playwright/test";
import fs from 'fs';
test("POST API Request Test", async ({request}) => {
    //request body 
    const jsonFilePath = "test_data/post_request_body.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
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
