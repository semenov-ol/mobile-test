import { shallow } from 'enzyme';
import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { Rockets } from './TabOneScreen';
import TabOneScreen from './TabOneScreen';
import { Store } from '../mobx/store';
import TabTwoScreen from './TabTwoScreen';

describe('TabOneScreen Rendering', () => {
  const props: { store: { data?: { rockets: Rockets[] } | undefined; updateData: (data: any) => {} } } = {
    store: {
      data: {
        rockets: [
          {
            name: 'rocket',
            __typename: 'rocket',
            boosters: 4,
            description: 'desc',
            mass: {
              kg: 4,
            },
          },
          {
            name: 'rocket2',
            __typename: 'rocket2',
            boosters: 5,
            description: 'desc2',
            mass: {
              kg: 42,
            },
          },
        ],
      },
      updateData: () => {
        return 'data';
      },
    },
  };

  const store = new Store();

  describe('Check if match to snapshot', () => {
    it('should match', () => {
      const comp = shallow(
        <MockedProvider>
          <TabOneScreen />
        </MockedProvider>
      );
      expect(comp).toMatchSnapshot();
    });
  });

  describe('Check if match snapshot for 2 component', () => {
    it('should match', () => {
      const component = shallow(
        <MockedProvider>
          <TabTwoScreen />
        </MockedProvider>
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('Test store update', () => {
    it('store should match with given data', () => {
      store.updateData(props.store.data);
      expect(store.data?.rockets.length).toBe(props.store.data?.rockets?.length);
    });
  });

  describe('Test update wish list', () => {
    it('should match with given data', () => {
      store.updateWishList({ value: 'test', key: 20 });
      expect(store.wishList.length).toBe(1);
    });
  });
});
