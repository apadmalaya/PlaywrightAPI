import {test, expect} from "@playwright/test";
test("POST API Request Test", async ({request}) => {
    //request body 
    const requestBody = {
        firstname : "John",
        lastname : "Doe",
        totalprice :1000,
        depositpaid : true,
        bookingdates : {
            checkin : "2024-01-01",
            checkout : "2024-01-10"
        },
        additionalneeds : "Breakfast"
        
    }
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
