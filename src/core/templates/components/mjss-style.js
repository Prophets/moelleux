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
            map(css.parse(style).stylesheet.rules, (style, selector) => {
                const selectorFirstChar = style.selectors[0][0];
                const types = {
                    '.': Mjml.MjmlClass,
                    '*': Mjml.MjmlAll
                }

                const Type = types[selectorFirstChar] || Mjml[upperFirst(camelCase(style.selectors[0]))];

                const props = {};

                if(selectorFirstChar === '.') {
                    props.name = style.selectors[0].slice(1);
                }

                style.declarations.forEach((style) => {
                    props[camelCase(style.property)] = style.value;
                });

                return <Type {...props} />
            })
        }
    </Mjml.MjmlAttributes>
};

export default MjssStyle;
