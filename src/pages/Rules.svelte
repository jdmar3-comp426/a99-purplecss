<!-- 
    Svelte component for the rules page
 -->

<style>

h1 {
    font-size: 3rem;
    margin-bottom: 0rem;
    color: #404040;
}

hr {
    width: 20%;
    color: black;
}
#rule-page {
margin-top: -2rem;
}

#rules {
    width: 80%;
    margin: auto;
}

#rules h2{
    color: red;
}

#rules-container {
    font-size: 1.5rem;
    text-align: left;
    color: gray;
    width: 50%;
    margin: auto;
}

</style>

<main>
    <div id="rule-page">
        <h1>how to play</h1>
        <hr>
        <div id="rules">
            <h2>warning: this game is made to annoy you &#128521; </h2>
           <div id="rules-container">
                • <a href="/app/login">log in</a> to your account or <a href="/app/signup">create one</a> if you don't have one.
                <br>
                <br>
                • navigate to the <a href="/app/play">play</a> page.
                <br>
                <br>
                • start typing!
                <br>
                <br>
                <br>
            </div>
        </div>
        <a href="/app/play"><button>start playing &rarr;</button></a>
    </div>
</main>