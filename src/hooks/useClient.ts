import { useContext } from 'react';
import { ApolloClientContext } from '../contexts';

export const useClient = () => useContext(ApolloClientContext);
