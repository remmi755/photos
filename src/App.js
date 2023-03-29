import React from 'react';
import './index.scss';
import Collection from "./Collection";

const categories = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
]

function App() {
    const [categoryId, setCategoryId] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [searchValue, setSearValue] = React.useState('')
    const [collections, setCollection] = React.useState([])

    React.useEffect(() => {
        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`http://localhost:3002/collections_photos?page=${page}&limit=3`)
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                setCollection(json)
            })
            .catch((err) =>{
                console.warn(err)
            alert('Не удалось получить данные')
        })
    }, [categoryId, page])

console.log(collections)

  return (
      <div className="App">
        <h1>Моя коллекция фотографий</h1>
        <div className="top">
          <ul className="tags">
              {
                  categories.map((category, index) => (
                      <li onClick={() => setCategoryId(index)} className={categoryId === index ? "active" : ""} key={category.name}>{category.name}</li>
                  ))
              }
          </ul>
          <input value={searchValue}
              onChange={(e) => setSearValue(e.target.value)}
              className="search-input" placeholder="Поиск по названию" />
        </div>
        <div className="content">
            {
                collections.filter((obj) => {
                    if (categoryId) {
                        return obj.category === categoryId
                    }
                    return collections
                })
                .filter((obj) => {
                    return obj.name.toLowerCase().includes(searchValue.toLowerCase())
                }).map((obj, index) => (
                    <Collection key={index} name={obj.name} images={obj.photos}/>
                ))
            }
        </div>
        <ul className="pagination">
            {
                [...Array(5)].map((_,i) => (
                    <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                ))
            }
        </ul>
      </div>
  );
}

export default App;
