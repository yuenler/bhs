import React from 'react';

export function clone(user, Component) {
  return ({ props }) => <Component user={user} {...props} />;
}