class Button{
    constructor(data){
        this.buttonId=data.buttonId;
        this.buttonTitle=data.buttonTitle;
        this.buttonType=data.buttonType;
    }

    init(){
        return this.toHTML();
    }

    toHTML(){
        let html=this.createButton();
        return html;
    }

    createButton(){
        try {
            let buttonHTML='';

            buttonHTML+=`
                <div class="buttonBlock">
                    <button  id="button1" class="button"  type=${this.buttonType}
                        value=${this.buttonTitle}>${this.buttonTitle}
                    </button>
                </div>
            `
            return buttonHTML;
        } catch (error) {
            console.error("Expectation at Button createButton ❌ :: ", error);
        }
    }
    
}

