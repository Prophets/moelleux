import React from 'react';
import {
    MjmlSection,
    MjmlColumn
} from 'mjml-react';
import Image from '../components/image';

const imagePath = '';
const Header = ({ img }) => (
    <MjmlSection padding="0">
        <MjmlColumn>
            <Image padding="0" src={img.desktop} srcset={`
                ${`${img.desktop}`} 600w,
                ${`${img.mobile}`}  300w,
            `} />
        </MjmlColumn>
    </MjmlSection>
);

export default Header;
