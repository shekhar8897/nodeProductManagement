/**
 * @Function generateTable
 * @param {*} responseDataList 
 * @param {*} range 
 * @Purpose create a table
*/
const generateTable = (responseDataList, range = 5) => {
        try {
            let getData=localStorage.getItem("USER");
            getData=JSON.parse(getData)
            let jsonArray = [];
            for (let i = 0; i < range; i++) {
                jsonArray = Object.values(responseDataList[i]);
                let tr = document.createElement("tr");
                for (let j = 0; j < jsonArray.length; j++) {
                    let td = document.createElement("td");
                    td.className="data"
                    td.setAttribute("key",jsonArray[j])
                    let cellText = j!==0?document.createTextNode(jsonArray[j]):document.createTextNode(i+1);
                    td.appendChild(cellText);
                    tr.appendChild(td);
                    document.querySelector("tbody").appendChild(tr);
                    createButtonGroup(tr,j,jsonArray)
                }
            }
        } catch (error) {
            console.error("Expectation at generateTable ❌ :: ", error);
        }
};

/**
 * @Function createButtonGroup of EDIT/ DELETE/ SAVE
 * @params index,datalength
 */
const createButtonGroup=(tr,j,jsonArray)=>{
    try {
         /** Creating button Group */
        let buttonTD = document.createElement("td");
        buttonTD.className="buttonTD"
        let saveButton=document.createElement("button");
        saveButton.className="save"
        saveButton.appendChild(document.createTextNode("SAVE"))
        let editButton=document.createElement("button");
        editButton.className="edit"
        editButton.appendChild(document.createTextNode("EDIT"))
        let deleteButton=document.createElement("button");
        deleteButton.className="delete"
        deleteButton.appendChild(document.createTextNode("DELETE"))
        buttonTD.appendChild(saveButton)
        buttonTD.appendChild(editButton)
        buttonTD.appendChild(deleteButton)
        if(j===jsonArray.length-1){
            tr.appendChild(buttonTD)
        }
    } catch (error) {
        console.error("Expectation at createButtonGroup ❌ :: ", error);
    }
}
    
/**
     * @Function removePrevChild
     * @Purpose remove the prev child from DOM
*/

const removePrevChild = () => {
        try {
            let tbody = document.querySelector("tbody");
            let child = tbody.lastElementChild;
            while (child) {
            tbody.removeChild(child);
            child = tbody.lastElementChild;
            }
            
        } catch (error) {
            console.error("Expectation at removePrevChild ❌ :: ", error);
        }
    };
    
/**
     * @Function toggle next prev on click
     * @param {*} responseDataList 
     * @param {*} startIndex 
     * @param {*} endIndex 
*/
const toggleNextPrev = (responseDataList, startIndex, endIndex) => {
        try {
            let jsonArray = [];
            for (let i = startIndex; i < endIndex; i++) {
            jsonArray = Object.values(responseDataList[i]);
            let tr = document.createElement("tr");
            for (let j = 1; j < jsonArray.length; j++) {
                let td = document.createElement("td");
                td.className="data"
                let cellText = j!==0?document.createTextNode(jsonArray[j]):document.createTextNode(i+1);
                td.appendChild(cellText);
                tr.appendChild(td);
                document.querySelector("tbody").appendChild(tr);
                createButtonGroup(tr,j,jsonArray)
            }
            }
        } catch (error) {
            console.error("Expectation at toggleNextPrev ❌ :: ", error);
        }
    };
    
/**
     * @Function generatePaginationElement
     * @param {*} responseDataList 
*/
const generatePaginationElement = (responseDataList) => {
    try {
        let count = 0;
        let prevBtn = document.getElementById("prev");
        let nextBtn = document.getElementById("next");
        let selectedValue = document.getElementById("selectValue");
        selectedValue.addEventListener("change", () => {
            count = 0;
            removePrevChild();
            toggleNextPrev(responseDataList, 0, selectedValue.value);
            console.log(selectedValue.value);
        });
        nextBtn.addEventListener("click", () => {
            count++;
            if (count <= responseDataList.length / selectedValue.value - 1) {
            removePrevChild();
            toggleNextPrev(
                responseDataList,
                count * parseInt(selectedValue.value),
                count * parseInt(selectedValue.value) + parseInt(selectedValue.value)
            );
            } else {
            count = responseDataList.length / selectedValue.value;
            }
        });
        prevBtn.addEventListener("click", () => {
            count--;
            if (count >= 0) {
            removePrevChild();
            toggleNextPrev(
                responseDataList,
                count * parseInt(selectedValue.value),
                count * parseInt(selectedValue.value) + parseInt(selectedValue.value)
            );
            } else {
                count = 0;
            }
        });
        } catch (error) {
        console.log("-------generatePaginationElement------------------");
        }
};
    
    /**
     * @function searchInTable
     * @purpose  search in contact table
     */
const searchInTable=()=>{
        try {
            
            let TableFilter = (function (myArray) {
            let search_input;
    
            function _onInputSearch(e) {
                search_input = e.target;
                let tables = $('.'+
                    $(search_input).attr("data-table")
                );
                
                myArray.forEach.call(tables, function (table) {
                myArray.forEach.call(table.tBodies, function (tbody) {
                    myArray.forEach.call(tbody.rows, function (row) {
                    let text_content = row.textContent.toLowerCase();
                    let search_val = search_input.value.toLowerCase();
                    row.style.display =
                        text_content.indexOf(search_val) > -1 ? "" : "none";
                    });
                });
                });
            }
        
            return {
                init: function () {
                var inputs = $(".search-input");
                myArray.forEach.call(inputs, function (input) {
                    input.oninput = _onInputSearch;
                });
                }
            };
            })(Array.prototype);
            TableFilter.init();
        } catch (error) {
            console.error("Expectation at searchInTable ❌ :: ", error);
        }
}

/**
 * onclicking on edit button
 */
$(document).on("click", ".edit", function () {
    $(this)
        .parent()
        .siblings("td.data")
        .each(function () {
            let content = $(this).html();
            $(this).html('<input value="' + content + '" />');
        });
        $(this).siblings(".save").show();
        $(this).siblings(".delete").hide();
        $(this).hide();
});
/**
 * onclicking on save button1
 */
$(document).on("click", ".save", function () {
    let editProductDataList=[];
    let id='';
        $("input").each(function () {
            id=$('.data').attr("key")
            let content = $(this).val();
            console.log(content)
            $(this).html(content);
            editProductDataList.push(content);
            $(this).contents().unwrap();
        });
        
        const userData=JSON.parse(localStorage.getItem("USER"));
        let tempProduct=userData.products[parseInt(editProductDataList[0])-1]
        console.log(tempProduct,'dksahfsajkfcbk')
        const productData=new ProductModel({
            "productId":id,
            "productName":editProductDataList[2],
            "productPrice":editProductDataList[3],
            "productQuantity":editProductDataList[4],
            "productWarranty":editProductDataList[5],
            "productVendor":editProductDataList[6],
        })
        const {userId,token}=getDetailsFromLocal();
        editProductAPI(productData,token)
        
        $(this).siblings(".edit").show();
        $(this).siblings(".delete").show();
        $(this).hide();
});

/**
 * onclicking on delete button
 */
$(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
});