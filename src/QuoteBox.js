import React, { useState, useEffect } from 'react'
import Typewriter from 'typewriter-effect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

const QuoteBox = () => {
  const [quotes, setQuotes] = useState([])
  const [currentQuote, setCurrentQuote] = useState({})

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data)
        setCurrentQuote(data[Math.floor(Math.random() * data.length)])
      })
      .catch(console.log)
  }, [])

  const getNewQuote = () => {
    const newQuoteIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[newQuoteIndex])
  }

  return quotes.length ? (
    <div id="quote-box" className="twelve columns">
      <h1 id="text">
        <Typewriter
          options={{
            strings: currentQuote.text,
            autoStart: true,
          }}
        />
      </h1>
      <h2 id="author">
        {currentQuote.author ? currentQuote.author : 'Unknown'}
      </h2>
      <button id="new-quote" onClick={getNewQuote}>
        Get new quote
      </button>
      <button>
        <a
          id="tweet-quote"
          href={`http://twitter.com/intent/tweet?text=${encodeURI(
            currentQuote.text
          )}`}
        >
          tweet quote &nbsp;
          <FontAwesomeIcon icon={faShare} size="2x" />
        </a>
      </button>
    </div>
  ) : (
    <div id="quote-box" className="twelve columns">
      <h1 id="text">Loading...</h1>
    </div>
  )
}

export default QuoteBox
