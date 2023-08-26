

// console.log('welcome');

// const ultables = document.getElementById('table1');

const btn = document.getElementById('submitBtn');

btn.addEventListener('click',onSubmit);

showLists();

async function showLists(){
    let listv = []
    await axios.get('https://crudcrud.com/api/8bbd5cd0409344f49d16e5f0b1c0f2e5/restaurant')
        .then((responce)=>{
            // console.log(responce);
            listv = responce.data;
        })
        .catch((err)=>{
            console.log(err)
        })

    // console.log(listv);

    listv.forEach((item)=>{
        // console.log(item)
        let tableNumber = item.tableNum;
        const table = document.getElementById(`table${tableNumber}`);
        // const cancelBtn = document.getElementById('cancelBtn');
        
        const liDish = document.createElement('li');
        const liPrice = document.createElement('span');
        const liName = document.createElement('span');
        const id = document.createElement('span');

        const btn = document.createElement('button');

        // liDish.className = 'list-group-item';
        id.textContent = item._id;
        id.style.display = 'none';
        liPrice.className = 'list-group-item';
        id.className = 'list-group-item';
        
        btn.className = 'btn btn-danger delete';

        liDish.appendChild(id)

        liName.textContent = item.itemName;
        liPrice.textContent = item.itemPrice;
        btn.textContent = 'Cancel Order';
        liDish.appendChild(liName)
        liDish.appendChild(liPrice)
       liDish.appendChild(btn)
       
        table.append(liDish);

    })
}


async function addItem(){

    let itemName = document.getElementById('dishName');
    let itemPrice = document.getElementById('inrRupee');
    let tableNum = document.getElementById('tableNo');

    let obj={
        itemName : itemName.value,
        itemPrice : itemPrice.value,
        tableNum : tableNum.value
    }
    // console.log(obj);

    await axios.post('https://crudcrud.com/api/8bbd5cd0409344f49d16e5f0b1c0f2e5/restaurant',obj)
        .then((responce)=>{
            // console.log(responce);
        })
        .catch((err)=>{
            console.log(err)
        })
}

async function onSubmit(e){
    e.preventDefault();
    console.log('submitted');
    await addItem();
    // await showLists();
    location.reload();
}

let deleteItem = document.querySelectorAll('.tableOrd')
// console.log(deleteItem);
deleteItem.forEach((item)=>{
    // console.log(item)
    item.addEventListener('click',deleDish);
})


async function deleDish(e){
    e.preventDefault();
    // console.log('sd');
    if(e.target.classList.contains('delete')){
    // alert('arsadsade ')  
        // console.log(e.target.parentElement.firstElementChild.textContent);
        let delid = e.target.parentElement.firstElementChild.textContent

        await axios.delete(`https://crudcrud.com/api/8bbd5cd0409344f49d16e5f0b1c0f2e5/restaurant/${delid}`)
        .then((responce) => {
            console.log(responce)
            location.reload();
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
}
