function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("#111")

    React.useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://api.quotable.io/quotes");
                const data = await response.json();
                console.log("API Data:", data);

                if (data.results && Array.isArray(data.results)) {
                    setQuotes(data.results);
                    const randomIndex = Math.floor(Math.random() * data.results.length);
                    setRandomQuote(data.results[randomIndex]);
                } else {
                    console.error("Unexpected data format:", data);
                    setQuotes([
                        { content: "Fallback quote", author: "Fallback Author" }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching quotes:", error);
                setQuotes([
                    { content: "Error fetching data, using fallback.", author: "System" }
                ]);
            }
        }
        fetchData();
    }, []);

        const getQuote = () => {
            const colors = [
                "#16a085",
                "#27ae60",
                "#2c3e50",
                "#f39c12",
                "#c74c3c",
                "#9b59b6",
                "#342224",
                "#472E32",
                "#BDBB99",
                "#77B1A9",
                "#73A857"
            ]


            let randomIndex = Math.floor(Math.random() * quotes.length);
            let randomColor = Math.floor(Math.random() * colors.length);
            setRandomQuote(quotes[randomIndex]);
            setColor(colors[randomColor]);
        };

    return (
        <div style={{backgroundColor: color, minHeight: "100vh"}}>
                <div className="container pt-5">
                
            
            
                    <div className="jumbotron">
                        <div className="card">
                        <div className="card-header">Inspirational Quotes</div>
                            <div className="card-body">
                                {randomQuote ? (
                                    <>
                                    <h5 className="card-title">- {randomQuote.author || "No author"}</h5>
                                    <p className="card-text">&quot;{randomQuote.content}&quot;</p>
                                    </>
                                ) : (
                                    <h2>Loading</h2>
                                    
                                )}
                                <div>
                                    <button onClick={getQuote} className="btn btn-primary ml-3">New Quote</button>
                                    <a href={
                                        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(randomQuote.content) + encodeURIComponent(" - " + randomQuote.author)} className="btn btn-warning"><i class="fa-brands fa-x-twitter" target="_blank"></i></a>
                                    <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Erica"+ encodeURIComponent(randomQuote.content) + encodeURIComponent(" - " + randomQuote.author)} className="btn btn-danger" target="_blank"><i class="fa-brands fa-tumblr"></i></a>

                                </div>
                            
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));

