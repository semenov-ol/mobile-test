import { shallow } from 'enzyme';
import React from 'react';
import { Rockets } from './TabOneScreen';
import TabOneScreen from './TabOneScreen';
import { Store } from '../mobx/store';

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
  describe('Check if match to snapshot', () => {
    it('should match', () => {
      const comp = shallow(<TabOneScreen {...props} />);
      expect(comp).toMatchSnapshot();
    });
  });

  describe('Test store update', () => {
    it('store should match with given data', () => {
      const store = new Store();

      store.updateData(props.store.data);
      expect(store.data?.rockets.length).toBe(props.store.data?.rockets?.length);
    });
  });
});
