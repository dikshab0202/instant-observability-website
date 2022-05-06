import React from 'react';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import Markdown from './Markdown';

const allowedElements = [
  'h1',
  'h2',
  'h3',
  'ol',
  'ul',
  'li',
  'p',
  'blockquote',
  'code',
  'a',
  'strong',
  'em',
  'hr',
];

const QuickstartOverview = ({ quickstart }) => {
  return (
    <>
      {quickstart.description && (
        <div
          css={css`
            color: var(--brand-primary-text-color);
            p {
              line-height: 28px;
            }
            ul {
              margin-bottom: 50px;
              font-size: 18px;
              li {
                ::marker {
                  color: var(--brand-primary-text-color);
                }
              }
            }
          `}
        >
          <Markdown
            skipHtml
            allowedElements={allowedElements}
            css={css`
              @media screen and (max-width: 760px) {
                width: fit-content;
                margin: 40px 70px 40px 58px;
              }
              @media screen and (min-width: 760px) {
                margin: 104px 155px 104px 168px;
              }
            `}
          >
            {quickstart.description}
          </Markdown>
        </div>
      )}
    </>
  );
};

QuickstartOverview.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartOverview;
