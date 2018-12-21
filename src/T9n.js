/* eslint-disable max-params */

import React from 'react';

const T9nTagsContext = React.createContext({});
const T9ntagsConsumer = T9nTagsContext.Consumer;

const T9nContextContext = React.createContext();

const T9nContextConsumer = T9nContextContext.Consumer;
const T9nContextProvider = T9nContextContext.Provider;


export function T9nContext({contextName, children}) {
  return (
    <T9nContextConsumer>
      {(parentContext) => (
        <T9nContextProvider value={parentContext && parentContext !== '' ? `${parentContext}.${contextName}` : contextName}>
          {children}
        </T9nContextProvider>
      )}
    </T9nContextConsumer>
  );
}


export function withT9n(Component, tags) {
  return (props) => (
    <T9ntagsConsumer>
      {(translations) => (
        <T9nContextConsumer>
          {(t9nContext) => {
            const t9nProps = translateProps(tags, t9nContext, props, translations);

            return <Component {...props} {...t9nProps} />;
          }}
        </T9nContextConsumer>
      )}
    </T9ntagsConsumer>
  );
}

export function withT9nFind(Component) {
  return (props) => {
    const {showDefaultTag} = props; // eslint-disable-line react/prop-types

    return (
      <T9ntagsConsumer>
        {(translations) => (
          <T9nContextConsumer>
            {(t9nContext) => {
              const findAndtranslateTag = (tag, specifiedDefaultTag) => {
                const fullContextTag = getFullContextTag(tag, false, t9nContext); // eslint-disable-line react/destructuring-assignment
                const usedDefaultTag = showDefaultTag ? fullContextTag : '';
                const defaultTag = specifiedDefaultTag ? specifiedDefaultTag : usedDefaultTag;

                return findTag(fullContextTag, translations, defaultTag);
              };

              return <Component {...props} findTag={findAndtranslateTag} />;
            }}
          </T9nContextConsumer>
        )}
      </T9ntagsConsumer>
    );
  };
}

export const T9nTagsProvider = T9nTagsContext.Provider;

function translateProps(tags, t9nContext, props, translations) {
  const translatedTags = {};
  const {showDefaultTag} = props;
  const tagKeys = Object.keys(tags);

  tagKeys.forEach((tagKey) => {
    const fullContextTag = getFullContextTag(tags[tagKey], props[tagKey], t9nContext); // eslint-disable-line react/destructuring-assignment
    const defaultTag = showDefaultTag ? fullContextTag : '';

    translatedTags[tagKey] = findTag(fullContextTag, translations, defaultTag);
  });

  return translatedTags;
}

function getFullContextTag(tag, propsTag, context) {
  const usedTag = propsTag ? propsTag : tag;
  const spacer = usedTag.startsWith('$') ? '' : '.';

  return `${context}${spacer}${usedTag}`;
}

function findTag(tag, translations, defaultTag) {
  if (!translations) return defaultTag;
  const translatedTag = translations[tag];

  if (translatedTag) return translatedTag;
  const stripedTag = stripTag1Level(tag);

  if (stripedTag === tag) return defaultTag;

  return findTag(stripedTag, translations, defaultTag);
}

function stripTag1Level(tag) {
  if (tag.startsWith('$')) return tag;

  return tag.replace(/([^.]+\.)|[^$]+/,'');
}
