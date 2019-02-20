import {
    MjmlStyle
} from 'mjml-react';
import fs from 'fs';

const CssStyle = ({src, inline, folder}) => (
    <MjmlStyle inline={inline}>
        { String(fs.readFileSync(`${__dirname}/../../../../public/${ folder }${src}`)) }
    </MjmlStyle>
);

export default CssStyle;
