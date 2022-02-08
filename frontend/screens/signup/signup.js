class Signup{
    constructor(config){
        this.signupId=config.signupId;
        this.element=!_isNull(config.element) && isElement(config.element)?
        config.element:document.querySelector(config.element);
    }

    init(){
        this.element.innerHTML=this.toHTML()
    }

    toHTML(){
        const { 
            personalUserNameInputFieldInit,
            personalNameInputFieldInit,
            personalEmailInputFieldInit,
            personalContactInputFieldInit,
            personalPasswordInputFieldInit,
            personalConfirmPasswordInputFieldInit
        }=this.getInputField();

        const buttonFieldInit=this.getButttonField();

        let html=`
            <div class="signupContainer">
                <div class="signupHeader">
                    <h2>Signup</h2>
                </div>
                <div class="signupBody">
                    <div class="signup_block">
                        <div>
                            ${personalUserNameInputFieldInit}
                        </div>
                        <div>
                            ${personalNameInputFieldInit}
                        </div>
                    </div>
                    <div class="signup_block">
                        <div>
                            ${personalEmailInputFieldInit}
                        </div>
                        <div>
                            ${personalPasswordInputFieldInit}
                        </div>
                    </div>
                    <div class="signup_block">
                        <div>
                            ${personalContactInputFieldInit}
                        </div>
                        <div>
                            ${personalConfirmPasswordInputFieldInit}
                        </div>
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

            const personalNameInputField= new InputFields({
                "inputId":"personal_contact_name",
                "inputType":"text",
                "inputName":"name",
                "labelName":"Name:",
                "placeholder":"John_Doe",
                "inputValue":null,
                "spanErrorId":"name"
            });
            const personalEmailInputField= new InputFields({
                "inputId":"personal_contact_email",
                "inputType":"email",
                "inputName":"email",
                "labelName":"Email:",
                "placeholder":"john123@xyz.com",
                "inputValue":null
            });
            const personalPasswordInputField= new InputFields({
                "inputId":"personal_contact_password",
                "inputType":"password",
                "inputName":"password",
                "labelName":"Password:",
                "placeholder":"john@123",
                "inputValue":null,
                "spanErrorId":"password"
            });
            const personalContactInputField= new InputFields({
                "inputId":"personal_contact_contact",
                "inputType":"text",
                "inputName":"contact",
                "labelName":"Contact:",
                "placeholder":"+91-9945****23",
                "inputValue":null,
                "spanErrorId":"contact"
            });
            const personalConfirmPasswordInputField= new InputFields({
                "inputId":"personal_contact_confirm_password",
                "inputType":"password",
                "inputName":"confirmPassword",
                "labelName":"Confirm Password:",
                "placeholder":"john@123",
                "inputValue":null,
                "spanErrorId":"confirmPassword"
            });

            const personalUserNameInputFieldInit=personalUserNameInputField.init()
            const personalNameInputFieldInit=personalNameInputField.init();
            const personalEmailInputFieldInit=personalEmailInputField.init();
            const personalContactInputFieldInit=personalContactInputField.init();
            const personalPasswordInputFieldInit=personalPasswordInputField.init() 
            const personalConfirmPasswordInputFieldInit=personalConfirmPasswordInputField.init();
            return{
                personalUserNameInputFieldInit,personalNameInputFieldInit,personalEmailInputFieldInit,
                personalContactInputFieldInit,personalPasswordInputFieldInit,personalConfirmPasswordInputFieldInit
            }
        } catch (error) {
            console.error("Expectation at Signup getInputField ❌ :: ", error);
        }
    }
    getButttonField(){
        try {
            const buttonField=new Button({
                "buttonId":"personal_signup_button",
                "buttonTitle":"Signup",
                "buttonType":"button"
            })
            const buttonFieldInit=buttonField.init();
            return buttonFieldInit;
        } catch (error) {
            console.error("Expectation at Signup getButttonField ❌ :: ", error);
        }
    }
}

$(document).ready(function(){
    let signup=new Signup({
        "signupId":"product_management_signup_form",
        "element":".product_management_signup_form"
    });

    signup.init()

    /** Adding click functionality on signup button */
    let signupButton=$("#button1")
    $(signupButton).click(()=>{
        let validatedValue=validateInputField()
    
        if(validatedValue){
            signupAPI(validatedValue)
        }
    })
})