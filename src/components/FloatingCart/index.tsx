import React, { useState, useMemo, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { ProductSinglePrice } from 'src/pages/Cart/styles';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    // [x] TODO: RETURN THE SUM OF THE PRICE FROM ALL ITEMS IN THE CART
    const total = products.reduce((acc, product) => {
      const productsSubtotal = product.price * product.quantity;

      return acc + productsSubtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // [x] TODO: RETURN THE SUM OF THE QUANTITY OF THE PRODUCTS IN THE CART
    const totalItens = products.reduce(
      (acc: number, curr: { quantity: number }) => {
        return acc + curr.quantity;
      },
      0,
    );

    return totalItens;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
