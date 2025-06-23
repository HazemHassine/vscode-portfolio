import React from 'react';
import * as codicons from '@vscode/codicons/src/icons/index.js';

const Codicon = ({ name, className = '', size = 16 }) => {
  const icon = codicons[name];
  if (!icon) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: icon }}
      aria-hidden="true"
    />
  );
};

export default Codicon;
