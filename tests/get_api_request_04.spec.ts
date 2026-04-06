import{test, expect} from "@playwright/test";
test("GET API Request Test", async ({request}) => {
    const bookingId = 2; // Replace with a valid booking ID

    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    //parse the response and print 

    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions to validate the response
    expect(response.status()).toBe(200);    
    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody).toHaveProperty("depositpaid");
    expect(responseBody).toHaveProperty("bookingdates");
    expect(responseBody.bookingdates).toHaveProperty("checkin");
    expect(responseBody.bookingdates).toHaveProperty("checkout");
}); 

test("Get booking details by name -query parameter", async ({request}) => {
    const firstName = "Jim"; // Replace with a valid first name
    const lastName = "Brown"; // Replace with a valid last name         
    //sending request with query parameters
    const response = await request.get(`https://restful-booker.herokuapp.com/booking?
        firstname=${firstName}&lastname=${lastName}`);
    const responseBody = await response.json();
    console.log(responseBody);
    //add assertions to validate the response
    expect(response.status()).toBe(200);    
    expect(Array.isArray(responseBody)).toBe(true);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});