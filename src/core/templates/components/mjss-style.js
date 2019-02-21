import * as Mjml from 'mjml-react';
import css from 'css';
import map from 'lodash/map';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const MjssStyle = ({children, folder, src}) => {
    const style = children || String(fs.readFileSync(`${__dirname}/../../../../public/${ folder }${ src }`));

    return <Mjml.MjmlAttributes>
        {
            map(css.parse(style).stylesheet.rules, (style) => {
                if(style.selectors === undefined && style.media) {
                    throw new Error(`MjssValidationError: @media ${style.media} - media queries are not allowed in <MjssStyle>`)
                }
                return style.selectors.map((selector) => {
                    if (selector[0] === '#') {
                        throw new Error(`MjssValidationError:\n'${selector}' { ... } - Id's are not allowed in <MjssStyle>`);
                    }
                    if (selector.split(' ').length > 1) {
                        throw new Error(`MjssValidationError:\n'${selector}' { ... } - Nesting is not allowed in <MjssStyle>`);
                    }

                    const selectorFirstChar = selector[0];
                    const types = {
                        '.': Mjml.MjmlClass,
                        '*': Mjml.MjmlAll
                    }

                    let Type = types[selectorFirstChar];

                    if (Type === undefined) {
                        const MjmlTag = Mjml[upperFirst(camelCase(selector))];
                        if( MjmlTag === undefined ) {
                            throw new Error(`MjssValidationError:\n'${selector}' { ... } - Is not a valid Mjml tag. Use <CssStyle> for standard html tags`);
                        }
                        Type = MjmlTag;
                    }

                    const props = {};

                    if(selectorFirstChar === '.') {
                        props.name = selector.slice(1);
                    }

                    style.declarations.forEach((style) => {
                        props[camelCase(style.property)] = style.value;
                    });

                    return <Type {...props}>{' '}</Type>
                })
            })
        }
    </Mjml.MjmlAttributes>
};

export default MjssStyle;
