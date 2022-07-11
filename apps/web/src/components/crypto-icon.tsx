// @flow
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';

type Props = { name: string };

export const CryptoIcon = ({ name }: Props) => {
  return (
    <div className="flex items-center justify-center h-14 w-14 mx-auto rounded">
      <FontAwesomeIcon
        icon={faBitcoin}
        className="px-2 hover:text-yellow-400"
      />
      Bitcoin
    </div>
  );
};
