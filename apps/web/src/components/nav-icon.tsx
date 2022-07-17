// @flow
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

type Props = { name: string; icon: IconDefinition };

export const NavIcon = ({ name, icon }: Props) => {
  return (
    <div className="flex items-center justify-center h-14 w-14 mx-auto rounded group">
      <FontAwesomeIcon icon={icon} className="px-2 group-hover:text-yellow-400" />
      {name}
    </div>
  );
};
