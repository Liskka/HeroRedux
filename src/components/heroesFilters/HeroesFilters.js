import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import {filtersFetch, setActiveFilter} from '../../actions/index';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();


    const getFilters = async () => {
        const response = await request(
          "http://localhost:3001/filters"
        ).then((response) => response);
        
        dispatch(filtersFetch(response));
    };
    
    useEffect(() => {
        getFilters();
    }, []);
    
    const activeClass = (name) => {
        dispatch(setActiveFilter(name))
    }
    
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => (
                        <button 
                            key={filter.name}
                            className={'btn ' + filter.className + (filter.isActive ? ' active' : '')}
                            onClick={() => activeClass(filter.name)}
                        >
                            {filter.label}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;