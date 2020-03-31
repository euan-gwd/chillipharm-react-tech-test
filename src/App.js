import React, { useState } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import chilliPharm from './data.json'
import './App.css'

function App() {
  const [assets, setAssets] = useState(chilliPharm.assets)
  const [searchItem, setSearchItem] = useState('')

  const addNewTag = (asset, value) => {
    const newAssets = [...assets]
    const filteredAsset = newAssets.filter((item) => item === asset)
    const tagsArray = filteredAsset[0].tags
    tagsArray.push({ id: value, text: value })
    setAssets(newAssets)
  }

  const deleteTag = (tag, asset) => {
    const updatedAssets = [...assets]
    const filteredAsset = updatedAssets.filter((item) => item === asset)
    const tagsArray = filteredAsset[0].tags
    const updatedTagArray = tagsArray.filter((item) => item !== tag)
    const updatedAsset = { ...filteredAsset[0], tags: updatedTagArray }
    const filteredAssets = updatedAssets.filter((item) => item !== asset)
    const newAssets = [...filteredAssets, updatedAsset]
    setAssets(newAssets)
  }

  const handleSearch = (value) => {
    setSearchItem(value)
    const clonedAssets = [...assets]
    const filteredAssets = clonedAssets.filter((item) => item.title === value)
    // setAssets(filteredAssets)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>ChilliPharm Asset Tags</h2>
        <h6>Tag your assets!</h6>
        <div>
          <label htmlFor="assetFilter">
            <div>Add tags to filter:</div>
            <input
              type="search"
              name="assetFilter"
              placeholder="Add new tag"
              value={searchItem}
              onChange={(evt) => handleSearch(evt.target.value)}
              className="product-search"
            />
          </label>
        </div>
      </header>

      <main>
        <ul className="products-listing">
          {assets.map((asset, idx) => (
            <li key={idx} className="product-card">
              <img src={asset.url} className="image" alt="pic" />
              <h2>{asset.title}</h2>
              <div className="tags">
                {asset.tags.map((tag) => (
                  <div key={tag.id} className="tag">
                    {tag.text}
                    <span onClick={() => deleteTag(tag, asset)}>
                      <TiDeleteOutline />
                    </span>
                  </div>
                ))}
              </div>
              <form>
                <input
                  type="text"
                  name="addNewTag"
                  placeholder="Add new tag"
                  onBlur={(evt) => addNewTag(asset, evt.target.value)}
                />
              </form>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
