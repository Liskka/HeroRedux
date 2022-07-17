// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { heroesFetching, heroesFetched, heroesFetchingError } from "../../actions";

const HeroesAddForm = () => {

    // const [heroName, setHeroName] = useState('');
    // const [heroDescr, setHeroDescr] = useState('');
    // const [heroElement, setHeroElement] = useState('');
    const {request} = useHttp();
    const {filters, heroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const [newHero, setNewHero] = useState({
        // id: heroes.length + 1,
        name: '',
        description: '',
        element: ''
    })


    const addNewHero = (e) => {
        e.preventDefault();
        request('http://localhost:3001/heroes', "POST", JSON.stringify(newHero))
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
        setNewHero({
            name: '',
            description: '',
            element: ''
        })
    }
    

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={newHero.name}
                    onChange={e => setNewHero({
                        ...newHero,
                        name: e.target.value
                    })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={newHero.description}
                    onChange={e => setNewHero({
                        ...newHero,
                        description: e.target.value
                    })}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    defaultValue={'DEFAULT'}
                    onChange={(e) => setNewHero({
                        ...newHero,
                        element: e.target.value
                    })}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                        <option value='DEFAULT' disabled hidden>Я владею элементом...</option>
                    {filters.filter(filter => filter.name !== 'all').map(filter => (
                        <option 
                            key={filter.name}
                            value={filter.name}
                        >
                            {filter.label}
                        </option>
                        ))}
                        {/* <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={(e) => addNewHero(e)}
            >
                Создать</button>
        </form>
    )
}

export default HeroesAddForm;