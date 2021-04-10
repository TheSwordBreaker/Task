# Task

Simple Web Api WHich need to deploy on cloud.




## Objective:
Make a post request where one can pass in 
user details in JSON format with the following details:
Id, Name, mobile number, age.
Get this detail and store them in a DB.

Make a get request to get the details of any user based on the query parameters passed in the URL.
For eg: http://endpoint.com/user/age/10
Should return the details of all the users with age 10 (JSON).
Similarly, one should be able to query the data using the name, ID, mobile number.

Also, describe in detail the security measures you'd want 
to employ while deploying any API engine 
(like the one you'll make here) in production.

# Expected:
1. Data flow diagram for the request.
2. Block diagram of the deployment.
    1. heroku
    ![heroku](/resources/heroku.png)

    2. Aws 
    ![Aws](/resources/aws.png)
3. Deployed endpoint with documentation.

    https://my-task-12.herokuapp.com/api-docs
