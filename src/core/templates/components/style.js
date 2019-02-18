import React from 'react';
import {
    MjmlStyle
} from 'mjml-react';
import fs from 'fs';

const Style = ({src, inline, folder}) => (
    <MjmlStyle inline={inline}>
        { String(fs.readFileSync(`${__dirname}/../../../../public/${ folder }${src}`)) }
    </MjmlStyle>
);

export default Style;
