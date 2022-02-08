/**
 * @Function isElement
 * @param {*} obj 
 * @returns boolean
 */

const isElement=(obj) =>{
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object") &&
            (obj.nodeType === 1) && (typeof obj.style === "object") &&
            (typeof obj.ownerDocument === "object");
    }
}

/**
 * @Function isJson
 * @param {*} value 
 * @returns boolean
 */
const isJson=(value)=>{
    try {
        if(typeof value  === "object")JSON.parse(JSON.stringify(value))
        else JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/**
 * @Function _isNull
 * @param {*} object 
 * @returns boolean
 */
const _isNull=(object)=> undefined != object && null != object


const authenticatedUser=function(loginData){
    try {
        let login=loginData;
        let user=new UserModel({
            "userId":login.data._id,
            "userName":login.data.userName,
            "email":login.data.email,
            "name":login.data.name,
            "mobile":login.data.contact,
            "isLoggedIn":AccountLoggedStatus.login,
            "token":login.data.token
        })
        localStorage.setItem('USER', JSON.stringify(user))
        window.location.replace('/index.html')
    } catch (error) {
        console.error("Expectation at validateUser ❌ :: ", error);
    }
}
/**
 * @function validateInputField
 * 
 */
function validateInputField(){
    try {
        let errorList=checkError()
        appendErrorToDOM(errorList)
        let count=0;
        for(let i=0;i<errorList.length;i++){
            if(errorList[i][Object.keys(errorList[i])]===undefined){
                count++;
            }
        }
        if(count){
            return {
                "username":$('#personal_contact_username').val(),
                "name":$('#personal_contact_name').val(),
                "password":$('#personal_contact_password').val(),
                "email":$('#personal_contact_email').val(),
                "contact":$('#personal_contact_contact').val(),
                "confirmPassword":$('#personal_contact_confirm_password').val()
            }
        }
        
    } catch (error) {
        console.error("Expectation at validateInputField ❌ :: ", error);
    }    
}



/**
 * @function appendErrorToDOM
 * @param {*} errorList 
 */
function appendErrorToDOM(errorList){
    try {
        for(let i=0;i<errorList.length;i++){
            let keys=Object.keys(errorList[i]);
            
            let value=errorList[i][keys]
            switch(keys[0]){
                case "username":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML=""
                        break;
                    }
                case "name":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML=""
                        break;
                    }
                case "password":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML="" 
                        break;
                    }
                case "email":
                    {
                        if(value!==undefined)
                            document.getElementById(keys).innerHTML=" * "+value
                        else
                            document.getElementById(keys).innerHTML="" 
                        break;
                    }
                case "contact":
                        {
                            if(value!==undefined)
                                document.getElementById(keys).innerHTML=" * "+value
                            else
                                document.getElementById(keys).innerHTML="" 
                            break;
                        }
                case "confirmPassword":{
                    if(value!==undefined)
                        document.getElementById(keys).innerHTML=" * "+value
                    else
                        document.getElementById(keys).innerHTML="" 
                    break;
                }
                default:
                        break;
            }
            
        }
    } catch (error) {
        console.error("Expectation at appendErrorToDOM ❌ :: ", error);
    }
}


/**
 * @Function checkError
 * @param noparam
 * @return array 
 */
