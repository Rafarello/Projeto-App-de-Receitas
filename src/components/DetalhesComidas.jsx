import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Player } from 'video-react';
import { apiReceitaID } from '../services/RequestApi';
import BebidaRecomendada from './BebidaRecomendada';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Ingredientes from './Comidas/Ingredientes';
import BtnIniciarReceita from './Comidas/BtnIniciarReceita';
import Compartilhar from './Botoes/Compartilhar';

export default function DetalhesComidas() {
  const [receitaDetalhes, setReceitaDetalhes] = useState();
  const [isFavorited, setIsFavorited] = useState(false);
  const locationId = useLocation().pathname;
  const location = locationId.replace('/comidas/', '');

  useEffect(() => {
    apiReceitaID(location, '/comidas').then((res) => setReceitaDetalhes(res));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorited(favoriteRecipes
      ? favoriteRecipes.some((e) => e.id === location) : false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveFavoriteToLocalStorage(recipe) {
    setIsFavorited(true);
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      favoriteRecipes = [];
    }
    const isFavoritedAlready = favoriteRecipes
      .some((favRecipes) => favRecipes.id === recipe.idMeal);
    if (isFavoritedAlready) return favoriteRecipes;
    const newFavoriteRecipe = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, newFavoriteRecipe]));
  }

  return (
    <div>
      { !receitaDetalhes
        ? <Link to="/comidas">Voltar</Link>
        : receitaDetalhes.meals
          .map((receita) => (
            <div key={ receita.idMeal }>
              <img
                data-testid="recipe-photo"
                style={ { width: '150px' } }
                src={ receita.strMealThumb }
                alt={ receita.strMeal }
              />
              <h4 data-testid="recipe-title">{ receita.strMeal }</h4>
              <Compartilhar idReceita={ locationId } />
              <button
                type="button"
                onClick={ () => saveFavoriteToLocalStorage(receita) }
              >
                <img
                  data-testid="favorite-btn"
                  src={ isFavorited ? blackHeartIcon : whiteHeartIcon }
                  alt="Favoritar"
                />
              </button>

              <h6 data-testid="recipe-category">{ receita.strCategory}</h6>

              <Ingredientes receitaDetalhes={ receitaDetalhes } />

              <p data-testid="instructions">{ receita.strInstructions }</p>

              <BebidaRecomendada recomenda="recomendaBebida" />
              <div style={ { width: '10px' } } data-testid="video">
                <Player
                  playsInline
                  src={ receita.strYoutube }
                  // poster={ receita.strMealThumb }
                />
              </div>
              <BtnIniciarReceita receita={ receita } />
            </div>
          )) }
    </div>
  );
}
