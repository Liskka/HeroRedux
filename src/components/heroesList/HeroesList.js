import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, isLoading, isError, filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const activeFilterName = filters.find(filter => filter.isActive)?.name;

    

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = (id) => {
        request('http://localhost:3001/heroes/' + id, "DELETE", JSON.stringify({}))
            .then(data => console.log('id: ', id, ' deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => {

        if (heroes.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        const activeHeroes = activeFilterName === 'all' ? heroes : heroes.filter(hero => hero.element === activeFilterName)

        return activeHeroes.map((hero) => {
            return (
                // <CSSTransition
                //     key={hero.id}
                //     timeout={500}
                //     classNames="hero"
                // >
                    <HeroesListItem key={hero.id} {...hero} onDelete={() => onDelete(hero.id)}/>
                // {/* </CSSTransition> */}
            )
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {/* <TransitionGroup> */}
                {elements}
            {/* </TransitionGroup> */}
        </ul>
    )
}

export default HeroesList;