// @flow
import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import uuidv4 from "uuid/v4";

type Props = {
  className: string,
  value: string,
};

const IconWithTooltip = ({ className, value }: Props) => {
  const id = uuidv4();

  return (
    <Fragment>
      <i className={className} data-tip data-for={id} />
      <ReactTooltip id={id} place="top" type="dark" effect="solid">
        <span>{value}</span>
      </ReactTooltip>
    </Fragment>
  );
};

export default IconWithTooltip;
