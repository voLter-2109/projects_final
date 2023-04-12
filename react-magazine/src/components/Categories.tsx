import React, { memo } from "react";

type TPropsCategories = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories: string[] = [
  "All",
  "Mantle",
  "Hoodie",
  "Dress",
  "Kimono"
];

const Categories: React.FC<TPropsCategories> = memo(
  ({ value, onChangeCategory }) => {


    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={value === index ? "active" : ""}
              >
                {categoryName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
