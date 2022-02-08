class Login{
    constructor(config){
        this.loginId=config.loginId;
        this.element=!_isNull(config.element) && isElement(config.element)?
                    config.element:document.querySelector(config.element);
    }
    init(){
        this.element.innerHTML=this.toHTML()
    }
    
    toHTML(){
        const {personalUserNameInputFieldInit,personalPasswordInputFieldInit}=this.getInputField()
        const buttonFieldInit=this.getButttonField();
        let html=`
            <div class="loginContainer">
                <div class="loginHeader">
                    <h2>Login</h2>
                </div>
                <div class="loginBody">
                    <div>
                        ${personalUserNameInputFieldInit}
                    </div>
                    <div>
                        ${personalPasswordInputFieldInit}
                    </div>
                    <div>
                        ${buttonFieldInit}
                    </div>
                </div>
            </div>
        `
        return html;
    }

    getInputField(){
        try {
            const personalUserNameInputField= new InputFields({
                "inputId":"personal_contact_username",
                "inputType":"text",
                "inputName":"username",
                "labelName":"Username:",
                "placeholder":"john123",
                "inputValue":null,
                "spanErrorId":"username"
            });
            const personalPasswordInputField= new InputFields({
                "inputId":"personal_contact_password",
                "inputType":"password",
                "inputName":"password",
                "labelName":"Password:",
                "placeholder":"john@123",
                "inputValue":null
            });

            const personalUserNameInputFieldInit=personalUserNameInputField.init()
            const personalPasswordInputFieldInit=personalPasswordInputField.init()
            
            return {
                personalUserNameInputFieldInit,personalPasswordInputFieldInit,
                }
        } catch (error) {
            console.error("Expectation at Login getInputField ❌ :: ", error);
        }
    }
    
    getButttonField(){
        try {
            const buttonField=new Button({
                "buttonId":"personal_login_button",
                "buttonTitle":"Login",
                "buttonType":"button"
            })
            const buttonFieldInit=buttonField.init();
            return buttonFieldInit;
        } catch (error) {
            console.error("Expectation at Login getButttonField ❌ :: ", error);
        }
    }
}


$(document).ready(function(){
    let login=new Login({
        "loginId":"product_management_login_form",
        "element":".product_management_login_form"
    })
    login.init();

    /** Adding click functionality on login button */
    let loginButton=$("#button1")

    $(loginButton).click(()=>{
        let validatedValue=validateInputField()
        if(validatedValue){
            loginAPI(validatedValue)
        }
    })
})
