import data from '../data/portfolio.json'
import './Ticker.css'

export default function Ticker() {
  const items = [...data.ticker, ...data.ticker, ...data.ticker]

  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((item, i) => (
          <span className="ticker__item" key={i}>
            <span className="ticker__label">{item.label}</span>
            <span className="ticker__value">{item.value}</span>
            <span className="ticker__sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
