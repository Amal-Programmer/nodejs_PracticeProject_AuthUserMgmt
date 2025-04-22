const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
     // Send a JSON response containing the friends array, formatted with an indentation of 4 spaces for readability
  res.send(JSON.stringify({friends},null,4));

});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
    const user = friends[req.params.email];
    res.send(user);
    
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
   // Check if email is provided in the request body
   if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "DOB": req.body.DOB,
    };
}
// Send response indicating user addition
res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    // Extract email parameter from request URL
    const email = req.params.email;
    let friend = friends[email];  // Retrieve friend object associated with email
    if (friend) {  // Check if friend exists
        let DOB = req.body.DOB;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
       
        if (DOB) {
            friend["DOB"] = DOB;
        }
       
        if (firstName) {
            friend["firstName"] = firstName;
        }
       
        if (lastName) {
            friend["lastName"] = lastName;
        }
       
        friends[email] = friend;  // Update friend details in 'friends' object
        res.send(`Friend with the email ${email} updated.`);
    } else {
        // Respond if friend with specified email is not found
        res.send("Unable to find friend!");
    }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
   const email = req.params.email;
   if(email){
    delete friends[email];
   }
   res.send(`The friend with the email ${email} has been deleted`)

 
});

module.exports=router;
