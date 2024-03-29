import React from "react";
import { Link, LinkProps, useSearchParams } from "react-router-dom";

import { SearchParams, getSearchWith } from "../../utils/searchHelper";
import styles from "./SearchLink.module.scss";

type Props = Omit<LinkProps, "to"> & {
  params: SearchParams;
};

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      className={styles.searchLink}
      to={{
        search: getSearchWith(searchParams, params),
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
