class ProductModel{
    constructor(data){
        this.productId=data.productId;
        this.productName=data.productName;
        this.productPrice=data.productPrice;
        this.productQuantity=data.productQuantity;
        this.productWarranty=data.productWarranty;
        this.productVendor=data.productVendor;
    }

    toJson(){
        try {
            return{
                "productId":this.productId,
                "productName":this.productName,
                "productPrice":this.productPrice,
                "productQuantity":this.productQuantity,
                "productWarranty":this.productWarranty,
                "productVendor":this.productVendor,
            }
        } catch (error) {
            console.error("Expectation at ProductModel.toJson ❌ :: ", error);
        }
    }
}