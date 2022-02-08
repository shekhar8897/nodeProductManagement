class ValidateInput{
    static username(value){
        if(!new RegExp(UsernameRegEx.length).test(value)){
            return{
                "isError":true,
                "errorMsg":"Length should be greater than 1."   
            }
        }
        else{
            return{
                "isError":false,
            }
        }
    } 
    static name(value){
        if(!new RegExp(NameRegEx.length).test(value)){
            return{
                "isError":true,
                "errorMsg":"Length should be greater than 1."   
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
                "errorMsg":"Length should be greater than 5."   
            }
        }
        else{
            return{
                "isError":false,
                
            }
        }
    }

    static email(value){
        if(!new RegExp(EmailRegEx.email).test(value)){
            return {
                "isError":true,
                "errorMsg":"Please enter the valid email format."
            }
        }else{
            return{
                "isError":false
            }
        }
    }

    static contact(value){
        if(!new RegExp(ContactRegEx.length).test(value)){
            return{
                "isError":true,
                "errorMsg":"contact length should be 10."
            }
        }else{
            return{
                "isError":false
            }
        }
    }
    static confirmPassword(password,confirmPassword){
        if(password!==confirmPassword){
            return{
                "isError":true,
                "errorMsg":"password doesn't match."
            }
        }else{
            return{
                "isError":true
            }
        }
    }
}