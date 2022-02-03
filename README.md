	//////////////

	How To Run the File

	1. First Install All the node modules using : npm install
	2. Run the Command : nodemon index.js || node index.js
	3. Then your server will start on localhost : http://localhost:5000/register
	4. You can directly copy the http://localhost:5000/register link in the browser

	//////////////

	FUNCTIONALITIES

	Register API Added
	Login API Added
	Logout Added
	Show, Add, Delete, Edit API Added

	//////////////////// USER REGISTER LOGIN ///////////////////////////////

	LOGIN API

	API: Login
	Method: POST
	URL: http://localhost:5000/api/login

	Request:
	{
	"username": "string",
	"password": "string"
	}

	Sample Payload:
	{
	"username": "cloud_user",
	"password": "asdf"
	}

	Response :

	{
	"user": {
	"\_id": "61f04093c4d0168502485afc",
	"name": "Faraz",
	"contact": "9876543210",
	"email": "faraz.sid77@gmail.com",
	"username": "cloud_user",
	"password": "$2a$08$GetyRsFsM6SFMvRTkxMu4.THPrKOzXMaTxCgOGGT0UdP2bvTNJYoy",
	"\_\_v": 0
	},
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxZjA0MDkzYzRkMDE2ODUwMjQ4NWFmYyIsIm5hbWUiOiJGYXJheiIsImNvbnRhY3QiOiI5ODc2NTQzMjEwIiwiZW1haWwiOiJmYXJhei5zaWRkaXF1aTA3N0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNsb3VkX3VzZXIiLCJwYXNzd29yZCI6IiQyYSQwOCRHZXR5UnNGc002U0ZNdlJUa3hNdTQuVEhQcktPelhNYVR4Q2dPR0dUMFVkUDJidlROSllveSIsIl9fdiI6MH0sImlhdCI6MTY0MzMyMjk0NCwiZXhwIjoxNjQzNDA5MzQ0fQ.eDawAWhyYPLecVUrTnOcU7K8qq317ZovFJajtKT_7AE"
	}

	//////////////////

	REGISTER API

	API : REGISTER USER API
	METHOD : POST
	URL : http://localhost:5000/api/register

	Request
	{
	"name": string
	"contact": string,
	"email": string,
	"username": string,
	"password": string
	}

	Sample Payload
	{
	"name": "NewFaraz",
	"contact": "9999909",
	"email": "faraz.dd@gmail.com",
	"username": "faraff",
	"password": "onewo"
	}

	Response
	{
	"user": {
	"name": "NewFaraz",
	"contact": "9999909",
	"email": "faraz.dd@gmail.com",
	"username": "faraff",
	"password": "$2a$08$/8eDe3jYLTpX0ji2EbhUYe5NSFrK/TWne4rCmY6EkWNBIZ2j8VzL6",
	"\_id": "61f3184bb78dc10d373b1c9e",
	"\_\_v": 0
	},
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJOZXdGYXJheiIsImNvbnRhY3QiOiI5OTk5OTA5IiwiZW1haWwiOiJmYXJhei5kZEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImZhcmFmZiIsInBhc3N3b3JkIjoiJDJhJDA4JC84ZURlM2pZTFRwWDBqaTJFYmhVWWU1TlNGcksvVFduZTRyQ21ZNkVrV05CSVoyajhWekw2IiwiX2lkIjoiNjFmMzE4NGJiNzhkYzEwZDM3M2IxYzllIiwiX192IjowfSwiaWF0IjoxNjQzMzIxNDE5LCJleHAiOjE2NDM0MDc4MTl9.P-Lkvklq9Eky-YcviQLB6JQkyZIjqAevuBL-SNGZhCM"
	}

	///////////////////// PRODUCT ////////////////////
	/////////////////

	GET PRODUCT

	API : GET Product
	METHOD : GET
	URL : http://localhost:5000/api/product

	Response
	{
	"products": [
	{
	"\_id": "",
	"name": "ABCD",
	"price": "8890",
	"quantity": "99",
	"vendor": "12",
	"warranty": "90902235",
	}
	}

	////////////////////////////////////////////////////////////////

	POST PRODUCT

	API : POST Product
	METHOD : POST
	URL : http://localhost:5000/api/product

	Request
	{
	"name": "string",
	"price": "string",
	"quantity": "string",
	"vendor": "string",
	"warranty": "string"
	}

	Sample Payload

	{
	"name": "Product1",
	"price": "1000",
	"quantity": "10",
	"vendor": "ABC",
	"warranty": "2 years"
	}

	Response

	{
	"product": {
	"\_id": "61f1023e57b0e1200e27129f",
	"name": "Product1",
	"price": "1000",
	"quantity": "10",
	"vendor": "ABC",
	"warranty": "2 years",
	"\_id": "61f31b97b78dc10d373b1ca1",
	"\_\_v": 0
	}
	}

	/////////////////////////////////////

	EDIT Product

	API : PUT Product
	METHOD : PUT
	URL : http://localhost:5000/api/product:id

	Request

	{
	"name": "string",
	"price": "string",
	"quantity": "string",
	"vendor": "string",
	"warranty": "string"
	}

	Sample Payload
	{
	"name": "ProductEdit",
	"price": "1030",
	"quantity": "15",
	"vendor": "ABDC",
	"warranty": "3 years"
	}

	Response
	{
	"message": "Product updated successfully!"
	}

	////////////////////////////////////

	DELETE PRODUCT

	API : Delete Product
	METHOD : DELETE
	URL : http://localhost:5000/api/product:id

	Request{
	http://localhost:5000/api/product/61f31b97b78dc10d373b1ca1 (id)
	"\_id": id
	}

	Response
	{
	"message": "Product deleted successfully!"
	}

	////////////////////////////////////////////////////////////////////////

