/* @flow */

import React from 'react';

type Props = {
  href: ?string,
};

const Button = (props: Props) =>
  props.href
    ? <a {...props} className={props.className} />
    : <button {...props}  className={props.className}  />

export default Button