function checkError(){
    try {
        let inputFieldList=document.querySelectorAll(".inputField");
        let errorList=[];
        for(let i=0;i<inputFieldList.length;i++){
            // console.log(inputFieldList[i])
            let inputFieldName=inputFieldList[i].name;
            let inputFieldValue=inputFieldList[i].value;
            let tempError={}
            
            switch(inputFieldName){
                case "username":
                    {
                        let a=ValidateInput.required(inputFieldValue);
                        let b=ValidateInput.username(inputFieldValue);
                        if(a.errorMsg)
                            tempError["username"]=a.errorMsg;
                        else
                            tempError["username"]=b.errorMsg;
                        errorList.push(tempError)
                        break;
                    }
                case "name":
                    {
                        let a=ValidateInput.required(inputFieldValue);
                        let b=ValidateInput.name(inputFieldValue);
                        if(a.errorMsg)
                            tempError["name"]=a.errorMsg;
                        else
                            tempError["name"]=b.errorMsg;
                        errorList.push(tempError)
                        break;
                    }
                case "password":
                    {
                        let a=ValidateInput.required(inputFieldValue);
                        let b=ValidateInput.password(inputFieldValue);
                        if(a.errorMsg)
                            tempError["password"]=a.errorMsg;
                        else
                            tempError["password"]=b.errorMsg;
                        errorList.push(tempError)
                        break;
                    }
                case "email":{
                    let a=ValidateInput.required(inputFieldValue);
                    let b=ValidateInput.email(inputFieldValue);
                    if(a.errorMsg)
                        tempError["email"]=a.errorMsg;
                    else
                        tempError["email"]=b.errorMsg;
                    errorList.push(tempError)
                    break;
                }
                case "contact":{
                    let a=ValidateInput.required(inputFieldValue);
                    let b=ValidateInput.contact(inputFieldValue);
                    if(a.errorMsg)
                        tempError["contact"]=a.errorMsg;
                    else
                        tempError["contact"]=b.errorMsg;
                    errorList.push(tempError)
                    break;
                }
                case "confirmPassword":{
                    let tempPassword=document.getElementById("personal_contact_password").value;
                    let a=ValidateInput.required(inputFieldValue);
                    let b=ValidateInput.confirmPassword(tempPassword,inputFieldValue);
                    if(a.errorMsg)
                        tempError["confirmPassword"]=a.errorMsg;
                    else
                        tempError["confirmPassword"]=b.errorMsg;
                    errorList.push(tempError)
                    break;
                }
                default:
                    break;
            }
        }
        // console.log("---errorList=---",errorList)
        return errorList
    } catch (error) {
        console.error("Expectation at checkError ❌ :: ", error);
    }
}

/**
 * @function Logout
 * @return Logout the user and session
 */
function logout(){
    try {
        localStorage.removeItem("USER");
        window.location.replace('/login.html')
    } catch (error) {
        console.error("Expectation at logout ❌ :: ", error);
    }
}


/**
 * @function setProducts
 * @params response
 * @return User object
 */
function setProducts(res){
    try {   
                const userData=localStorage.getItem("USER")
                const item=JSON.parse(userData)
                const parsedResponse=res
                let userProductList=[]
                let user=new UserModel({
                    "userId":item.userId,
                    "name":item.name,
                    "userName":item.userName,
                    "email":item.email,
                    "status":item.isLoggedIn,
                    "mobile":item.mobile,
                    "role":item.role,
                    "isLoggedIn":AccountLoggedStatus.login,
                    "token":item.token
                })
                for(let i=0;i<parsedResponse.data.length;i++){
                    let temp=parsedResponse?.data[i];
                    let userProduct=new ProductModel({
                        "productId":temp._id,
                        "productName":temp.productsName,
                        "productPrice":temp.productPrice,
                        "productQuantity":temp.productQuantity,
                        "productWarranty":temp.productWarranty,
                        "productVendor":temp.productVendor
                    })
                    userProductList.push(userProduct);
                }  
                user.products=userProductList 
                localStorage.removeItem("USER");
                localStorage.setItem("USER",JSON.stringify(user))
                return user;
    } catch (error) {
        console.error("Expectation at getProducts ❌ :: ", error);
    }
}

function getDetailsFromLocal(){
    try {
        let localData=localStorage.getItem("USER");
        localData=JSON.parse(localData)
        return {"userId":localData?.userId,"token":localData?.token};
    } catch (error) {
        console.error("Expectation at getDetailsFromLocal ❌ :: ", error);
    }
}


