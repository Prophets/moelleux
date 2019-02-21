import React from 'React';
import { render } from 'mjml-react';

const mjmlReactRender = (file, data, options = {}) => {
    for(var i in require.cache) {
        if(i.indexOf('/src/') > 0 ){
            delete require.cache[i];
        }
    }
    const Mail = require(file).default;

    return render(<Mail {...data} />, options);
}

export default mjmlReactRender;
