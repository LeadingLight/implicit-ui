import React from 'react';

const T9nContext = React.createContext({});

export function withT9n(Component, tags) {
  return (props) => (
    <T9nContext>
      {(translations) => {
        const t9nProps = translateProps(tags, props, translations);

        return <Component {...props} {...t9nProps} />;
      }}
    </T9nContext>
  );
}

export function withT9nFind(Component) {
  return (props) => {
    const {t9nContext, showDefaultTag} = props; // eslint-disable-line react/prop-types

    return (
      <T9nContext>
        {(translations) => {
          const findAndtranslateTag = (tag, specifiedDefaultTag) => {
            const fullContextTag = getFullContextTag(tag, false, t9nContext); // eslint-disable-line react/destructuring-assignment
            const usedDefaultTag = showDefaultTag ? fullContextTag : '';
            const defaultTag = specifiedDefaultTag ? specifiedDefaultTag : usedDefaultTag;

            return findTag(fullContextTag, translations, defaultTag);
          };

          return <Component {...props} findTag={findAndtranslateTag} />;
        }}
      </T9nContext>
    );
  };
}

export const T9nProvider = T9nContext.Provider;

function translateProps(tags, props, translations) {
  const translatedTags = {};
  const {t9nContext, showDefaultTag} = props;
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
