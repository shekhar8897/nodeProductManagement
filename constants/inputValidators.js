class ValidateInput{
    static username(value){
        if(!new RegExp(UsernameRegEx.length).test(value)){
            return{
                "isError":true,
                "errorMsg":"Length should be greater than 3."   
            }
        }
        else{
            return{
                "isError":false,
            }
        }
    } 

    static required(value){
        if((!value || !value.toString().trim().length)){
            return {
                "isError":true,
                "errorMsg":"Required field."
            }
        }else{
            return {
                "isError":false,
                
            }
        }
    }

    static password(value){
        if(!new RegExp(PasswordRegEx.length).test(value)){
            return{
                "isError":true,
                "errorMsg":"Length should be greater than 3."   
            }
        }
        else{
            return{
                "isError":false,
                
            }
        }
    }
}