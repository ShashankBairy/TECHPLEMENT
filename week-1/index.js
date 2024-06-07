const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const searchbtn = document.querySelector("#searchbtn");
const authorNameInput = document.querySelector("#searchtext");
const newquote = document.querySelector(".newquote");
const quotecontainer = document.querySelector(".quote-container");
const authorcontainer = document.querySelector(".author-quote");

newquote.addEventListener("click", () => {
    console.log("button pressed");
    fetch('https://zenquotes.io/api/random').
    then(response => response.json()).
    then(result => {
        quote.innerHTML = result[0].q;
        author.innerHTML = result[0].a;
    }).catch(error => console.error("Error fetching the quote:",error));
    
})

async function fetchquotebyauthor(authorName){
    
    try{
        const response = await fetch(`https://api.quotable.io/quotes?author=${authorName}`);
        const data = await response.json();
        authorcontainer.innerHTML ="";
        data.results.forEach(quotedata =>{
                const quotebox = document.createElement("div");
                quotebox.className ="quote-box";
                quotebox.innerHTML = `
                <p>${quotedata.content}</p>
                <p><em>-${quotedata.author}</em></p>`;
                authorcontainer.appendChild(quotebox);
            }
        )
        quotecontainer.style.display ="none";
        authorcontainer.style.display ="grid";
        authorNameInput.value ="";
    }catch(error){
        console.error("Error fetching quotes by author :",error);
    }
}
  
searchbtn.addEventListener("click", () => {
    const authorName= authorNameInput.value.trim();
    if(authorName){
        fetchquotebyauthor(authorName);
    }
})