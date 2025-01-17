import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([])

  function handleAddItem(item) {
    setItems(items => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems(items => [...items.filter(i => i.id !== id)])
  }

  function handleClearAll() {
    const deleteItems = window.confirm('Are you sure you wish to delete all items?')
    if (deleteItems) setItems([])
  }

  return (
    <div className="app">
      <Header />
      <AddItem onAddItem={handleAddItem} />
      <Items items={items} onDeleteItem={handleDeleteItem} />
      {items.length > 0 && <button onClick={handleClearAll} className="btn mt-20">Clear All</button>}
    </div>
  );
}

function Header() {
  return (
    <h1 className="border-bottom">🛍️ Shopping List</h1>
  )
}

function AddItem({ onAddItem }) {
  const [item, setItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (!item) return
    const newItem = {
      item,
      id: Date.now()
    }
    onAddItem(newItem)
    setItem("")
  }

  return (
    <div className="border-bottom">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Item" value={item} onChange={e => setItem(e.target.value)} />
        <button className="btn">Add Item</button>
      </form>
    </div>
  )
}

function Items({ items, onDeleteItem }) {
  return (
    <ul className="items">
      {items.map(i => (
        <li key={i.id}>{i.item} <button onClick={() => onDeleteItem(i.id)}>❌</button></li>
      ))}
    </ul>
  )
}