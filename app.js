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
        tableBody:'.table__body'

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

            items.forEach(function(item){
                html+=`<tr class="table__body-row">
                <td class="table__body-data">${item.date}</td>
                <td class="table__body-data">12/2rhh</td>
                <td class="table__body-data">Bought a car</td>
                <td class="table__body-data"> --- </td>
                <td class="table__body-data">345</td>
                <td class="table__body-data table__body-data--cta"><i class="far fa-trash-alt"></i></td>
                </tr>`   

                console.log(html)
            })

            document.querySelector(strings.tableBody).innerHTML=html
            
        }
    }
}(budget)

var app=function(ui,budget){

    var DOMStrings=ui.DOMstrings()

    var HandleEvent=function(){
        
        document.querySelector(DOMStrings.inputButton).addEventListener('click',addItems)
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
        }

        //ADD ITEMS TO THE UI
        ui.addListToUI()
        
    }
    
    return {
        init:function(){
           HandleEvent()
        }
    }
   
}(UI,budget)

app.init()



