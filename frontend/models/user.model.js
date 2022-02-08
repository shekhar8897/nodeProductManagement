class UserModel{
    constructor(data){
        this.userId=data.userId;
        this.name=data.name;
        this.userName=data.userName;
        this.email=data.email;
        this.status=data.status;
        this.mobile=data.mobile;
        this.role=data.role;
        this.isLoggedIn=data.isLoggedIn;
        this.token=data.token;
        this.products=data.products;
    }

    toJson(){
        try {
            return{
                "userId":this.userId,
                "name":this.name,
                "userName":this.userName,
                "email":this.email,
                "status":this.status,
                "mobile":this.mobile,
                "role":this.role,
                "isLoggedIn":this.isLoggedIn,
                "token":this.token,
                "products":this.products
            }
        } catch (error) {
            console.error("Expectation at UserModel.toJson ❌ :: ", error);
        }
    }
}