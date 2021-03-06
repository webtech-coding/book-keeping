var budget=function(){

    var Transaction=function(id,date,reference,description,value,type){
        this.id=id,
        this.date=date,
        this.reference=reference,
        this.description=description,
        this.value=value,
        this.type=type
    }

    var data={
        items:[],
        totals:{
            exp:0,
            inc:0
        }
    }

    return {
        addItem:function(date,reference,description,value,type){
            var ID,newItem

            if(data.items.length>0){
                ID=data.items[data.items.length-1].id+1
            }else{
                ID=0
            }
            
            newItem=new Transaction(ID,date,reference,description,value,type)

            data.items.push(newItem)

            return newItem
        },
        dataItems:function(){         
           
            return data.items
        },

        totals:function(){
            return data.totals
        },

        removeData:function(id){
            var deleteItem=data.items.filter(function(item){
                return item.id==id
            })

            var index=data.items.indexOf(deleteItem[0])
            data.items.splice(index,1)
            console.log(data.items)
        }
    }
    

}()

var UI=function(budget){
    var strings={
        inputButton:'.input__submit',
        dateField:'.input__date',
        referenceField:'.input__reference',
        descriptionField:'.input__description',
        valueField:'.input__value',
        typeField:'.input__type',
        tableBody:'.table__body',
        totalExp:'.table__foot-data--expense',
        totalInc:'.table__foot-data--income',
        delete:'.table__body-data--cta'

    }

    return {
        DOMstrings:function(){
            return strings
        },
        getInput:function(){
            return{
                date:document.querySelector(strings.dateField).value,
                reference:document.querySelector(strings.referenceField).value,
                description:document.querySelector(strings.descriptionField).value,
                value:document.querySelector(strings.valueField).value,
                type:document.querySelector(strings.typeField).value
            }            
        },
        addListToUI:function(){
            var html=""
            var items=budget.dataItems()
            document.querySelector(strings.tableBody).innerHTML=''

            budget.totals().inc=0
            budget.totals().exp=0

            items.forEach(function(item){

                if(item.type=='income'){
                    budget.totals().inc += parseFloat(item.value)
                    console.log(budget.totals())
                }else{
                    budget.totals().exp += parseFloat(item.value)
                    console.log(budget.totals())
                }

                html+=`<tr class="table__body-row">
                <td class="table__body-data">${item.date}</td>
                <td class="table__body-data">${item.reference}</td>
                <td class="table__body-data">${item.description}</td>
                <td class="table__body-data ${(item.type=='income')?'table__body-data--income':''}"> ${(item.type=='income')?'$'+item.value:'---'} </td>
                <td class="table__body-data ${(item.type=='expense')?'table__body-data--expense':''}">${(item.type=='expense')?'$'+item.value:'---'}</td>
                <td class="table__body-data table__body-data--cta" data-id=${item.id}><i class="far fa-trash-alt"></i></td>
                </tr>`   
               
            })

            document.querySelector(strings.tableBody).innerHTML=html
           
        },
        displayTotals:function(){
            document.querySelector('.table__foot-data--income').textContent='$'+budget.totals().inc
            document.querySelector('.table__foot-data--expense').textContent='$'+budget.totals().exp
        },
        clearFields:function(){
            document.querySelector(strings.dateField).value=""
            document.querySelector(strings.referenceField).value=""
            document.querySelector(strings.descriptionField).value=""
            document.querySelector(strings.valueField).value=""
           
        }

    }
}(budget)

var app=function(ui,budget){

    var DOMStrings=ui.DOMstrings()

    var HandleEvent=function(){

        console.log(budget.dataItems().length)
        
        document.querySelector(DOMStrings.inputButton).addEventListener('click',addItems)
          
        document.querySelector(DOMStrings.tableBody).addEventListener('click',deleteItem)
        
    }

    var addItems=function(){
        var isEmpty,newItem
        isEmpty=true
        var inputValue = ui.getInput()
        
        if(inputValue.date=="" || inputValue.reference=="" || inputValue.description=="" || inputValue.value=="" || inputValue.type==""){
            isEmpty=true
        }else{
            isEmpty=false
        }
        
        if(!isEmpty){
            newItem=budget.addItem(inputValue.date,inputValue.reference,inputValue.description,inputValue.value,inputValue.type)

        //ADD ITEMS TO THE UI
        ui.addListToUI()

        ui.displayTotals()

        ui.clearFields()

        }
        
    }

    deleteItem=function(e){

        var deleteList  
       
       if(e.target.parentNode.classList.contains('table__body-data--cta')){
            deleteList=e.target.parentNode
       }else if(e.target.classList.contains('table__body-data--cta')){
           deleteList=e.target
       }

       var id=deleteList.getAttribute('data-id')

       budget.removeData(id)

       ui.addListToUI()

       ui.displayTotals()


    }
    
    return {
        init:function(){
           HandleEvent()
           
        }
    }
   
}(UI,budget)

app.init()



