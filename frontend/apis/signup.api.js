const signupAPI=function(inputData){
    try {
        $.ajax({
			type: 'POST',
            url:"http://localhost:5000/users/post/signup",
			contentType:"application/json; charset=utf-8",
            data:JSON.stringify(inputData),
            success: function (res) {
                console.log(res)
                authenticatedUser(res)
			},
            error:function(req){
                const res=JSON.parse(req.responseText)
                alert(res.data)
            }
		})
    } catch (error) {
        console.error("Expectation at loginAPI ❌ :: ", error);
    }
}
