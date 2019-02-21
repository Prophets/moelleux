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
                return style.selectors.map((selector) => {
                    const selectorFirstChar = selector[0];
                    const types = {
                        '.': Mjml.MjmlClass,
                        '*': Mjml.MjmlAll
                    }

                    const Type = types[selectorFirstChar] || Mjml[upperFirst(camelCase(selector))];

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
