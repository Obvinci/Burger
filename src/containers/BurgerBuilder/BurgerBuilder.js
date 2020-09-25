import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
  salad: 0.5,
  meat: 2.5,
  bacon: 1.3,
  cheese: 0.8
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedPrice = INGREDIENT_PRICE[type] + this.state.totalPrice;
    this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = oldCount - 1;
    this.setState({ingredients: updatedIngredients});
  }

  render () {
    const disableInfo = {...this.state.ingredients};
    for (let key in disableInfo ) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice} />
      </Aux>
    )
  }
}

export default BurgerBuilder;