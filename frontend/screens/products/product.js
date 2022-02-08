class Product{
    constructor(config){
        this.id=config.id;
        this.title=config.title;
        this.productData=config.productData;
        this.element=!_isNull(config.element) && isElement(config.element)?
                    config.element:document.querySelector(config.element);
    }

    init(){
        let getData=localStorage.getItem("USER");
        this.userData=JSON.parse(getData);
        this.element.innerHTML=this.toHTML();
    }
    getInputField(){
        try {
            
            const productNameInputField= new InputFields({
                "inputId":"product_name",
                "inputType":"text",
                "inputName":"productsName",
                "labelName":"productsName:",
                "placeholder":"productsName",
                "inputValue":null,
            });

            const productPriceInputField=new InputFields({
                "inputId":"product_price",
                "inputType":"text",
                "inputName":"productsPrice",
                "labelName":"productsPrice:",
                "placeholder":"productsPrice",
                "inputValue":null,
            })

            const productVendorInputField=new InputFields({
                "inputId":"product_vendor",
                "inputType":"text",
                "inputName":"productsVendor",
                "labelName":"productsVendor:",
                "placeholder":"productsVendor",
                "inputValue":null,
            })
            const productQuantityInputField=new InputFields({
                "inputId":"product_quantity",
                "inputType":"number",
                "inputName":"productsQuantity",
                "labelName":"productsQuantity:",
                "placeholder":"productsQuantity",
                "inputValue":null,
            })
            const productWarrantyInputField=new InputFields({
                "inputId":"product_warranty",
                "inputType":"number",
                "inputName":"productsWarranty",
                "labelName":"productsWarranty:",
                "placeholder":"productsWarranty",
                "inputValue":null,
            })

            const productNameInputFieldInit=productNameInputField.init();
            const productPriceInputFieldInit=productPriceInputField.init();
            const productVendorInputFieldInit=productVendorInputField.init();
            const productQuantityInputFieldInit=productQuantityInputField.init();
            const productWarrantyInputFieldInit=productWarrantyInputField.init();

            return {
                productNameInputFieldInit,productPriceInputFieldInit,
                productVendorInputFieldInit,productQuantityInputFieldInit,productWarrantyInputFieldInit
            }

        } catch (error) {
            console.error("Expectation at Signup getInputField ❌ :: ", error);
        }
    }
    getButttonField(){
        try {
            const buttonField=new Button({
                "buttonId":"product_add_button",
                "buttonTitle":"add product",
                "buttonType":"button"
            })
            const buttonFieldInit=buttonField.init();
            return buttonFieldInit;
        } catch (error) {
            console.error("Expectation at getButttonField ❌ :: ", error);
        }
    }
    toHTML(){
        const { 
            productNameInputFieldInit,productPriceInputFieldInit,
            productVendorInputFieldInit,productQuantityInputFieldInit,productWarrantyInputFieldInit
            }=this.getInputField();
            const buttonFieldInit=this.getButttonField();
        let html='';
        
        html+=`
        <div id="table-container">
            <div style="display:flex;justify-content:flex-end;margin-right:5%;margin-top:1%;">
                <button id="myBtn" style="background:var(--color-lavender);color:white">Add Product</button>
            </div>
            <!-- The Modal -->
                <div id="myModal" class="modal">
                        <div class="productContainer modal-content">
                        <span class="close">&times;</span>
                        <div class="signupHeader">
                            <h2>Add Product</h2>
                        </div>
                    <div class="signupBody">
                        <div class="signup_block">
                            <div>
                                ${productNameInputFieldInit}
                            </div>
                            <div>
                                ${productPriceInputFieldInit}
                            </div>
                        </div>
                        <div class="signup_block">
                            <div>
                                ${productVendorInputFieldInit}
                            </div>
                            <div>
                                ${productQuantityInputFieldInit}
                            </div>
                        </div>
                        <div class="signup_block">
                            <div>
                                ${productWarrantyInputFieldInit}
                            </div>
                            
                        </div><br/>
                        <div >
                            <center>${buttonFieldInit}</center>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filter_table" style="display:flex;align-items:center">
                <input
                    type="search"
                    placeholder="Search..."
                    class="inputField search-input"
                    data-table="customers-list"
                    />
                </h3>
            </div>
            <table id="table" class="card table table-striped mt32 customers-list">
                <thead>
                <tr>
                    <th> ID</th>
                    <th>products Name</th>
                    <th>product Price</th>
                    <th>product Quantity</th>
                    <th>product Warranty</th>
                    <th>product Vendor</th>
                    ${this.userData?.role===AccountRole.admin?`<th>EDIT/DELETE</th>`:""}
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="btn-group">
                <button id="prev">Prev</button>
                <select id="selectValue">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
                <button id="next">Next</button>
            </div>
            </div>
        `
        return html;
    }
}
$(document).ready(function(){
    let product=new Product({
        "id":"product_manager_table_key",
        "title":"Product Manager Data",
        "productData":'',
        "element":".product_manager_data",
        
    });
    product.init();
     // Get the modal
        const modal = document.getElementById("myModal");
    
     // Get the button that opens the modal
        const btn = document.getElementById("myBtn");

     // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

     // When the user clicks the button, open the modal 
        btn.addEventListener("click", function() {
            modal.style.display = "block";
        })

     // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        let addProductButton=$("#button1")
        $(addProductButton).click(()=>{
            const productData={
                "productsName":document.getElementById("product_name").value,
                "productPrice":document.getElementById("product_price").value,
                "productVendor":document.getElementById("product_vendor").value,
                "productQuantity":parseInt(document.getElementById("product_quantity").value),
                "productWarranty":parseInt(document.getElementById("product_warranty").value)
            }
            const {userId,token}=getDetailsFromLocal();
            addProductAPI(productData,token)
            modal.style.display = "none";
        })

     // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
})
