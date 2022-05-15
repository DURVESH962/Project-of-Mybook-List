class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// const JS = new book('xyz','abc',1234)
// console.log(JS)


class UI{

   static addBookToList(book){
        const list = document.querySelector("#book-list")
        const row = document.createElement('tr') //<tr></tr>
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        // console.log(row)
        list.appendChild(row);
    }
     static clearAllFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
     }
     static showAlert(msg,className){

         const div = document.createElement("div")
         div.className = `alert alert-${className}`;
         div.appendChild(document.createTextNode(msg));
         const container = document.querySelector(".container")
         const form = document.querySelector("#book-form")
         container.insertBefore(div,form)
         setTimeout(()=>{      //function() used to arrow function
             document.querySelector(".alert").remove()
         },3000)
     }
     static deleteBook(el){
         if(el.classList.contains("delete")){
           if(confirm("Are you sure want to delete this Book")){
               el.parentElement.parentElement.remove()
           }
         }
     }
     static displayBooks(){
        // const StoredBooks = [
        //     {
        //         title : "Book one",
        //         author : "John ",
        //         isbn : "1234"
        //     },
        //     {
        //         title : "Book Two",
        //         author : "Ram ",
        //         isbn : "234"
        //     },
        //     {
        //         title : "Book Three",
        //         author : "Syam ",
        //         isbn : "4567"
        //     },
        // ] 
        // alert("hello")//IIFI Function Immediate invoke function 
        const StoredBooks = Store.getBooks()
        StoredBooks.forEach((book) =>{
            UI.addBookToList(book)

        })
     }
}
 
class Store{
    
    static getBooks(){
        let books;
        if(localStorage.getItem("books") == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books));
    }
    static removeBook(isbn){
        const books =  Store.getBooks();
        books.forEach(function(book,index){
            if(book.isbn == isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem("books",JSON.stringify(books))
    }

}


//Event Display Book
document.addEventListener("DOMContentLoaded",UI.displayBooks())

// Event add a book

document.querySelector("#book-form").addEventListener("submit",(e)=>{
   e.preventDefault();
    const title = document.getElementById("title").value;
    const author =document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    // console.log(title,author,isbn)

    if(author=="" || isbn =="" || title==""){
        UI.showAlert("Please fill all the fields","danger")
    }else{
        const book = new Book(title,author,isbn)
        // console.log(book)
        //  const ui = new UI();


        UI.addBookToList(book)
        Store.addBooks(book)
        UI.clearAllFields()
        
    //   alert("Book added successfully")
        UI.showAlert("Book Added Successfully","success")
    }
})
// Event Remove a book
document.querySelector("#book-list").addEventListener("click",(e) =>{
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Books removed successfully","success")
})