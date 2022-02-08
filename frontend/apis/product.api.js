const fetchAllProductAPI=(userId,token)=>{
    try {
        $.ajax({
			type: 'GET',
			url: `http://localhost:5000/products/get/${userId}`,
			success: function (res) {
				const user=setProducts(res);
                let responseDataList = user.products;
                generateTable(responseDataList);
                generatePaginationElement(responseDataList);
                searchInTable();                
			},
            headers: {"Authorization": token}
		})
        
    } catch (error) {
        console.error("Expectation at fetchAllProduct ❌ :: ", error);
    }
}

const editProductAPI=(data,token)=>{
    try {
       
        const resultantData={
            "productPrice":data.productPrice,
            "productName":data.productName,
            "productQuantity":data.productQuantity,
            "productVendor":data.productVendor,
            "productWarranty":data.productWarranty
        };
    
        $.ajax({
			type: 'PUT',
			url: `http://localhost:5000/products/update/${data.productId}`,
			success: function (res) {
                
			},
            data:resultantData,
            headers: {"Authorization": token}
		})
    } catch (error) {
        console.error("Expectation at editProduct ❌ :: ", error);
    }
}

const addProductAPI=(data,token)=>{
    try {
        $.ajax({
			type: 'POST',
			url: `http://localhost:5000/products/post/addProduct`,
			success: function (res) {
                alert("Product Added")
                window.location.replace('/product.html')
			},
            data:data,
            headers: {"Authorization": token}
		})
        
    } catch (error) {
        console.error("Expectation at fetchAllProduct ❌ :: ", error);
    }
}

$(document).ready(function(){
    const {userId,token}=getDetailsFromLocal();
    fetchAllProductAPI(userId,token)
})