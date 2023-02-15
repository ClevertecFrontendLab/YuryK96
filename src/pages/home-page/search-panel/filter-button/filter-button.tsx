import React, { useState } from 'react';

import s from './filter-button.module.scss';

export const FilterButton: React.FC<FilterButton> = ({ handleSelectedFilter, selectedFilter }) => {
  const filterNames: FilterName[] = [
    { name: 'Expensive', id: 0 },
    { name: 'Cheap', id: 1 },
    { name: 'new', id: 2 },
    { name: 'old', id: 3 },
  ];
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={s.filterButton}>
      <div className={s.dropdown}>
        <div role='presentation' className={s.dropdownBtn} onClick={() => setIsActive(!isActive)}>
          {' '}
          <svg width='13' height='11' viewBox='0 0 13 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.5 1C0.5 0.723858 0.723858 0.5 1 0.5H9.49994C9.77608 0.5 9.99994 0.723858 9.99994 1C9.99994 1.27614 9.77608 1.5 9.49994 1.5H1C0.723858 1.5 0.5 1.27614 0.5 1ZM9.5 3.5C9.77614 3.5 10 3.72386 10 4V8.793L11.6464 7.1468C11.8417 6.95155 12.1583 6.95157 12.3535 7.14684C12.5488 7.34212 12.5487 7.6587 12.3535 7.85395L9.85362 10.3535L9.85353 10.3536C9.76305 10.444 9.63806 10.5 9.5 10.5L9.49698 10.5C9.43029 10.4996 9.36668 10.4861 9.30861 10.4621C9.24963 10.4377 9.19438 10.4015 9.14645 10.3536L6.64645 7.85355C6.45118 7.65829 6.45118 7.34171 6.64645 7.14645C6.84171 6.95118 7.15829 6.95118 7.35355 7.14645L9 8.79289V4C9 3.72386 9.22386 3.5 9.5 3.5ZM1 4.5C0.723858 4.5 0.5 4.72386 0.5 5C0.5 5.27614 0.723858 5.5 1 5.5H5.49994C5.77608 5.5 5.99994 5.27614 5.99994 5C5.99994 4.72386 5.77608 4.5 5.49994 4.5H1ZM1 8.5C0.723858 8.5 0.5 8.72386 0.5 9C0.5 9.27614 0.723858 9.5 1 9.5H4.5C4.77614 9.5 5 9.27614 5 9C5 8.72386 4.77614 8.5 4.5 8.5H1Z'
              fill='#A7A7A7'
            />
          </svg>{' '}
          <p className={s.filterName}> {selectedFilter || 'По рейтингу'}</p>
        </div>
        {isActive && (
          <div className={s.dropdownContent}>
            {filterNames.map((name) => (
              <div
                role='presentation'
                key={name.id}
                onClick={(e) => {
                  handleSelectedFilter((e.target as HTMLElement).innerText);
                  setIsActive(false);
                }}
                className={s.dropdownItem}
              >
                {name.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type FilterName = { name: string; id: number };

// eslint-disable-next-line @typescript-eslint/no-redeclare
type FilterButton = {
  handleSelectedFilter: (nameFilter: string) => void;
  selectedFilter: string;
};
