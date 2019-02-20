

import React from 'react';
import DefaultLayout from '../../core/templates/layouts/default.js';
import Button from './components/button';
import { MjmlStyle } from 'mjml-react';

const overrideHead = (DefaultHead) => {
    return (props) => (
        <>
            <DefaultHead {...props}/>
        </>
    );
}
const Index = (props) => (
    <DefaultLayout {...props} head={overrideHead}>

    </DefaultLayout>
);

export default Index;

