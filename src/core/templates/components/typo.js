import {
    MjmlText,
    MjmlClass
} from 'mjml-react';
import keys from 'lodash/keys';

export const H = ({size, mjClass, cssClass, ...otherProps}) => (
    <MjmlText mjClass={`${mjClass || ''} h${size}`} cssClass={`${cssClass || ''} h${size}`} {...otherProps} />
)

export const H1 = ({size, ...otherProps}) => <H size='1' {...otherProps}  />
export const H2 = ({size, ...otherProps}) => <H size='2' {...otherProps}  />
export const H3 = ({size, ...otherProps}) => <H size='3' {...otherProps}  />
export const H4 = ({size, ...otherProps}) => <H size='4' {...otherProps}  />

export const P = ({ mjClass, cssClass, ...otherProps}) => (
    <MjmlText mjClass={`${mjClass || ''} p`} cssClass={`${cssClass || ''} p`} {...otherProps} />
)

const allTypo = { H1, H2, H3, H4, P }

keys(allTypo).forEach((name) => {
    const Item = allTypo[name];
    Item.style = (props) => <MjmlClass name={name.toLowerCase()} {...props}/>
});
